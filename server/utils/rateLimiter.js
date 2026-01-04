const API_LIMITS = {
  RPM: 15,
  RPD: 1500,
};

const requestLog = {
  minute: [],
  day: [],
  apiKeys: {},
};

function cleanOldRequests() {
  const now = Date.now();
  const oneMinuteAgo = now - 60 * 1000;
  const oneDayAgo = now - 24 * 60 * 60 * 1000;

  requestLog.minute = requestLog.minute.filter((timestamp) => timestamp > oneMinuteAgo);
  requestLog.day = requestLog.day.filter((timestamp) => timestamp > oneDayAgo);
}

export function canMakeRequest() {
  cleanOldRequests();

  const canMakeRPM = requestLog.minute.length < API_LIMITS.RPM;
  const canMakeRPD = requestLog.day.length < API_LIMITS.RPD;

  return canMakeRPM && canMakeRPD;
}

export function recordRequest() {
  const now = Date.now();
  requestLog.minute.push(now);
  requestLog.day.push(now);
  cleanOldRequests();
}

export function getRateLimitStatus() {
  cleanOldRequests();

  return {
    rpm: {
      current: requestLog.minute.length,
      limit: API_LIMITS.RPM,
      remaining: API_LIMITS.RPM - requestLog.minute.length,
    },
    rpd: {
      current: requestLog.day.length,
      limit: API_LIMITS.RPD,
      remaining: API_LIMITS.RPD - requestLog.day.length,
    },
  };
}

export function getWaitTimeMs() {
  cleanOldRequests();

  if (requestLog.minute.length >= API_LIMITS.RPM) {
    const oldestRequest = requestLog.minute[0];
    const waitTime = oldestRequest + 60 * 1000 - Date.now();
    return Math.max(waitTime, 0);
  }

  return 0;
}

export async function waitForAvailableSlot() {
  const waitTime = getWaitTimeMs();
  if (waitTime > 0) {
    console.log(`Rate limit reached, waiting ${waitTime}ms`);
    await new Promise((resolve) => setTimeout(resolve, waitTime));
  }
}

export function initializeApiKey(apiKey) {
  if (!requestLog.apiKeys[apiKey]) {
    requestLog.apiKeys[apiKey] = {
      minute: [],
      day: [],
      lastUsed: Date.now(),
    };
  }
}

export function selectBestApiKey(apiKeys) {
  if (!apiKeys || apiKeys.length === 0) {
    return null;
  }

  if (apiKeys.length === 1) {
    return apiKeys[0];
  }

  cleanOldRequests();

  for (const apiKey of apiKeys) {
    initializeApiKey(apiKey);
    const keyLog = requestLog.apiKeys[apiKey];

    const now = Date.now();
    const oneMinuteAgo = now - 60 * 1000;
    const oneDayAgo = now - 24 * 60 * 60 * 1000;

    keyLog.minute = keyLog.minute.filter((timestamp) => timestamp > oneMinuteAgo);
    keyLog.day = keyLog.day.filter((timestamp) => timestamp > oneDayAgo);

    if (keyLog.minute.length < API_LIMITS.RPM && keyLog.day.length < API_LIMITS.RPD) {
      return apiKey;
    }
  }

  return null;
}

export function recordApiKeyRequest(apiKey) {
  initializeApiKey(apiKey);
  const now = Date.now();
  requestLog.apiKeys[apiKey].minute.push(now);
  requestLog.apiKeys[apiKey].day.push(now);
  requestLog.apiKeys[apiKey].lastUsed = now;
  recordRequest();
}
