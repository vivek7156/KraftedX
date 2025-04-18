![image](https://github.com/user-attachments/assets/6e0fb4d8-790a-4799-b123-aabff66aa2d5)
# KraftedX: Modern Learning Platform

![KraftedX Logo](public/logo.png)

KraftedX is a sleek, interactive learning platform designed for developers and tech enthusiasts. Built with Next.js, React, and Clerk for authentication, KraftedX offers a seamless learning experience with a beautiful UI and smooth interactions.

## Features

- **Secure Authentication** via Clerk
- **Interactive Dashboard** with dynamic statistics and progress tracking
- **Beautiful UI** with custom components and animations
- **Responsive Design** for all device sizes
- **Interactive Background** with particle effects

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Authentication**: Clerk
- **State Management**: React Context API
- **Animations**: Framer Motion
- **UI Components**: Shadcn UI
- **Styling**: Tailwind CSS with custom theme

## Getting Started

### Prerequisites
- Node.js 16.8.0 or later
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/kraftedx.git
   cd kraftedx
   ```
2. Install dependencies
   ```bash
    npm install
    # or
    yarn install
   ```
3. Create a .env.local file in the root directory with the following variables:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=sign-up
   ```
4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Project Structure
```bash
  kraftedx/
├── src/
│   ├── app/                   # Next.js app directory
│   │   ├── layout.tsx         # Root layout component
│   │   ├── page.tsx           # Home page
│   │   ├── dashboard/         # Dashboard
│   │   ├── sign-in/           # Sign-in routes
│   │   └── sign-up/           # Sign-up routes
│   ├── components/            # React components
│   │   ├── InteractiveBackground.tsx
│   │   ├── Navbar.tsx
│   │   └── ui/                # UI components
│   └── middleware.ts          # Next.js middleware
├── public/                    # Static assets
└── .env.local                 # Environment variables
```

### Authentication
Authentication
KraftedX uses Clerk for authentication, providing a secure and user-friendly authentication experience. The authentication flow includes:

User navigates to a protected route (e.g., /dashboard)
Middleware checks if the user is authenticated
If not authenticated, the user is redirected to the sign-in page
After successful authentication, the user is redirected back to the original destination
