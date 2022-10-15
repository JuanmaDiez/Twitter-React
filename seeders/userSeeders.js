const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const _ = require("lodash");
const { mongoose } = require("../db");

faker.locale = "es";

module.exports = async () => {
  /*  mongooseconnection.connection.db.dropCollection(
    "users",
    function(err, result) {
        console.log("Collection droped");
    }
); */
  await mongoose.connection.dropCollection("users");
  const users = [];
  const newUser = new User({
    firstname: "Leia",
    lastname: "Organa",
    username: "lorgana",
    email: "lorgana@starwars.com",
    avatar: "",
    password: "123456",
    bio: "Hola soy Lea",
  });
  users.push(newUser);

  for (let i = 0; i < 20; i++) {
    const newUser = new User({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.internet.avatar(),
      password: "1234",
      bio: faker.lorem.paragraph(),
    });
    users.push(newUser);
  }

  for (const user of users) {
    // Aqui utilizaremos lodash (informacion en internet)
    const randomNumber = _.random(1, 5); // Aqui seleccionamos un numero random del 1 al 5
    const randomUsers = _.chain(users) // Lo usamos para concatenar varias funciones de lodash que tiene como valor incial el Array de Users
      .without(user) // Que el user no este incluido en el array al momento de hacer la funcion. Para que un usuario no pueda seguirse a si mismo
      .sampleSize(randomNumber) // Elige objetos random dentro del Array y la cantidad es el numero random que hicimos arriba
      .value(); // Se utiliza para ejecutar la funcion

    // Nos quedo un array en randomUsers en el cual no esta user y tiene un numero random de objetos, todos pertenecientes al Array de users

    for (const randomUser of randomUsers) {
      // Realizamos otro for con el nuevo Array
      user.following.push(randomUser); // Le decimos que pushee al randomUser dentro del user.following
      randomUser.followers.push(user); // A su vez le decimos que al randomUser.followers se le pushee ese usuario que recien insertamos en el following
    }
  }
  await User.insertMany(users);
};
