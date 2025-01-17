// import { google } from '@ai-sdk/google';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { AIStream, StreamingTextResponse, streamText } from 'ai'

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY
});

export const runtime = 'edge';

export async function POST(req: Request) {
  console.log("reached-------------")
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const response = await streamText({
      model: google('models/gemini-pro'),
      prompt,
    });

    // const stream = response.toAIStreamResponse();
    
    
    return new StreamingTextResponse(response.toAIStream());
  } catch (error) {
    // if (error instanceof google.APIError) {
    //   // OpenAI API error handling
    //   const { name, status, headers, message } = error;
    //   return NextResponse.json({ name, status, headers, message }, { status });
    // } else {
      // General error handling
      console.error('An unexpected error occurred:', error);
    //   throw error;
    // }
  }
}