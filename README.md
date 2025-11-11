# Hiring Platform

A simple hiring platform application with hand gesture recognition for profile photo capture.

## Project Overview

This project is a web-based hiring platform that allows:
- **Admin users** to create and manage job postings
- **Candidates** to browse available jobs and submit applications
- **Hand gesture recognition** feature for capturing profile photos during the application process using MediaPipe

The application features a clean, modern UI with role-based access control and form validation.

## Tech Stack Used

### Core Framework
- **Next.js 15.5.6** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type safety

### Styling
- **TailwindCSS 4** - Utility-first CSS framework
- **Radix UI / Shadcn UI** - Headless UI components
- **Lucide React** - Icon library
- **class-variance-authority & clsx** - Dynamic className utilities

### State Management & Data Fetching
- **Zustand** - Lightweight state management
- **TanStack Query (React Query)** - Server state management
- **Axios** - HTTP client

### Form Handling
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation integration

### Recognition Features
- **MediaPipe Hands** - Hand landmark detection
- Hand gesture recognition for profile photo capture (three fingers → two fingers → one finger countdown)

### UI Components
- **Shadcn UI**
- **Sonner** - Toast notifications
- Custom components built with Radix UI + TailwindCSS

### Development Tools
- **ESLint** - Code linting
- **Turbopack** - Fast bundler (Next.js dev server)

## How to Run Locally

### Prerequisites
- Node.js (version 20 or higher recommended)
- npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/RamdlanFaqih/hiring-platform-ramfaq.git
cd hiring-platform-ramfaq
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

### Login Credentials

The application uses a simple authentication system with the following credentials:

**Admin Account:**
- Username: `admin`
- Password: `password`
- Access: Dashboard with job management

**Candidate Account:**
- Username: `candidate`
- Password: `password`
- Access: Job listings and application form

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Features

### Admin Features
- Create new job postings with job name, description, and salary range
- View list of all job postings
- View list of candidates

### Candidate Features
- Browse available job listings
- View job details
- Apply for jobs with a comprehensive application form
- Capture profile photo using hand gesture recognition
- Form fields include: full name, date of birth, gender, domicile, phone number, email, and LinkedIn profile

### Hand Gesture Photo Capture
The application includes a unique feature for capturing profile photos using hand gestures:
1. Show three fingers to start
2. Then two fingers to continue
3. Then one finger to trigger countdown
4. Photo is automatically captured after countdown

This feature uses MediaPipe Hands for real-time hand tracking and gesture recognition.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
├── modules/          # Feature-based modules (admin, candidate, auth)
├── schema/           # Zod validation schemas
├── services/         # API services and hooks
├── store/            # Zustand state management
├── types/            # TypeScript type definitions
└── lib/              # Utility functions
```

## Notes
- This is a development/demo project using mock data
- Data fetching with TanStack Query and Axios has not been implemented yet
- Authentication is stored in browser cookies via Zustand
