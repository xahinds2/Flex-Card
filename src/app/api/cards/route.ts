/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { getAuthUser } from '@/lib/authHelper';
import UserCard from '@/models/UserCard';
import { mockDb } from '@/lib/mockDb';
import { SEED_CARDS } from '@/lib/seedData';
import CardBenefit from '@/models/CardBenefit';
import { generateCardBenefitsAI } from '@/lib/aiHelper';

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

    // Dynamic database seeding of benefits for the new card variant if they don't already exist
    const existsInDb = await CardBenefit.findOne({
      bank: { $regex: new RegExp(`^${bank.trim()}$`, 'i') },
      variant: { $regex: new RegExp(`^${variant.trim()}$`, 'i') }
    });

    if (!existsInDb) {
      const seedCard = SEED_CARDS.find(
        (c) => c.bank.toLowerCase() === bank.trim().toLowerCase() && 
               c.variant.toLowerCase() === variant.trim().toLowerCase()
      );

      if (seedCard) {
        // Pre-populate benefits from seed catalog
        const records = seedCard.benefits.map((b) => ({
          bank: seedCard.bank,
          variant: seedCard.variant,
          network: seedCard.network,
          category: b.category,
          title: b.title,
          description: b.description,
          value: b.value,
          conditions: b.conditions || ''
        }));
        await CardBenefit.insertMany(records);
      } else if (process.env.OLLAMA_BASE_URL) {
        // Dynamically fetch details from internet using AI
        try {
          await generateCardBenefitsAI(bank.trim(), variant.trim(), network);
        } catch (aiErr) {
          console.error('[POST Cards AI Fallback Error] Dynamic generation failed:', aiErr);
        }
      }
    }

    const newCard = await UserCard.create({
      userId,
      bank: bank.trim(),
      variant: variant.trim(),
      network,
      nickname: nickname ? nickname.trim() : undefined
    });

    return NextResponse.json({ source: 'database', data: newCard }, { status: 201 });
  } catch (err: any) {
    console.error('Error adding card:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
