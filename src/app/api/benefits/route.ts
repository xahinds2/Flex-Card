/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { getAuthUser } from '@/lib/authHelper';
import UserCard from '@/models/UserCard';
import CardBenefit from '@/models/CardBenefit';
import { mockDb } from '@/lib/mockDb';

export async function GET(req: Request) {
  try {
    const { userId } = await getAuthUser();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const cardId = searchParams.get('cardId');

    const dbConn = await connectToDatabase();

    if (!dbConn) {
      let benefits = mockDb.getBenefitsForUser(userId);
      if (category) {
        benefits = benefits.filter(b => b.category === category);
      }
      if (cardId) {
        benefits = benefits.filter(b => b.cardId === cardId);
      }
      return NextResponse.json({ source: 'mock', data: benefits });
    }

    const query: any = { userId };
    if (cardId) {
      query._id = cardId;
    }
    const userCards = await UserCard.find(query);

    if (userCards.length === 0) {
      return NextResponse.json({ source: 'database', data: [] });
    }

    const cardBenefits = [];
    for (const uc of userCards) {
      const benefitQuery: any = {
        bank: { $regex: new RegExp(`^${uc.bank}$`, 'i') },
        variant: { $regex: new RegExp(`^${uc.variant}$`, 'i') }
      };
      
      if (category) {
        benefitQuery.category = category;
      }

      const benefits = await CardBenefit.find(benefitQuery);
      
      for (const b of benefits) {
        cardBenefits.push({
          _id: b._id,
          cardId: uc._id,
          bank: uc.bank,
          variant: uc.variant,
          network: uc.network,
          category: b.category,
          title: b.title,
          description: b.description,
          value: b.value,
          conditions: b.conditions
        });
      }
    }

    return NextResponse.json({ source: 'database', data: cardBenefits });
  } catch (err: any) {
    console.error('Error fetching benefits:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
