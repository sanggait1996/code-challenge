# Currency Swap Form - Problem 2

## Note: I'm a fullstack developer, but I'm stronger in backend than frontend.

A modern, beautiful, and user-friendly **Currency Swap Form** built as part of the take-home coding challenge.

This single-page application allows users to:

- Select "From" and "To" tokens
- Input the amount to swap
- See real-time estimated output amount (based on mock prices)
- Toggle swap direction
- Perform a simulated swap with loading state and success feedback

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite (fast & modern development server)
- **Styling**: Tailwind CSS v4 (with official `@tailwindcss/vite` plugin)
- **Form Management & Validation**: react-hook-form + Zod
- **Icons**: lucide-react
- **Animations**: framer-motion
- **Price Simulation**: Custom hook with mocked prices & random delay
- **Mock Token Data**: Static list with TrustWallet SVG/PNG icons

## Features

- Dark, gradient-themed UI with glassmorphism effect
- Searchable token selector dropdown with icons
- Real-time price estimation (mock USD values)
- Input validation for amount (only valid numbers)
- Smooth swap direction toggle animation
- Loading indicator & simulated 2.2s swap delay
- Responsive design (mobile + desktop friendly)
- Full TypeScript support with strict typing

## Setup & Run Instructions

### Prerequisites

- Node.js >= 18
- npm >= 9

### 1. Install Dependencies

```bash
npm install
```

### 2. Development Server

```bash
npm run dev
```
