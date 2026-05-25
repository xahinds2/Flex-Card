/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import CardBenefit from '@/models/CardBenefit';
import { SEED_CARDS } from '@/lib/seedData';

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const remoteUrl = searchParams.get('url');

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

    const benefitsToInsert: any[] = [];
    let dataSource = 'local seed catalog';

    if (remoteUrl) {
      try {
        const response = await fetch(remoteUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch remote data (HTTP ${response.status})`);
        }
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Remote JSON data must be a valid JSON Array');
        }

        dataSource = `remote URL: ${remoteUrl}`;

        // Support both direct list of benefits or nested card templates (CardTemplate[])
        if (data.length > 0 && Array.isArray(data[0].benefits)) {
          for (const card of data) {
            for (const benefit of card.benefits || []) {
              benefitsToInsert.push({
                bank: card.bank,
                variant: card.variant,
                network: card.network || 'Visa',
                category: benefit.category,
                title: benefit.title,
                description: benefit.description,
                value: benefit.value,
                conditions: benefit.conditions
              });
            }
          }
        } else {
          // Direct flat list of benefits
          for (const item of data) {
            if (!item.bank || !item.variant || !item.category || !item.title) {
              throw new Error('Invalid benefit object. Must contain: bank, variant, category, title');
            }
            benefitsToInsert.push({
              bank: item.bank,
              variant: item.variant,
              network: item.network || 'Visa',
              category: item.category,
              title: item.title,
              description: item.description || '',
              value: item.value || '',
              conditions: item.conditions || ''
            });
          }
        }
      } catch (fetchErr: any) {
        return NextResponse.json(
          { error: `Failed to fetch or parse remote seed data: ${fetchErr.message}` },
          { status: 400 }
        );
      }
    } else {
      // Default local catalog seed
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
    }

    if (benefitsToInsert.length === 0) {
      return NextResponse.json({ error: 'No valid seed records found to insert.' }, { status: 400 });
    }

    // Clear existing benefits
    await CardBenefit.deleteMany({});

    // Bulk insert new benefits
    const inserted = await CardBenefit.insertMany(benefitsToInsert);

    return NextResponse.json({
      success: true,
      message: `Database seeded successfully from ${dataSource}`,
      recordsSeededCount: inserted.length
    });
  } catch (err: any) {
    console.error('Error seeding database:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  return POST(req);
}
