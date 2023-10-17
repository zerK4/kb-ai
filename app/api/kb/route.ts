// import { auth } from '@/auth'
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import type { User } from '@clerk/nextjs/api';
import { currentUser } from '@clerk/nextjs';

export async function POST(req: Request) {
  const user: User | null = await currentUser();
  const json = await req.json();

  try {
    const data = await prisma.quickNote.create({
      data: {
        content: Buffer.from(json.content, 'utf8'),
        createdBy: user?.firstName + ' ' + user?.lastName,
      },
    });

    console.log(data, 'tje data');
    return NextResponse.json({
      data: data,
      status: 200,
    });
  } catch (err: any) {
    console.log(`Error happened here: kb route, message: ${err.message}`);
    return new Response(
      `Error happened here: kb route, message: ${err.message}`,
      { status: 500 }
    );
  }
}
