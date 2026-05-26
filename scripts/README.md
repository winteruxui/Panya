# Panya Screenshot & Figma Upload Scripts

## Prerequisites

Install Node.js (v18+) from https://nodejs.org/

Then install dependencies:
```
cd scripts
npm install
npx playwright install chromium
```

## Step 1 — Take screenshots

```
node screenshot.js
```

This will:
- Start a local HTTP server on port 3939
- Visit all 12 pages and trigger ~38 states
- Save PNGs to `scripts/screenshots/`
- Shut down the server when done

## Step 2 — Upload to Figma

You need:
- **FIGMA_TOKEN** — Personal Access Token from figma.com → Settings → Personal Access Tokens
- **FIGMA_FILE** — The key from your Figma file URL: `figma.com/design/[THIS_PART]/...`

Run:
```
FIGMA_TOKEN=your_token FIGMA_FILE=your_file_key node figma-upload.js
```

Or on Windows PowerShell:
```
$env:FIGMA_TOKEN="your_token"; $env:FIGMA_FILE="your_file_key"; node figma-upload.js
```

This will:
- Create one Figma page per section (Auth, Dashboard, Plans, Content Tools, etc.)
- Upload each screenshot as a 1440px frame
- Add a text label below each frame
- Add a sticky note to the RIGHT of each frame with interactions list
- Arrange frames 3 per row with 120px gap
