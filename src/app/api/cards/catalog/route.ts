/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import CardBenefit from '@/models/CardBenefit';
import { SEED_CARDS } from '@/lib/seedData';

export async function GET() {
  try {
    const dbConn = await connectToDatabase();

    if (!dbConn) {
      // In Demo/Offline Mode, return the static SEED_CARDS catalog
      const mockCatalog = SEED_CARDS.map(c => ({
        bank: c.bank,
        variant: c.variant,
        network: c.network
      }));
      return NextResponse.json({ source: 'mock', data: mockCatalog });
    }

    // Fetch all unique bank and variant combinations in the database
    const uniqueDbCards = await CardBenefit.aggregate([
      {
        $group: {
          _id: {
            bank: { $trim: { input: { $toLower: "$bank" } } },
            variant: { $trim: { input: { $toLower: "$variant" } } }
          },
          bank: { $first: "$bank" },
          variant: { $first: "$variant" },
          network: { $first: "$network" }
        }
      }
    ]);

    // Merge static SEED_CARDS with DB cards to build a unified catalog
    const mergedMap = new Map<string, { bank: string; variant: string; network: string }>();

    // 1. Populate with static seed cards
    for (const card of SEED_CARDS) {
      const key = `${card.bank.toLowerCase().trim()}|${card.variant.toLowerCase().trim()}`;
      mergedMap.set(key, {
        bank: card.bank.trim(),
        variant: card.variant.trim(),
        network: card.network
      });
    }

    // 2. Override/add with database custom cards
    for (const card of uniqueDbCards) {
      const key = `${card.bank.toLowerCase().trim()}|${card.variant.toLowerCase().trim()}`;
      mergedMap.set(key, {
        bank: card.bank.trim(),
        variant: card.variant.trim(),
        network: card.network || 'Visa'
      });
    }

    const mergedCatalog = Array.from(mergedMap.values());

    return NextResponse.json({ source: 'database', data: mergedCatalog });
  } catch (err: any) {
    console.error('Error fetching cards catalog:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
