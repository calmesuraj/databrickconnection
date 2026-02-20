# Databricks React + Vite + Express — Ready to Run

This app shows rows from `workspace.demo_db.employees` using a React UI and an Express API backed by Databricks SQL.

## Structure
```
databricks_react_app/
├─ client/    # React + Vite
└─ server/    # Express API with Databricks connection
```

## Installation Guide

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd databricks-react

# Install root dependencies (if any)
npm install

# Install Backend dependencies
cd server
npm install

# Install Frontend dependencies
cd ../client
npm install
```

### 2. Common Installation Issues and Solutions

1. If you get permission errors:
```bash
# Windows (Run PowerShell as Administrator)
npm install -g npm@latest

# macOS/Linux
sudo npm install -g npm@latest
```

2. If you get node-gyp errors:
```bash
# Windows
npm install --g --production windows-build-tools

# macOS
xcode-select --install

# Linux
sudo apt-get install build-essential
```

3. Clearing npm cache if needed:
```bash
npm cache clean --force
```

## 2) Configure
Edit `server/.env` (already populated for your host, path, and token).

# Databricks React Dashboard

A React-based dashboard for interacting with Databricks SQL queries and displaying data in interactive tables.

## Features

- Interactive SQL data tables with pagination
- Navigation between pages
- Table selection interface
- Reusable SQL table component
- Error handling and loading states
- Responsive design

## Prerequisites

### 1. Install Node.js and npm

1. Download and install Node.js:
   - Go to [Node.js official website](https://nodejs.org/)
   - Download the LTS (Long Term Support) version (v14 or later)
   - Run the installer and follow the installation steps

2. Verify Node.js installation:
```bash
node --version
```

3. Install npm globally (Node Package Manager):
```bash
# Windows
npm install -g npm@latest

# macOS/Linux (might need sudo)
sudo npm install -g npm@latest
```

4. Verify npm installation:
```bash
npm --version
```

### 2. Additional Requirements
- Access to a Databricks workspace
- Databricks personal access token
- Git (for cloning the repository)

### 3. Environment Setup

1. Windows Users:
   - Run PowerShell as Administrator for global installations
   - If you get execution policy errors, run:
   ```powershell
   Set-ExecutionPolicy RemoteSigned
   ```

2. macOS/Linux Users:
   - You might need to use `sudo` for global installations
   - Ensure you have write permissions in your project directory

### Project Structure

```
client/
  ├── src/
  │   ├── components/
  │   │   ├── SQLTable.tsx      # Reusable SQL table component
  │   │   └── table.tsx         # Generic data table component
  │   ├── pages/
  │   │   ├── HomePage.tsx      # Landing page
  │   │   └── TablesPage.tsx    # Table selection and display page
  │   ├── App.tsx               # Main application with routing
  │   ├── api.ts                # API utilities for Databricks
  │   └── main.tsx              # Application entry point
  └── package.json
server/
  ├── src/
  │   ├── databricks.ts         # Databricks connection logic
  │   ├── env.ts                # Environment configuration
  │   └── index.ts             # Server entry point
  └── package.json
```

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd databricks-react
```

2. Install dependencies for both client and server:
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Configure environment variables:

Create a `.env` file in the server directory:
```env
DATABRICKS_HOST=https://<your-databricks-instance>.cloud.databricks.com
DATABRICKS_TOKEN=<your-personal-access-token>
```

### Running the Application

1. Start the server:
```bash
cd server
npm run dev
```

2. Start the client (in a new terminal):
```bash
cd client
npm run dev
```

The application will be available at http://localhost:5173

## Component Usage

### SQLTable Component

The `SQLTable` component is a reusable component for displaying SQL query results. Here's how to use it:

```tsx
import SQLTable from '../components/SQLTable';

// Basic usage
<SQLTable query="SELECT * FROM my_table" />

// Advanced usage with all props
<SQLTable
  query="SELECT * FROM employees"
  title="Employee List"
  pageSize={20}
  autoExecute={false}
/>
```

Props:
- `query` (required): SQL query string to execute
- `title` (optional): Title to display above the table
- `pageSize` (optional): Number of rows per page (default: 10)
- `autoExecute` (optional): Whether to execute query automatically (default: true)

### Example Implementations

1. Simple table display:
```tsx
function EmployeeTable() {
  return (
    <SQLTable 
      query="SELECT * FROM employees" 
      title="All Employees"
    />
  );
}
```

2. Custom page size and manual execution:
```tsx
function SalesReport() {
  return (
    <SQLTable 
      query="SELECT * FROM sales WHERE date >= CURRENT_DATE - 30"
      title="Last 30 Days Sales"
      pageSize={15}
      autoExecute={false}
    />
  );
}
```

3. In TablesPage with dynamic queries:
```tsx
function TablesPage() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const tables = [
    { name: 'employees', query: 'SELECT * FROM workspace.demo_db.employees' },
    { name: 'departments', query: 'SELECT * FROM workspace.demo_db.departments' }
  ];

  return (
    <div>
      {/* Table selection buttons */}
      {selectedTable && (
        <SQLTable
          query={tables.find(t => t.name === selectedTable)?.query || ''}
          title={selectedTable}
        />
      )}
    </div>
  );
}
```

## Features

### Table Features
- Pagination with customizable page size
- Loading states during query execution
- Error handling and display
- Optional manual query execution
- Responsive design with horizontal scrolling
- Column header auto-generation
- Alternating row colors

### Navigation
- Home page with welcome message
- Tables page with table selection
- Navigation bar for easy access

## Security Considerations

1. Never commit your Databricks token to version control
2. Use environment variables for sensitive information
3. Implement proper access controls in your Databricks workspace
4. Consider implementing rate limiting for queries

## Troubleshooting

1. If tables don't load, check:
   - Databricks connection settings
   - SQL query syntax
   - Network connectivity
   - Console for error messages

2. If styling issues occur:
   - Check browser console for CSS errors
   - Verify component props
   - Check responsive design breakpoints

## References

- [Databricks SQL Documentation](https://docs.databricks.com/sql/index.html)
- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)

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
