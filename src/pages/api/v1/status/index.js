import database from "../../../../infra/database";
async function status(request, response) {
  const result = await database.query("SELECT NOW();");
  response.status(result.status).json(result.res);
}

export default status;
