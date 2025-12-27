import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Message from '@/models/Message';

export async function GET() {
  try {
    await dbConnect();

    // Get 20 random public messages
    // Note: $sample performs a random sort.
    const messages = await Message.aggregate([
      { $match: { visibility: 'public' } },
      { $sample: { size: 20 } },
      { $project: { ip: 0, userAgent: 0, __v: 0 } } // Exclude sensitive info
    ]);

    return NextResponse.json({ messages }, { status: 200 });

  } catch (error) {
    console.error('Wall fetch error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
