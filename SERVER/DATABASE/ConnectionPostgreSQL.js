import pg from 'pg'
const { Pool, Client } = pg
 
// pools will use environment variables
// for connection information
const pool = new pg.PoolPool()
 
// you can also use async/await
const res = await pool.query('SELECT NOW()')
await pool.end()
 
// clients will also use environment variables
// for connection information
const client = new Client()
await client.connect()
 
const res = await client.query('SELECT NOW()')
await client.end()


// this code is for connection whit cloud providers, include methods for connection to database instances using short-lived
// import pg from 'pg'
// const { Pool } = pg
// import { RDS } from 'aws-sdk'
 
// const signerOptions = {
//   credentials: {
//     accessKeyId: 'YOUR-ACCESS-KEY',
//     secretAccessKey: 'YOUR-SECRET-ACCESS-KEY',
//   },
//   region: 'us-east-1',
//   hostname: 'example.aslfdewrlk.us-east-1.rds.amazonaws.com',
//   port: 5432,
//   username: 'api-user',
// }
 
// const signer = new RDS.Signer()
 
// const getPassword = () => signer.getAuthToken(signerOptions)
 
// const pool = new Pool({
//   user: signerOptions.username,
//   password: getPassword,
//   host: signerOptions.hostname,
//   port: signerOptions.port,
//   database: 'my-db',
// })