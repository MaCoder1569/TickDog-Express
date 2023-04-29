const session = require('../config/neo4j');

class UserService {
  constructor() {}

  async register(id) {
    const query = `
      CREATE (User:User {id: $id, content: '', followings:0, followers:0})
      RETURN User
    `;
    try {
      await session.writeTransaction(async (tx) => {
        await tx.run(query, { id });
      });
    } catch (error) {
      //TODO 에러처리
      console.log(error);
      throw error;
    }
  }

  async get(id) {
    const query = `
      MATCH (User:User {id: $id})
      RETURN User
    `;
    try {
      const result = await session.run(query, { id });
      return result.records;
    } catch (error) {
      //TODO 에러처리
      console.log(error);
      throw error;
    }
  }

  async updateContent(id, content) {
    const query = `
      MATCH (User:User {id: $id})
      SET User.content = $content
    `;
    try {
      await session.run(query, { id, content });
    } catch (error) {
      //TODO 에러처리
      console.log(error);
      throw error;
    }
  }

  async updateFollowings(id, num) {
    const query = `
      MATCH (User:User {id: $id})
      SET User.followings = User.followings + $num
    `;
    try {
      await session.run(query, { id, num });
    } catch (error) {
      //TODO 에러처리
      console.log(error);
      throw error;
    }
  }

  async updateFollowers(id, num) {
    const query = `
      MATCH (User:User {id: $id})
      SET User.followers = User.followers + $num
    `;
    try {
      await session.run(query, { id, num });
    } catch (error) {
      //TODO 에러처리
      console.log(error);
      throw error;
    }
  }

  async delete(id) {
    const query = `
      MATCH (user:User {id: $id})
      detach delete user
    `;
    try {
      await session.run(query, { id });
    } catch (error) {
      //TODO 에러처리
      console.log(error);
      throw error;
    }
  }
}

module.exports = UserService;
