import pg from 'pg'

import { PGURI, POSTGRES_CERT } from '@/common/constants'

const { Pool } = pg

export const pool = new Pool({
  connectionString: PGURI,

  // https://github.com/brianc/node-postgres/issues/2089
  ...(!PGURI.includes('localhost') && {
    ssl: {
      ca: `-----BEGIN CERTIFICATE-----\n${POSTGRES_CERT}\n-----END CERTIFICATE-----`,
      checkServerIdentity: () => undefined,
    },
  }),
})

// export async function poolQuery<Results extends pg.QueryResultRow>(sql: string, values?: unknown[]) {
//   if (PROJECT_ENV.startsWith('local')) {
//     // eslint-disable-next-line no-console
//     console.log(formatDate(new Date()), '-', sql, values)
//   }

//   return await pool.query<Results>(sql, values).catch((error) => {
//     if (NODE_ENV === 'production') {
//       console.error(error.message, sql, values)
//       throw ServiceUnavailableError('Database query error')
//     } else {
//       throw ServiceUnavailableError(error)
//     }
//   })
// }
