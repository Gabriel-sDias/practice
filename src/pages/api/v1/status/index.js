import database from "../../../../infra/database";
async function status(request, response) {
  const updateAt = new Date().toISOString();
  const databaseName = process.env.POSTGRES_DB;
  const dbVersion = await database.query("SHOW server_version;");
  const dbConections = await database.query("SHOW max_connections;");
  const dbConectionsUsed = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const version = dbVersion?.res?.rows?.[0].server_version;
  const conections = dbConections?.res?.rows?.[0].max_connections;
  const conectionsUsed = dbConectionsUsed?.res?.rows?.[0].count;

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: version,
        max_conection: parseInt(conections),
        conection_used: conectionsUsed,
      },
    },
  });
}

export default status;
