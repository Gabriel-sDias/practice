import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    await client.connect();
    const res = await client.query(queryObject);
    return {
      res: res,
      status: 200,
    };
  } catch (err) {
    console.error("Erro na conexão:", err.message);
    return {
      connected: false,
      status: 503,
    };
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
