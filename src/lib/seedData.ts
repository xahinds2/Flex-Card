export interface CardBenefitTemplate {
  category: 'cashback' | 'lounge' | 'rewards' | 'dining' | 'fuel' | 'milestone';
  title: string;
  description: string;
  value: string;
  conditions?: string;
}

export interface CardTemplate {
  bank: string;
  variant: string;
  network: 'Visa' | 'Mastercard' | 'RuPay' | 'Amex';
  theme: {
    bgGradient: string;
    textColor: string;
    glowColor: string;
    accentColor: string;
  };
  benefits: CardBenefitTemplate[];
}

export const SEED_CARDS: CardTemplate[] = [
  {
    bank: 'HDFC Bank',
    variant: 'Infinia',
    network: 'Visa',
    theme: {
      bgGradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #020617 100%)',
      textColor: '#f1f5f9',
      glowColor: 'rgba(234, 179, 8, 0.15)', // Premium gold glow
      accentColor: '#eab308' // Gold
    },
    benefits: [
      {
        category: 'rewards',
        title: '5 Reward Points',
        description: 'Earn 5 Reward Points for every Rs. 150 spent on all retail spends.',
        value: '3.3%',
        conditions: 'Except fuel, wallet loads and government transactions.'
      },
      {
        category: 'rewards',
        title: 'SmartBuy 10X Points',
        description: 'Earn up to 10X Reward Points on travel and shopping bookings via HDFC SmartBuy portal.',
        value: 'up to 33%',
        conditions: 'Capped at 15,000 points per calendar month.'
      },
      {
        category: 'lounge',
        title: 'Unlimited Lounge Access',
        description: 'Unlimited complimentary domestic and international airport lounge access for primary and add-on cardholders.',
        value: 'Unlimited',
        conditions: 'Priority Pass included. Add-on member passes also complimentary.'
      },
      {
        category: 'dining',
        title: 'Infinia Dining Club',
        description: 'Up to 20% discount on dining bills via Swiggy Dineout at premium restaurants.',
        value: '20% Off',
        conditions: 'Applicable via Swiggy integration.'
      },
      {
        category: 'fuel',
        title: 'Fuel Surcharge Waiver',
        description: '1% fuel surcharge waiver at all gas stations in India.',
        value: '1% Waiver',
        conditions: 'On transactions between Rs. 400 and Rs. 100,000. Capped at Rs. 1,000 per month.'
      },
      {
        category: 'milestone',
        title: 'Annual Fee Waiver',
        description: 'Spend Rs. 10 Lakhs or more in an anniversary year to get next year\'s annual fee waived.',
        value: 'Fee Waived',
        conditions: 'Calculated per card anniversary cycle.'
      }
    ]
  },
  {
    bank: 'SBI Card',
    variant: 'Cashback',
    network: 'Visa',
    theme: {
      bgGradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 60%, #0c4a6e 100%)',
      textColor: '#f0f9ff',
      glowColor: 'rgba(56, 189, 248, 0.2)', // Electric blue glow
      accentColor: '#38bdf8'
    },
    benefits: [
      {
        category: 'cashback',
        title: '5% Cashback on Online Spends',
        description: 'Get 5% cashback on all online purchases without merchant restrictions.',
        value: '5% Cashback',
        conditions: 'Capped at Rs. 5,000 cashback per billing cycle.'
      },
      {
        category: 'cashback',
        title: '1% Cashback on Offline Spends',
        description: 'Get 1% cashback on all offline retail spends.',
        value: '1% Cashback',
        conditions: 'No monthly cap on offline cashback. Excludes fuel, utility and rent.'
      },
      {
        category: 'lounge',
        title: 'Domestic Lounge Access',
        description: '4 complimentary domestic airport lounge visits per calendar year.',
        value: '4/year',
        conditions: 'Capped at 1 visit per calendar quarter.'
      },
      {
        category: 'fuel',
        title: 'Fuel Surcharge Waiver',
        description: '1% fuel surcharge waiver across all petrol pumps in India.',
        value: '1% Waiver',
        conditions: 'On transactions between Rs. 500 and Rs. 3,000. Capped at Rs. 100 per billing statement.'
      },
      {
        category: 'milestone',
        title: 'Annual Fee Reversal',
        description: 'Get your Rs. 999 annual fee reversed on achieving annual spends of Rs. 2 Lakhs.',
        value: 'Rs. 999 Saved',
        conditions: 'Achieved in the preceding card membership year.'
      }
    ]
  },
  {
    bank: 'ICICI Bank',
    variant: 'Amazon Pay',
    network: 'Visa',
    theme: {
      bgGradient: 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #030712 100%)',
      textColor: '#ff9900', // Amazon Orange Accent
      glowColor: 'rgba(255, 153, 0, 0.15)',
      accentColor: '#ff9900'
    },
    benefits: [
      {
        category: 'cashback',
        title: '5% Cashback on Amazon Prime',
        description: 'Prime members get 5% cashback on Amazon India shopping.',
        value: '5% Cashback',
        conditions: 'Credited directly as Amazon Pay balance. No capping.'
      },
      {
        category: 'cashback',
        title: '3% Cashback on Amazon (Non-Prime)',
        description: 'Non-prime members get 3% cashback on Amazon India purchases.',
        value: '3% Cashback',
        conditions: 'Credited directly as Amazon Pay balance. No capping.'
      },
      {
        category: 'cashback',
        title: '2% Cashback on Partners',
        description: 'Get 2% cashback on Amazon Pay partner merchants (flights, hotels, bills, food delivery).',
        value: '2% Cashback',
        conditions: 'Must pay using Amazon Pay wallet/UPI portal.'
      },
      {
        category: 'cashback',
        title: '1% Cashback on Other Spends',
        description: 'Get 1% cashback on all other retail transactions.',
        value: '1% Cashback',
        conditions: 'Excludes gold, fuel purchases, EMI transactions.'
      },
      {
        category: 'dining',
        title: 'Culinary Treats Discount',
        description: 'Minimum 15% discount on dining bills at participating restaurants across India.',
        value: '15% Off',
        conditions: 'Via ICICI Culinary Treats program.'
      },
      {
        category: 'fuel',
        title: 'Fuel Surcharge Waiver',
        description: '1% fuel surcharge waiver on gas purchases.',
        value: '1% Waiver',
        conditions: 'Valid at all fuel stations in India.'
      }
    ]
  },
  {
    bank: 'American Express',
    variant: 'Platinum Card',
    network: 'Amex',
    theme: {
      bgGradient: 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 40%, #475569 100%)',
      textColor: '#0f172a',
      glowColor: 'rgba(255, 255, 255, 0.25)', // Bright platinum white glow
      accentColor: '#ffffff'
    },
    benefits: [
      {
        category: 'rewards',
        title: 'Membership Rewards',
        description: 'Earn 1 Membership Reward Point for every Rs. 40 spent on all items.',
        value: '2.5% Value',
        conditions: 'Points never expire.'
      },
      {
        category: 'rewards',
        title: '5X points on Reward Multiplier',
        description: 'Earn 5X Reward Points on purchases through the Amex Reward Multiplier.',
        value: '12.5% Value',
        conditions: 'Applicable to select partners like Apple, Myntra, etc.'
      },
      {
        category: 'lounge',
        title: 'Centurion & Priority Pass Lounges',
        description: 'Unlimited access to American Express Centurion Lounges, Priority Pass, and Delta Sky Clubs globally.',
        value: 'Unlimited Global',
        conditions: 'Covers primary cardmember and 1 guest.'
      },
      {
        category: 'dining',
        title: 'Global Dining Credits',
        description: 'Complimentary dining credits worth Rs. 20,000 per year at curated luxury restaurants.',
        value: 'Rs. 20,000/yr',
        conditions: 'Split into domestic and international dining credits.'
      },
      {
        category: 'milestone',
        title: 'Taj Stays Vouchers',
        description: 'Get complimentary Taj Hotel stay vouchers worth Rs. 45,000 upon paying the card joining fee.',
        value: 'Rs. 45,000 Stay',
        conditions: 'One-time onboarding benefit.'
      }
    ]
  },
  {
    bank: 'HDFC Bank',
    variant: 'Millennia',
    network: 'Mastercard',
    theme: {
      bgGradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)',
      textColor: '#e0e7ff',
      glowColor: 'rgba(99, 102, 241, 0.2)', // Indigo glow
      accentColor: '#6366f1'
    },
    benefits: [
      {
        category: 'cashback',
        title: '5% Cashback on Partner Apps',
        description: 'Earn 5% cashback on Amazon, Flipkart, Swiggy, Zomato, BookMyShow, Uber, and Myntra.',
        value: '5% Cashback',
        conditions: 'Capped at Rs. 1,000 total per calendar month.'
      },
      {
        category: 'cashback',
        title: '1% Cashback on Other Spends',
        description: 'Earn 1% cashback on other offline and online retail purchases.',
        value: '1% Cashback',
        conditions: 'Includes wallet loads. Capped at Rs. 1,000 per billing cycle.'
      },
      {
        category: 'lounge',
        title: 'Domestic Lounge Access',
        description: '8 complimentary domestic airport lounge visits per calendar year.',
        value: '8/year',
        conditions: 'Capped at 2 visits per calendar quarter.'
      },
      {
        category: 'dining',
        title: 'Dineout Discounts',
        description: 'Get up to 15% discount at premium partner dining spaces.',
        value: '15% Off',
        conditions: 'Paid via Swiggy Dineout inside the app.'
      },
      {
        category: 'milestone',
        title: 'Quarterly Voucher Benefit',
        description: 'Get Rs. 1,000 gift vouchers on spending Rs. 100,000 or more in a calendar quarter.',
        value: 'Rs. 1,000/qtr',
        conditions: 'Redeemable on top brands (Amazon, Flipkart, etc.).'
      }
    ]
  },
  {
    bank: 'Axis Bank',
    variant: 'Atlas',
    network: 'Visa',
    theme: {
      bgGradient: 'linear-gradient(135deg, #4c0519 0%, #881337 50%, #3f0712 100%)', // Burgundy/Gold luxury theme
      textColor: '#ffe4e6',
      glowColor: 'rgba(244, 63, 94, 0.15)', // Crimson/Gold glow
      accentColor: '#f43f5e'
    },
    benefits: [
      {
        category: 'rewards',
        title: 'Edge Mile Multiplier',
        description: 'Earn 5 EDGE Miles per Rs. 100 spent on flights & hotels. Earn 2 EDGE Miles per Rs. 100 on other items.',
        value: 'up to 5% Miles',
        conditions: '1 EDGE Mile = 1 Partner Point/Mile (e.g. Marriott Bonvoy, Singapore Airlines).'
      },
      {
        category: 'lounge',
        title: 'Premium Lounge & Meet/Greet',
        description: 'Complimentary domestic & international airport lounge accesses and VIP Meet & Greet services.',
        value: 'Tiered Access',
        conditions: 'Domestic (unlimited for top tier). International: up to 18 visits depending on annual spends.'
      },
      {
        category: 'milestone',
        title: 'Tier Progression Miles',
        description: 'Get up to 10,000 EDGE Miles upon achieving Silver, Gold, or Platinum milestone tiers.',
        value: '10,000 Miles',
        conditions: 'Tier determined by annual spends of Rs. 3L, 7.5L, and 15L.'
      },
      {
        category: 'dining',
        title: 'Axis Dining Delights',
        description: 'Up to 15% off at partner restaurants via EasyDiner integration.',
        value: '15% Off',
        conditions: 'Up to Rs. 500 discount per month.'
      }
    ]
  },
  {
    bank: 'FPL Technologies',
    variant: 'OneCard',
    network: 'RuPay',
    theme: {
      bgGradient: 'linear-gradient(135deg, #111827 0%, #1f2937 70%, #030712 100%)', // Stealth black metal card
      textColor: '#ef4444', // Red glow accent
      glowColor: 'rgba(239, 68, 68, 0.15)',
      accentColor: '#ef4444'
    },
    benefits: [
      {
        category: 'rewards',
        title: '5X Reward Points on Top 2 Categories',
        description: 'Earn 5X Reward Points on your top two spending categories automatically each month.',
        value: '1% to 2% Return',
        conditions: 'Points never expire and can be redeemed with 1-click inside the app.'
      },
      {
        category: 'dining',
        title: 'OneCard Offers',
        description: 'Up to 30% discount on around-the-corner premium dining places and cafes.',
        value: '30% Off',
        conditions: 'Must pay using physical or virtual OneCard. Active location tracking required in app.'
      },
      {
        category: 'rewards',
        title: 'Fractional Points',
        description: 'Get fractional reward points on every single penny spent. No round-down math.',
        value: 'Exact Rewards',
        conditions: 'Credited instantly to user ledger.'
      },
      {
        category: 'fuel',
        title: 'Fuel Surcharge Waiver',
        description: '1% fuel surcharge waiver at all gas stations.',
        value: '1% Waiver',
        conditions: 'Valid on transactions up to Rs. 4,000. Capped at Rs. 150 per month.'
      }
    ]
  }
];
