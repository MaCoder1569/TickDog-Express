class Pet {
  constructor(id, createdOn, modifiedOn, name,birthday,gender,breed,weight,contents,followers) {
    this.id = id;
    this.createdOn = createdOn;
    this.modifiedOn = modifiedOn;
    this.name = name;
    this.birthday = birthday;
    this.gender = gender;
    this.breed = breed;
    this.weight = weight;
    this.contents = contents;
    this.followers = followers;
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

  getName() {
    return this.name;
  }

  getBirthday() {
    return this.birthday;
  }
  getGender() {
    return this.gender;
  }

  getBreed() {
    return this.breed;
  }
  getWeight() {
    return this.weight;
  }

  getContents() {
    return this.contents;
  }
  getFollowers() {
    return this.followers;
  }

  setId(id) {
    this.id = id;
  }

  setName(name) {
    this.name =name;
  }

  setBirthday(birthday) {
    this.birthday;=birthday
  }
  setGender(gender) {
    this.gender=gender;
  }

  setBreed(breed) {
    this.breed=breed;
  }
  setWeight(weight) {
    this.weight=weight;
  }

  setContents(contents) {
    this.contents=contents;
  }
  setFollowers(followers) {
    this.followers=followers;
  }
}
