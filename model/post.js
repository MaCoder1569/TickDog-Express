class Post {
  constructor(id, createdOn, modifiedOn, likes, contents) {
    this.id = id;
    this.createdOn = createdOn;
    this.modifiedOn = modifiedOn;
    this.likes = likes;
    this.contents = contents;
  }

  getId() {
    return this.id;
  }

  getCreatedOn() {
    return this.createdOn;
  }

  getModifiedOn() {
    return this.modifiedOn;
  }

  getLikes() {
    return this.likes;
  }

  getContents() {
    return this.contents;
  }

  setId(id) {
    this.id = id;
  }

  setCreatedOn(createdOn) {
    this.createdOn = createdOn;
  }

  setModifiedOn(modifiedOn) {
    this.modifiedOn = modifiedOn;
  }

  setLikes(likes) {
    this.likes = likes;
  }

  setContents(contents) {
    this.contents = contents;
  }
}
