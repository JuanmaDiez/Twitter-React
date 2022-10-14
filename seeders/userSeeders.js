const { faker } = require("@faker-js/faker");
const User = require("../models/User");

faker.locale = "es";

module.exports = async () => {
  const users = [];
  users.push({
    firstname: "Leia",
    lastname: "Organa",
    username: "lorgana",
    email: "lorgana@starwars.com",
    avatar: "",
    password: "123456",
    bio: "Hola soy Lea",
  });

  for (let i = 0; i < 20; i++) {
    users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.internet.avatar(),
      password: "1234",
      bio: faker.lorem.paragraph(),
    });
  }
};
