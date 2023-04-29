class User {
  constructor(id, contents, followings, followers) {
    this.id = id;
    this.contents = contents;
    this.followings = followings;
    this.followers = followers;
  }

  getId() {
    return this.id;
  }

  getContents() {
    return this.contents;
  }

  getFollowings() {
    return this.followings;
  }

  getFollowers() {
    return this.followers;
  }

  setId(id) {
    this.id = id;
  }

  setContents() {
    this.contents = this.contents;
  }

  setFollowings() {
    this.followings = this.followings;
  }

  setFollowers() {
    this.followers = this.followers;
  }
}
