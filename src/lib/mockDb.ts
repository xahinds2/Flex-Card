/* eslint-disable @typescript-eslint/no-explicit-any */
import { SEED_CARDS, CardTemplate, CardBenefitTemplate } from './seedData';

export interface UserCardRecord {
  id: string;
  userId: string;
  bank: string;
  variant: string;
  network: 'Visa' | 'Mastercard' | 'RuPay' | 'Amex';
  nickname?: string;
  createdAt: string;
}

// Memory fallback store (for server-side / SSR requests)
let mockUserCards: UserCardRecord[] = [
  // Start with pre-seeded cards for the demo user so they see items on first load!
  {
    id: 'mock-1',
    userId: 'demo-user',
    bank: 'HDFC Bank',
    variant: 'Millennia',
    network: 'Mastercard',
    nickname: 'Daily Shopping IND',
    createdAt: new Date().toISOString()
  },
  {
    id: 'mock-2',
    userId: 'demo-user',
    bank: 'SBI Card',
    variant: 'Cashback',
    network: 'Visa',
    nickname: 'Online Groceries',
    createdAt: new Date().toISOString()
  },
  {
    id: 'mock-3',
    userId: 'demo-user',
    bank: 'American Express',
    variant: 'Platinum Card',
    network: 'Amex',
    nickname: 'Business Travel',
    createdAt: new Date().toISOString()
  }
];

export const mockDb = {
  // Added cards CRUD
  getCards(userId: string): UserCardRecord[] {
    // If running in browser, sync from localStorage if available
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`cardnest_cards_${userId}`);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse localStorage cards', e);
        }
      } else {
        // First load: seed localStorage with default mockUserCards
        localStorage.setItem(`cardnest_cards_${userId}`, JSON.stringify(mockUserCards));
      }
    }
    return mockUserCards.filter(c => c.userId === userId);
  },

  addCard(userId: string, card: Omit<UserCardRecord, 'id' | 'userId' | 'createdAt'>): UserCardRecord {
    const newCard: UserCardRecord = {
      ...card,
      id: `mock-${Math.random().toString(36).substring(2, 11)}`,
      userId,
      createdAt: new Date().toISOString()
    };
    
    // Add to server memory list
    mockUserCards.push(newCard);
    
    if (typeof window !== 'undefined') {
      const current = this.getCards(userId);
      const updated = [...current, newCard];
      localStorage.setItem(`cardnest_cards_${userId}`, JSON.stringify(updated));
    }
    
    return newCard;
  },

  deleteCard(userId: string, id: string): boolean {
    const initialLength = mockUserCards.length;
    mockUserCards = mockUserCards.filter(c => !(c.id === id && c.userId === userId));
    
    if (typeof window !== 'undefined') {
      const current = this.getCards(userId);
      const updated = current.filter(c => c.id !== id);
      localStorage.setItem(`cardnest_cards_${userId}`, JSON.stringify(updated));
    }
    
    return mockUserCards.length < initialLength;
  },

  // Benefits Explorer
  getBenefitsForUser(userId: string): (CardBenefitTemplate & { cardId: string; bank: string; variant: string; network: string })[] {
    const userCards = this.getCards(userId);
    const results: any[] = [];

    userCards.forEach(uc => {
      const template = SEED_CARDS.find(tc => 
        tc.bank.toLowerCase() === uc.bank.toLowerCase() && 
        tc.variant.toLowerCase() === uc.variant.toLowerCase()
      );

      if (template) {
        template.benefits.forEach(b => {
          results.push({
            ...b,
            cardId: uc.id,
            bank: uc.bank,
            variant: uc.variant,
            network: uc.network
          });
        });
      }
    });

    return results;
  },

  getCardDetails(bank: string, variant: string): CardTemplate | undefined {
    return SEED_CARDS.find(c => 
      c.bank.toLowerCase() === bank.toLowerCase() && 
      c.variant.toLowerCase() === variant.toLowerCase()
    );
  }
};
