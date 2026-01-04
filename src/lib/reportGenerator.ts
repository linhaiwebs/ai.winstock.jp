import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

interface ReportData {
  stockCode: string;
  stockName: string;
  analysis: string;
  lineRedirectUrl?: string;
}

export async function generateDiagnosisReport(data: ReportData): Promise<void> {
  const currentDate = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const sections = parseAnalysis(data.analysis);

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: 'AI株式分析レポート',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `作成日時: ${currentDate}`,
                size: 20,
                color: '666666'
              })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 }
          }),

          new Paragraph({
            text: '分析対象銘柄',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `銘柄コード: `,
                bold: true
              }),
              new TextRun({
                text: data.stockCode
              })
            ],
            spacing: { after: 100 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `銘柄名: `,
                bold: true
              }),
              new TextRun({
                text: data.stockName
              })
            ],
            spacing: { after: 400 }
          }),

          new Paragraph({
            text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            spacing: { before: 200, after: 200 }
          }),

          ...sections.map(section => createSectionParagraphs(section)).flat(),

          new Paragraph({
            text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            spacing: { before: 600, after: 400 }
          }),

          new Paragraph({
            text: '詳細な分析を毎日受け取る',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: 'LINEで登録すると、毎日最新の株式分析レポートをお届けします。',
                size: 22
              })
            ],
            spacing: { after: 200 }
          }),

          ...(data.lineRedirectUrl ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: '登録URL: ',
                  bold: true
                }),
                new TextRun({
                  text: data.lineRedirectUrl,
                  color: '0000FF'
                })
              ],
              spacing: { after: 400 }
            })
          ] : []),

          new Paragraph({
            text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            spacing: { before: 200, after: 400 }
          }),

          new Paragraph({
            text: '免責事項',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: '本分析は公開されている市場データに基づく情報提供のみを目的としており、特定の投資判断を推奨または助言するものではありません。株式投資には価格変動リスク、信用リスク、流動性リスクなどが伴い、投資元本を割り込む可能性があります。最終的な投資判断は、必ずご自身の責任において行ってください。',
                size: 20,
                color: '666666'
              })
            ],
            spacing: { after: 200 }
          })
        ]
      }
    ]
  });

  const blob = await doc.toBlob();
  saveAs(blob, `AI株式分析レポート_${data.stockCode}_${new Date().getTime()}.docx`);
}

interface AnalysisSection {
  title: string;
  content: string[];
}

function parseAnalysis(analysis: string): AnalysisSection[] {
  const sections: AnalysisSection[] = [];
  const lines = analysis.split('\n');

  let currentSection: AnalysisSection | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine === '━━━━━━━━━━━━━━━━━━━━' || trimmedLine.startsWith('━━━')) {
      continue;
    }

    if (trimmedLine.startsWith('【') && trimmedLine.includes('】')) {
      if (currentSection) {
        sections.push(currentSection);
      }

      const title = trimmedLine.replace(/【|】/g, '').trim();
      currentSection = {
        title,
        content: []
      };
    } else if (currentSection && trimmedLine) {
      currentSection.content.push(trimmedLine);
    } else if (!currentSection && trimmedLine) {
      if (sections.length === 0) {
        sections.push({
          title: '概要',
          content: [trimmedLine]
        });
      } else {
        sections[sections.length - 1].content.push(trimmedLine);
      }
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

function createSectionParagraphs(section: AnalysisSection): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  paragraphs.push(
    new Paragraph({
      text: section.title,
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 400, after: 200 }
    })
  );

  for (const content of section.content) {
    if (content.startsWith('・') || content.startsWith('•') || content.startsWith('-')) {
      paragraphs.push(
        new Paragraph({
          text: content,
          bullet: {
            level: 0
          },
          spacing: { after: 100 }
        })
      );
    } else {
      paragraphs.push(
        new Paragraph({
          text: content,
          spacing: { after: 150 }
        })
      );
    }
  }

  return paragraphs;
}
