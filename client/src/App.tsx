import React, { useState } from 'react'
import { runSQL } from './api'
import QueryForm from './components/QueryForm'

export default function App() {
  const [rows, setRows] = useState<any[] | null>(null)
  const [error, setError] = useState<string>('')

  async function onRun(sql: string) {
    setError('')
    setRows(null)
    try {
      const res = await runSQL(sql)
      setRows(res.rows || [])
    } catch (e: any) {
      setError(e?.message || 'Query failed')
    }
  }

  return (
    <div style={{padding: 16, fontFamily: 'system-ui, sans-serif'}}>
      <h1>Employees Table (workspace.demo_db.employees)</h1>
      <QueryForm onSubmit={onRun} />
      {error && (
        <pre style={{ color: 'crimson', background: '#fee', padding: 8, whiteSpace: 'pre-wrap' }}>
{error}
        </pre>
      )}
      {rows && (
        <div style={{marginTop: 16, overflowX: 'auto'}}>
          <h3>Rows</h3>
          <table border={1} cellPadding={6}>
            <thead>
              <tr>
                {Object.keys(rows[0] || {}).map((k) => <th key={k}>{k}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  {Object.keys(rows[0] || {}).map((k) => <td key={k}>{String(r[k])}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
