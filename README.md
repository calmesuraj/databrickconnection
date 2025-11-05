# Databricks React + Vite + Express — Ready to Run

This app shows rows from `workspace.demo_db.employees` using a React UI and an Express API backed by Databricks SQL.

## Structure
```
databricks_react_app/
├─ client/    # React + Vite
└─ server/    # Express API with Databricks connection
```

## 1) Install (Windows / macOS / Linux / Raspberry Pi)

### Backend
```bash
cd server
npm install
```

### Frontend
```bash
cd ../client
npm install
```

## 2) Configure
Edit `server/.env` (already populated for your host, path, and token).

## Databricks Connection Setup Guide

This guide explains how to set up a connection to Databricks in this project.

### Prerequisites
- Node.js and npm installed
- Access to a Databricks workspace
- Databricks personal access token

### Folder Structure
The backend connection logic is in the `server/src` folder. You will need to create or update the following files:

- `server/src/env.ts`: Stores environment variables (Databricks host and token)
- `server/src/databricks.ts`: Contains the code to connect and interact with Databricks

### Step 1: Create `env.ts`
Create a file named `env.ts` in `server/src` with the following code:

```ts
export const DATABRICKS_HOST = process.env.DATABRICKS_HOST || '';
export const DATABRICKS_TOKEN = process.env.DATABRICKS_TOKEN || '';
```

Set your environment variables in a `.env` file or directly in your shell:
```
DATABRICKS_HOST=https://<your-databricks-instance>.cloud.databricks.com
DATABRICKS_TOKEN=<your-personal-access-token>
```

### Step 2: Create `databricks.ts`
Create a file named `databricks.ts` in `server/src` with the following code:

```ts
import axios from 'axios';
import { DATABRICKS_HOST, DATABRICKS_TOKEN } from './env';

export async function queryDatabricks(endpoint: string, data: any) {
  const url = `${DATABRICKS_HOST}/api/2.0/${endpoint}`;
  const response = await axios.post(url, data, {
    headers: {
      'Authorization': `Bearer ${DATABRICKS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}
```

### Step 3: Install Dependencies
Run the following command in the `server` folder to install `axios`:
```
npm install axios
```

### Step 4: Usage Example
You can now use the `queryDatabricks` function in your backend code to interact with Databricks APIs.

```ts
import { queryDatabricks } from './databricks';

// Example: List clusters
queryDatabricks('clusters/list', {}).then(console.log);
```

### Security Note
Never commit your Databricks token to version control. Use environment variables or a `.env` file (add `.env` to `.gitignore`).

### References
- [Databricks REST API documentation](https://docs.databricks.com/api/)
## 3) Run (two terminals)

### Terminal A – API
```bash
cd server
npm run dev
# API on http://localhost:8787
```

### Terminal B – UI
```bash
cd client
npm run dev
# http://localhost:5173
```

Open http://localhost:5173 and click **Run** (default query is already set to
`SELECT * FROM workspace.demo_db.employees LIMIT 100`).

## Notes
- The Vite dev server proxies `/api/*` to `http://localhost:8787` (see `client/vite.config.ts`).
- All Databricks calls happen only on the server (`@databricks/sql`).
- If you need a different catalog/schema, either:
  - Fully qualify in SQL, or
  - Uncomment the `USE CATALOG` / `USE SCHEMA` lines in `server/src/databricks.ts`.
- For production, build both sides (`npm run build`) and host the API separately.
