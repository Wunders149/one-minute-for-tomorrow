import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Message from '@/models/Message';
import { Filter as BadWordsFilter } from 'bad-words';

// Fix for type definition mismatch if necessary, or just use it.
// The build error suggested "Did you mean to import Filter?"
const Filter = BadWordsFilter as any;

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { content, visibility, timezone } = body;

    // Validation
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json({ error: 'Message cannot be empty.' }, { status: 400 });
    }

    if (content.length > 500) {
      return NextResponse.json({ error: 'Message exceeds 500 characters.' }, { status: 400 });
    }

    // Profanity Filter
    const filter = new Filter();
    if (filter.isProfane(content)) {
       // We can either reject or clean it. Prompt says "Basic profanity filter". 
       // Rejection is better for "truth" - if your truth is profane, maybe it's not for the public wall? 
       // Or we just flag it. Let's reject for now to keep the wall clean.
       return NextResponse.json({ error: 'Please keep the language clean for the public wall.' }, { status: 400 });
    }

    // Rate Limiting (IP based)
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // Check for messages from this IP in the last minute
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    const recentMessages = await Message.countDocuments({
      ip: ip,
      createdAt: { $gte: oneMinuteAgo },
    });

    if (recentMessages > 0) {
       return NextResponse.json({ error: 'You can only post once per minute.' }, { status: 429 });
    }

    const newMessage = await Message.create({
      content: content.trim(),
      visibility: visibility || 'public',
      timezone,
      ip: ip as string,
      userAgent: req.headers.get('user-agent') || undefined,
    });

    return NextResponse.json({ success: true, id: newMessage._id }, { status: 201 });

  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
