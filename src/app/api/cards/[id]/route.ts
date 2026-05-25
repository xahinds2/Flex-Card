/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { getAuthUser } from '@/lib/authHelper';
import UserCard from '@/models/UserCard';
import { mockDb } from '@/lib/mockDb';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId } = await getAuthUser();
    const dbConn = await connectToDatabase();

    if (!dbConn) {
      const success = mockDb.deleteCard(userId, id);
      if (!success) {
        return NextResponse.json({ error: 'Card not found or access denied in Demo Mode' }, { status: 404 });
      }
      return NextResponse.json({ source: 'mock', success: true });
    }

    const deleted = await UserCard.findOneAndDelete({ _id: id, userId });
    if (!deleted) {
      return NextResponse.json({ error: 'Card not found or access denied' }, { status: 404 });
    }

    return NextResponse.json({ source: 'database', success: true });
  } catch (err: any) {
    console.error('Error deleting card:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
