# MSMEVerse Frontend

A comprehensive frontend application for the MSMEVerse platform, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### Authentication
- User registration and login
- Role-based access control (MSME, Creator, Admin)
- JWT authentication with token management

### MSME Features
- Dashboard with stats and quick actions
- Profile management with KYC verification
- Creator marketplace with advanced filtering
- Campaign management (create, view, manage)
- Wallet and transaction management
- Escrow payment system

### Creator Features
- Dashboard with earnings and campaign stats
- Portfolio management with social media integration
- Brand marketplace
- Campaign management
- Wallet with earnings and withdrawals

### Admin Features
- User management
- Campaign management
- Transaction management
- Analytics and reports

### Common Features
- Real-time chat system
- Notification system
- Search and filtering
- File upload system
- Responsive design

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Form Handling**: React Hook Form with Zod validation
- **API Client**: Axios
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Charts**: Recharts
- **File Upload**: react-dropzone

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
NEXT_PUBLIC_RAZORPAY_KEY=your_razorpay_key_here
NEXT_PUBLIC_USE_MOCK=true
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication pages
│   ├── (msme)/            # MSME-specific pages
│   ├── (creator)/         # Creator-specific pages
│   ├── (admin)/           # Admin-specific pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── auth/             # Authentication components
│   ├── msme/             # MSME components
│   ├── creator/          # Creator components
│   ├── admin/            # Admin components
│   ├── common/           # Common components
│   ├── chat/             # Chat components
│   ├── escrow/           # Escrow components
│   ├── search/           # Search components
│   ├── notifications/    # Notification components
│   └── upload/           # Upload components
├── lib/                  # Utilities and helpers
│   ├── api/              # API client functions
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript types
│   ├── mocks/            # Mock data
│   └── utils/            # Utility functions
├── contexts/             # React contexts
└── public/               # Static assets
```

## API Integration

The frontend is designed to work with a Django REST API backend. API client functions are located in `lib/api/`. Currently, the app uses mock data for development. Set `NEXT_PUBLIC_USE_MOCK=false` to use the real API.

## Development

### Mock Mode

The application can run in mock mode for development without a backend. Set `NEXT_PUBLIC_USE_MOCK=true` in `.env.local`.

### Building for Production

```bash
npm run build
npm start
```

## Features Implementation Status

- ✅ Authentication system
- ✅ MSME dashboard and features
- ✅ Creator dashboard and features
- ✅ Admin dashboard
- ✅ Chat system (UI ready)
- ✅ Notification system (UI ready)
- ✅ File upload components
- ✅ Escrow components
- ✅ Search and filtering
- ⚠️ Razorpay integration (placeholder)
- ⚠️ WebSocket integration (placeholder)
- ⚠️ Meta Graph API integration (placeholder)

## Next Steps

1. Connect to Django REST API backend
2. Implement real-time WebSocket connections
3. Integrate Razorpay payment gateway
4. Add Meta Graph API integration
5. Implement file upload to S3/Cloudinary
6. Add analytics and tracking
7. Performance testing and optimization
8. User acceptance testing
9. Deploy to Vercel

## License

MIT
