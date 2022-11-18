import {generateImportSql} from './generate-import-sql.ts';

const [inputFile] = Deno.args

const sql = await generateImportSql(inputFile)

console.log(sql)
