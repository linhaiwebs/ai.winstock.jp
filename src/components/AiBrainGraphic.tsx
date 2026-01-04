export default function AiBrainGraphic() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="1" />
            <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.8" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <radialGradient id="glowGradient">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Glow effect background */}
        <circle cx="200" cy="200" r="150" fill="url(#glowGradient)" className="animate-pulse" />

        {/* Brain outline - left hemisphere */}
        <path
          d="M 120 200 Q 100 150, 130 120 Q 160 90, 190 110 Q 200 120, 200 140 Q 200 160, 190 180 Q 180 190, 170 200 Q 160 210, 150 220 Q 140 230, 130 240 Q 120 250, 120 260 Q 120 270, 130 280 Q 140 285, 150 280 Q 160 275, 165 265 Q 168 255, 165 245 Q 162 235, 155 228 Q 148 220, 145 210 Q 143 200, 145 190 Z"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          className="animate-pulse"
          style={{ animationDuration: '3s' }}
        />

        {/* Brain outline - right hemisphere */}
        <path
          d="M 280 200 Q 300 150, 270 120 Q 240 90, 210 110 Q 200 120, 200 140 Q 200 160, 210 180 Q 220 190, 230 200 Q 240 210, 250 220 Q 260 230, 270 240 Q 280 250, 280 260 Q 280 270, 270 280 Q 260 285, 250 280 Q 240 275, 235 265 Q 232 255, 235 245 Q 238 235, 245 228 Q 252 220, 255 210 Q 257 200, 255 190 Z"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          className="animate-pulse"
          style={{ animationDuration: '3.2s' }}
        />

        {/* Neural network lines - connecting the hemispheres */}
        <g opacity="0.8">
          {/* Horizontal connections */}
          <line x1="150" y1="150" x2="250" y2="150" stroke="#dc2626" strokeWidth="1.5" opacity="0.6" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
          <line x1="155" y1="180" x2="245" y2="180" stroke="#dc2626" strokeWidth="1.5" opacity="0.6" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          <line x1="160" y1="210" x2="240" y2="210" stroke="#dc2626" strokeWidth="1.5" opacity="0.6" className="animate-pulse" style={{ animationDelay: '0.7s' }} />
          <line x1="165" y1="240" x2="235" y2="240" stroke="#dc2626" strokeWidth="1.5" opacity="0.6" className="animate-pulse" style={{ animationDelay: '0.9s' }} />
        </g>

        {/* Cortex folds - left side */}
        <g opacity="0.7">
          <path d="M 130 140 Q 140 135, 150 140" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 125 165 Q 135 160, 145 165" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 128 190 Q 138 185, 148 190" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 132 215 Q 142 210, 152 215" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 138 238 Q 148 233, 158 238" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* Cortex folds - right side */}
        <g opacity="0.7">
          <path d="M 270 140 Q 260 135, 250 140" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 275 165 Q 265 160, 255 165" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 272 190 Q 262 185, 252 190" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 268 215 Q 258 210, 248 215" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 262 238 Q 252 233, 242 238" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* Neural nodes - connection points */}
        <g>
          <circle cx="200" cy="120" r="3" fill="#dc2626" className="animate-pulse" />
          <circle cx="150" cy="150" r="2.5" fill="#dc2626" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
          <circle cx="250" cy="150" r="2.5" fill="#dc2626" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
          <circle cx="155" cy="180" r="2.5" fill="#dc2626" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
          <circle cx="245" cy="180" r="2.5" fill="#dc2626" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
          <circle cx="160" cy="210" r="2.5" fill="#dc2626" className="animate-pulse" style={{ animationDelay: '1s' }} />
          <circle cx="240" cy="210" r="2.5" fill="#dc2626" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
          <circle cx="165" cy="240" r="2.5" fill="#dc2626" className="animate-pulse" style={{ animationDelay: '1.4s' }} />
          <circle cx="235" cy="240" r="2.5" fill="#dc2626" className="animate-pulse" style={{ animationDelay: '1.6s' }} />
        </g>

        {/* Brainstem */}
        <path
          d="M 190 280 Q 195 300, 200 320 Q 205 300, 210 280"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow)"
        />

        {/* Animated signal particles */}
        <g opacity="0.9">
          <circle cx="150" cy="150" r="1.5" fill="#fbbf24" className="animate-ping" />
          <circle cx="250" cy="150" r="1.5" fill="#fbbf24" className="animate-ping" style={{ animationDelay: '0.5s' }} />
          <circle cx="200" cy="180" r="1.5" fill="#fbbf24" className="animate-ping" style={{ animationDelay: '1s' }} />
          <circle cx="200" cy="220" r="1.5" fill="#fbbf24" className="animate-ping" style={{ animationDelay: '1.5s' }} />
        </g>
      </svg>

      {/* Floating text labels */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[20%] left-[10%] text-xs text-red-400 font-semibold animate-pulse">
          AI分析
        </div>
        <div className="absolute top-[20%] right-[10%] text-xs text-red-400 font-semibold animate-pulse" style={{ animationDelay: '0.5s' }}>
          深度学習
        </div>
        <div className="absolute bottom-[35%] left-1/2 transform -translate-x-1/2 text-xs text-red-400 font-semibold animate-pulse" style={{ animationDelay: '1s' }}>
          株式診断
        </div>
      </div>
    </div>
  );
}
