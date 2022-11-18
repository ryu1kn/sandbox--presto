const TABLE_NAME = 'role'

const statementForDrop = `DROP TABLE IF EXISTS ${TABLE_NAME};`
const statementForCreate = `CREATE TABLE ${TABLE_NAME} (config varchar);`

export const generateImportSql = async (inputFile: string) => {
  const text = await Deno.readTextFile(inputFile)
  const roles = JSON.parse(text).RoleDetailList as any[]
  const statementForInsert = roles.map(r => `INSERT INTO ${TABLE_NAME} VALUES ('${JSON.stringify(r)}');`)

  return [
    statementForDrop,
    statementForCreate,
    '',
    ...statementForInsert
  ].join('\n')
}
