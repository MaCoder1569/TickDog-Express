const Neo4jSession = require('../db/db')
const neo4jSession = new Neo4jSession();

class CommonAPI {
    constructor() {}

    async setQuery(query){
        return await neo4jSession.run(query);
    }

}

module.exports = CommonAPI

