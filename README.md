# Next.js Dashboard with Google Authentication

By Ramesh Chandra Pola,

A modern dashboard application built with Next.js, featuring Google OAuth authentication and a responsive UI for managing pizza orders.

## Features

- **Google Authentication**: Secure login using Google OAuth
- **Protected Routes**: Dashboard pages are only accessible to authenticated users
- **Responsive Design**: Works well on desktop, tablet, and mobile devices
- **Pizza Orders Dashboard**: Display and manage pizza orders with sorting and filtering capabilities
- **Modern UI**: Clean and intuitive user interface built with Tailwind CSS

## Tech Stack

- **Framework**: Next.js (App Router)
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Additional Libraries

- **lucide-react**: Beautifully crafted open source icons
- **next-themes**: Theme management for Next.js
- **react-hot-toast**: Lightweight toast notifications

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nextjs-dashboard.git
   cd nextjs-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

   To get your Google Client ID and Secret:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Navigate to "APIs & Services" > "Credentials"
   - Create an OAuth 2.0 Client ID
   - Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
   - Configure the OAuth consent screen with necessary information
   - Download credentials and add them to your `.env.local` file

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/
├── public/            # Static assets
├── src/
│   ├── app/           # App router pages
│   │   ├── api/       # API routes
│   │   ├── dashboard/ # Dashboard pages
│   │   └── login/     # Login page
│   ├── components/    # React components
│   ├── data/          # Mock data
│   └── types/         # TypeScript type definitions
├── .env.local         # Environment variables
└── README.md          # Project documentation
```

## Assumptions and Challenges

### Assumptions
- Users have basic familiarity with Next.js and React
- Authentication is handled solely through Google OAuth
- The pizza order data is managed through mock data for demonstration purposes

### Challenges Faced
- Implementing protected routes with Next.js App Router
- Managing state across the application while maintaining type safety
- Ensuring responsive design across various device sizes
- Handling authentication flow with proper error states and loading indicators

## Deployment

This project can be easily deployed on [Vercel](https://vercel.com) or [Railway](https://railway.app).

## Testing

This project uses Jest and React Testing Library for testing:

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

Testing libraries used:
- Jest: JavaScript testing framework
- React Testing Library: Testing utilities for React components
- @testing-library/user-event: Simulates user interactions

## License

This project is licensed under the MIT License.
