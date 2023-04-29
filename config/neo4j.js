const neo4j = require('neo4j-driver');

const uri = process.env.NEO4J_URI;
const user = process.env.NEO4J_USER;
const password = process.env.NEO4J_PASSWORD;
const pool = Number(process.env.NEO4J_SESSION_POOL);
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password), { maxConnectionPoolSize: pool });

const session = driver.session({
  database: 'neo4j',
  defaultAccessMode: neo4j.session.WRITE,
  // 세션풀에서 세션이 반환되기 전에 최대 대기 시간을 지정.
  // connectionAcquisitionTimeout: 5000,
});
console.log('neo4j!!!!!!!!!!!!!!!!!!!');
module.exports = session;
