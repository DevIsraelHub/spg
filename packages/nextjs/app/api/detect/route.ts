import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();
  const text = formData.get('text') as string;
  const file = formData.get('file') as File;

  let result = '';

  // Simulate AI detection by checking for "AI-sounding" phrases
  if (text) {
    const aiPhrases = ['neural', 'algorithm', 'deep learning', 'GPT', 'machine learning'];
    const containsAIContent = aiPhrases.some((phrase) => text.toLowerCase().includes(phrase));

    result = containsAIContent
      ? 'This content seems to be AI-generated.'
      : 'This content seems to be human-made.';
  } else if (file) {
    // Simulate file detection (for now we just return a mock response)
    result = 'File detection is not implemented yet. This is a placeholder result.';
  } else {
    result = 'No content provided for detection.';
  }

  return NextResponse.json({ result });
}




// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const text = formData.get('text') as string;
//     const file = formData.get('file') as File;

//     let detectionResult = '';

//     if (text) {
//       detectionResult = await detectTextAI(text);
//     } else if (file) {
//       detectionResult = await detectFileAI(file);
//     }

//     return NextResponse.json({ result: detectionResult });
//   } catch (error) {
//     return NextResponse.json({ error: 'Detection failed' }, { status: 500 });
//   }
// }

// // Simulate AI detection for text
// async function detectTextAI(text: string) {
//   // Call AI API or mock AI detection
//   return text.includes('AI') ? 'AI-generated' : 'Human-made';
// }

// // Simulate AI detection for files
// async function detectFileAI(file: File) {
//   // You can add actual file detection logic here or mock it
//   return 'AI-generated'; // or 'Human-made'
// }
