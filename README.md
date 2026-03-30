# MantleMind

MantleMind is a Mantle-focused wealth co-pilot that helps users connect their wallet, view portfolio positions, and receive structured yield strategy insights across the Mantle ecosystem.

## Features

- Mantle wallet connection
- Portfolio balance overview
- Risk score and yield gap analysis
- Multiple strategy opinions
- Mantle-focused yield recommendations
- Responsive UI for desktop and mobile

## Tech Stack

- React
- Vite
- CSS
- ethers.js
- Vercel

## Project Structure

```bash
src/
  hooks/
    useWallet.js
  services/
    advisor.js
  App.jsx
  App.css
  index.css
  main.jsx

Getting Started
Install dependencies:

npm install
Start development server:

npm run dev
Build for production:

npm run build
Deployment
This project can be deployed with Vercel.

Typical workflow:

git add .
git commit -m "Update project"
git push origin main
If GitHub is connected to Vercel, each push to main will trigger a new deployment automatically.

Security Note
Do not commit .env files or private API keys.

If you use external APIs in production, keep secrets on the server side and avoid exposing them in the frontend.

Future Improvements
Add more Mantle ecosystem assets
Add charts and analytics
Add protocol allocation breakdowns
Add backend-secured AI analysis
Improve portfolio history and tracking
