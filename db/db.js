const neo4j = require('neo4j-driver');

class Neo4jSession {
  constructor() {
    this.driver = neo4j.driver(
      'bolt://127.0.0.1:7687',
      neo4j.auth.basic('neo4j', 'neo4jneo4j')
    );
    this.session = this.driver.session();
    
  }

  async run(query, params) {
    const result = await this.session.run(query, params);
    return result.records.map(record => record.toObject());
  }

  async close() {
    await this.session.close();
    await this.driver.close();
  }
}

  module.exports = Neo4jSession;
