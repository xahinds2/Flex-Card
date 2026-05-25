/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { getAuthUser } from '@/lib/authHelper';
import UserCard from '@/models/UserCard';
import { mockDb } from '@/lib/mockDb';

export async function GET() {
  try {
    const { userId } = await getAuthUser();
    const dbConn = await connectToDatabase();

    if (!dbConn) {
      const cards = mockDb.getCards(userId);
      return NextResponse.json({ source: 'mock', data: cards });
    }

    const cards = await UserCard.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json({ source: 'database', data: cards });
  } catch (err: any) {
    console.error('Error fetching cards:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await getAuthUser();
    const body = await req.json();
    const { bank, variant, network, nickname } = body;

    if (!bank || !variant || !network) {
      return NextResponse.json(
        { error: 'Missing required parameters: bank, variant, network' },
        { status: 400 }
      );
    }

    const dbConn = await connectToDatabase();

    if (!dbConn) {
      const newCard = mockDb.addCard(userId, { bank, variant, network, nickname });
      return NextResponse.json({ source: 'mock', data: newCard }, { status: 201 });
    }

    const newCard = await UserCard.create({
      userId,
      bank,
      variant,
      network,
      nickname
    });

    return NextResponse.json({ source: 'database', data: newCard }, { status: 201 });
  } catch (err: any) {
    console.error('Error adding card:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
