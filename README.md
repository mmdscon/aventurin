# Orthopaeden Graz – Landing Page

Next.js 15 Landing Page für die Orthopaeden Graz (Ragnitz).

## Setup

```bash
npm install
cp .env.example .env.local
# Env-Variablen befüllen
npm run dev
```

## Env-Variablen

| Variable | Beschreibung |
|---|---|
| `WEBHOOK_URL` | Webhook-URL für Lead-Übermittlung (Make, Zapier, n8n, …) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics Measurement ID |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID (optional) |

## Brand

- **Akzentfarbe:** `#9BD4E1`
- **Font:** Poppins (Google Fonts)
- **Text:** Schwarz `#111111` oder Weiß
- **Buttons:** Fully rounded (`border-radius: 9999px`)

## Deploy

Direkt auf Vercel deploybar. `vercel.json` ist bereits konfiguriert.
