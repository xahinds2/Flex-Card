Build a simple modern web app called “CardNest” using:

- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui
- MongoDB
- Mongoose
- Clerk Authentication

Purpose:
Users can manually add their credit card variants and view all associated benefits.

IMPORTANT:
- DO NOT ask for or store card numbers
- DO NOT store CVV, expiry dates, or sensitive banking info
- Users only select card variants manually
- Privacy-first approach

Core Features:

# Authentication
Use Clerk for:
- Sign up
- Login
- Protected dashboard routes
- User profile

# Dashboard
After login, users should see:
- their added cards
- benefits for each card
- clean responsive UI

# Add Card Feature
Users can:
- search/select card
- choose:
  - bank
  - card variant
  - network (Visa/Mastercard/RuPay/Amex)

Optional:
- nickname for card

Example:
- HDFC Millennia Visa
- SBI Cashback Visa
- ICICI Amazon Pay Visa

# Benefits Display
Each card should display:
- cashback benefits
- lounge access
- rewards
- dining offers
- fuel surcharge waiver
- milestone benefits

Use expandable cards or tabs.

# Database Models

## UserCard
Fields:
- userId
- bank
- variant
- network
- nickname
- createdAt

## CardBenefit
Fields:
- bank
- variant
- network
- category
- title
- description
- value
- conditions

# Pages

Public:
- Landing page
- Features section

Protected:
- Dashboard
- Add card page
- Card details page

# UI Requirements
- modern minimal UI
- responsive
- dark mode
- card-based layout
- search autocomplete
- loading skeletons
- toast notifications

# API Requirements
Create API routes for:
- add card
- get user cards
- get benefits
- delete card

# Technical Requirements
- use App Router
- use server actions where appropriate
- proper folder structure
- reusable components
- environment variables
- secure API validation
- MongoDB connection utility
- clean code

# Generate:
- full folder structure
- MongoDB models
- Clerk setup
- API routes
- dashboard UI
- reusable components
- sample seed data
- landing page
- Tailwind styling
- setup instructions

Start with MVP only.

The app should feel clean, fast, and production-ready.
