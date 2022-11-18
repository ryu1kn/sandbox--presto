import {assertEquals} from 'https://deno.land/std@0.97.0/testing/asserts.ts'
import {generateImportSql} from './generate-import-sql.ts'

Deno.test('Create an import SQL', async () => {
  const sql = await generateImportSql('./test-data.json')
  assertEquals(sql, `DROP TABLE IF EXISTS role;
CREATE TABLE role (config varchar);

INSERT INTO role VALUES ('{"RoleName":"ROLE_1","RoleId":"ROLE_ID_1","Arn":"arn:aws:iam::987654321098:role/role_1"}');
INSERT INTO role VALUES ('{"RoleName":"ROLE_2","RoleId":"ROLE_ID_2","Arn":"arn:aws:iam::987654321098:role/role_2"}');`);
})
