const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const Tweet = require("../models/Tweet");
const User = require("../models/User");
const _ = require("lodash");

module.exports = async () => {
  // await mongoose.connection.db.dropCollection("tweets", function (err, result) {
  //   console.log("Collection droped");
  // });
  await mongoose.connection.dropCollection("tweets");

  const tweets = []; // creao array vacio para poner los tweets que va creando el seeder
  for (let i = 0; i < 20; i++) {
    //aca va a recorrer el codigo de la linea de abajo para crear 20 tweets
    const newTweet = new Tweet({
      // creamos una nueva instancia del nuevo tweet, y le pasamos los parametros que queremos para crearlo
      content: faker.lorem.paragraph(),
      author: {}, // se podrian eliminar ya que despues se pueden asiganar
      likes: [], // se podrian eliminar ya que despues se pueden asiganar
    });
    tweets.push(newTweet); // agregamos los twwits a la coleccion de tweets que habiamos creado
  }

  const users = await User.find(); // llenamos uns lista con todo los usarios que estan en la base de datos en la tabla Usuarios (es lo que hace el User.find())

  for (const tweet of tweets) {
    // recorremos la lista de tweets
    const randomUser = _.sample(users); //usamos lodash (_.sample) para seleccionar un usuario al azar de la tabla usuarios
    tweet.author = randomUser; // aca por cada tweet de la lista tweets le asignamos el usuario random como autor
    await User.findByIdAndUpdate(randomUser.id, {
      // aca lo que hacemos es ir a la tabla User y buscar por id y actualizar, usando el id del usuario random y el metodo $push para agregarle al usuario el tweet a su coleccion de tweets, osea aca le deciamos al autor este es un tweet tuyo.
      $push: { tweets: tweet.id },
    });
  }
  for (const tweet of tweets) {
    const randomNumber = _.random(1, 7); //Pedimos un número random
    const likeUsers = _.sampleSize(users, randomNumber); //Armamos un nuevo array con usuarios de users, y con tamaño el numero random anterior
    for (likeUser of likeUsers) {
      // iteramos ese nuevo array
      tweet.likes.push(likeUser); //agregamos al array de likes perteneciente a cada tweet cada uno de los usuarios de ese nuevo array
    }
  }

  await Tweet.insertMany(tweets); // le decimos al modelo Tweet que inserte en la tabla tweets de la base de datos, todos los tweets del array tweets creado anteriormente Recien aca se crea el tweet en la base de datos
};
