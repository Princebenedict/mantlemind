# MantleMind

MantleMind is an AI-powered wealth co-pilot built for the Mantle ecosystem. It helps users connect a Mantle wallet, inspect supported token balances, and receive portfolio-aware yield strategy guidance through a clean, professional interface.

The project is designed as a product-style DeFi frontend focused on better organization, clearer decision-making, and a stronger first impression for users, demos, and ecosystem presentation.

## Overview

MantleMind aims to simplify how users understand their position on Mantle by combining:

- wallet connection
- live token balance discovery
- AI-powered portfolio interpretation
- yield opportunity framing
- a clean, responsive dashboard experience

The app is especially useful as an early-stage product prototype, hackathon demo, ecosystem tool, or starting point for a more advanced Mantle-native wealth dashboard.

## Features

- Connect a wallet on Mantle Mainnet
- Detect supported asset balances from the connected wallet
- Display portfolio holdings in a clean dashboard layout
- Generate AI-based strategy suggestions
- Show risk score and yield gap summary
- Surface actionable recommendations using Mantle-focused context
- Responsive interface for desktop and mobile
- Product-style branding and polished UI presentation

## Supported Assets

The current version tracks these assets:

- `MNT`
- `mETH`
- `cmETH`
- `FBTC`

You can extend support by updating the token list inside the wallet hook.

## Tech Stack

This project uses:

- `React`
- `Vite`
- `CSS`
- `ethers.js`
- `Gemini API`
- `Vercel`

## Project Structure

```bash
mantlemind/
├── public/
├── src/
│   ├── assets/
│   ├── hooks/
│   │   └── useWallet.js
│   ├── services/
│   │   └── advisor.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── package.json
├── vite.config.js
└── README.md


How It Works
1. Wallet Connection
The user connects a supported Ethereum wallet such as MetaMask.
The app requests access, adds Mantle if needed, and switches the wallet to Mantle Mainnet.

2. Balance Fetching
After connection, the app fetches:

native MNT balance
ERC-20 balances for supported Mantle assets
These balances are then displayed in the portfolio section.

3. AI Strategy Analysis
The frontend sends wallet balance context into the AI strategy layer, which returns:

a risk score
a short explanation of risk posture
a yield gap summary
actionable recommendations
a short portfolio summary
4. UI Presentation
The returned strategy data is rendered inside:

a strategy overview panel
an insights panel
a personalized AI report section
Getting Started
Prerequisites
Before running the project, make sure you have:

Node.js installed
npm installed
a wallet such as MetaMask
access to a Gemini API key if using the current AI setup
Installation
Clone the repository:

git clone https://github.com/YOUR_USERNAME/mantlemind.git
cd mantlemind
Install dependencies:

npm install
Environment Variables
Create a local environment file:

.env.local
Add your environment variable:

VITE_GEMINI_API_KEY=your_api_key_here
Important:
The current frontend implementation uses a VITE_ environment variable. In Vite, variables prefixed with VITE_ are exposed to the browser bundle.

That means this approach is not secure for production if you are calling Gemini directly from the frontend.

For a production-safe version, move the AI request into a backend or serverless function and keep the real API key on the server only.

Run Locally
Start the development server:

npm run dev
Then open the local app in your browser, usually at:

http://localhost:5173
Production Build
To test whether the project builds correctly:

npm run build
To preview the production build locally:

npm run preview
Deployment
Deploy with Vercel
This app is easy to deploy with Vercel.

Option 1: Deploy with GitHub Integration
Push the project to GitHub
Import the repo into Vercel
Add environment variables in the Vercel dashboard
Deploy
Option 2: Deploy with Vercel CLI
vercel
For a production deploy:

vercel --prod
GitHub Deployment Workflow
Typical workflow for pushing updates:

git status
git add .gitignore src/App.css src/App.jsx
git commit -m "Update UI and improve layout"
git push
If your project is connected to Vercel, pushing to GitHub will usually trigger an automatic redeploy.

Security Notes
This section is important.

Current Risk
If you use:

VITE_GEMINI_API_KEY=...
and call Gemini directly from the frontend, the API key can be exposed to end users because the browser receives it as part of the client app.

Recommended Secure Setup
For production security:

move Gemini requests to a backend or serverless API route
store the real API key in server-side environment variables
have the frontend call your backend endpoint instead of Gemini directly
Git Safety
Never commit these files:

.env
.env.local
.env.production
any file containing private API keys
Your .gitignore should exclude all local secret files.

If a secret was committed before:

revoke or rotate the key immediately
remove the file from future commits
consider cleaning git history if necessary
Example .gitignore
A secure version should include:

node_modules
dist
.env
.env.*
!.env.example
.vercel
UI Design Direction
The interface is intentionally styled as:

premium dark product UI
Mantle-aligned green accent palette
glassy surfaces and structured dashboard cards
strong typography and cleaner sectioning
mobile-friendly responsive layout
The goal is to feel closer to a serious web3 product than a default starter app.

Responsive Design
The app is optimized for:

desktop screens
tablets
mobile devices
Responsive behavior includes:

stacked layout on smaller screens
full-width action buttons on mobile
resized heading scale
improved readability on narrow viewports
Future Improvements
Possible next steps for the project:

move AI analysis to a secure backend endpoint
support more Mantle-native assets
add historical portfolio tracking
add charts and visual analytics
add protocol cards and yield comparison modules
support transaction execution flows
support portfolio rebalancing suggestions
add authentication/session history
save previous strategy reports
improve token metadata and logos