import React, { useState } from 'react'

export default function QueryForm({ onSubmit }: { onSubmit: (sql: string) => void }) {
  const [sql, setSql] = useState<string>('SELECT * FROM workspace.demo_db.employees LIMIT 100')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(sql)
  }

  return (
    <form onSubmit={handleSubmit} style={{display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap'}}>
      <input
        value={sql}
        onChange={(e) => setSql(e.target.value)}
        style={{minWidth: 480, padding: 8}}
        placeholder="Write SQL here"
      />
      <button type="submit">Run</button>
    </form>
  )
}
