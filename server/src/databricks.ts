import { DBSQLClient } from '@databricks/sql'
import { ENV } from './env'

export async function runQuery(sql: string) {
  const client = new DBSQLClient()
  await client.connect({
    host: ENV.DATABRICKS_HOSTNAME,
    path: ENV.DATABRICKS_HTTP_PATH,
    token: ENV.DATABRICKS_TOKEN,
  })

  const session = await client.openSession()
  try {
    // Uncomment if you want to force catalog/schema each request:
    // await session.executeStatement('USE CATALOG workspace')
    // await session.executeStatement('USE SCHEMA demo_db')

    const op = await session.executeStatement(sql, { runAsync: true })
    const rows = await op.fetchAll()
    await op.close()
    return rows
  } finally {
    await session.close()
    await client.close()
  }
}
