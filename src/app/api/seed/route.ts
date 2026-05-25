/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import CardBenefit from '@/models/CardBenefit';
import { SEED_CARDS } from '@/lib/seedData';

export async function POST() {
  try {
    const dbConn = await connectToDatabase();

    if (!dbConn) {
      return NextResponse.json(
        {
          error:
            'Cannot seed database in Demo Mode. Connect a real MongoDB database by configuring MONGODB_URI in your .env.local file.'
        },
        { status: 400 }
      );
    }

    // Clear existing benefits
    await CardBenefit.deleteMany({});

    // Bulk insert new benefits
    const benefitsToInsert = [];
    for (const card of SEED_CARDS) {
      for (const benefit of card.benefits) {
        benefitsToInsert.push({
          bank: card.bank,
          variant: card.variant,
          network: card.network,
          category: benefit.category,
          title: benefit.title,
          description: benefit.description,
          value: benefit.value,
          conditions: benefit.conditions
        });
      }
    }

    const inserted = await CardBenefit.insertMany(benefitsToInsert);

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      recordsSeededCount: inserted.length
    });
  } catch (err: any) {
    console.error('Error seeding database:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
export async function GET() {
  // Let the user trigger seed via a simple GET request in browser for developer convenience
  return POST();
}
