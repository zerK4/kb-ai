// ./app/api/chat/route.ts
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import prisma from '@/lib/prisma';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json();

  const pn = await prisma.quickNote.findMany({})
  pn.forEach(x => {
    x.content = x.content.toString('utf8') as any
  })

  messages.unshift({
    role: 'system',
    content: `You are an assistant for a knowledge base. When you receive a question you use the data from here ${JSON.stringify(
      pn
    )}, (this data you received will be called kb) and return the following format: First return who wrote that article and at which date, you might have to convert the date to be readable
     then you return the article content in markdown and a link to that article. 
     In the documentation provided you might have multiple references to the same subject, you can list all of those in separate codes to be as understable as possible.
     Then you can complete the conversation with usefull information you have about the topic.`
  })

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      ...messages,
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
