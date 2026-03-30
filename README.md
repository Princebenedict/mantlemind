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



Future Improvements
Add more supported Mantle assets
Add charts and analytics
Move AI analysis to a secure backend
Improve portfolio insights and recommendations
