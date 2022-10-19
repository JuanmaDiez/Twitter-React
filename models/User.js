const { mongoose } = require("../db"); // Aqui desestructuramos mongoose, ya que en el Archivo server.js exportamos mongoose junto con dbInitialSetup, pero aqui solo queremos requerir mongoose, por eso los {}.
const bcrypt = require("bcryptjs"); // Requerimos bcrypt ya que es la libreria que utilizaremos para hashear las contrasenias.
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    avatar: String,
    password: String,
    bio: String,
    tweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }], // Se guarda un array con los Id de los tweets para luego poder acceder con ese Id al contenido, autor, etc de cada tweet.
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true } // Para que se creen en las tablas Created At y Updated At.
);

userSchema.pre("save", async function (next) {
  // Aqui le estamos diciendo al Schema que antes de crear un nuevo usuario, le hashee la contrasenia.
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10); // El "this" seria lo mismo que poner userSchema.

  next();
});

userSchema.pre("insertMany", async function (next, users) {
  // Aqui le estamos diciendo al Schema que cuando un Seeder inyecte muchos usuarios a la vez, que todas las contrasenias sean hasheadas.
  for (let user of users) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  // Funcion que exportaremos y usaremos en el Archivo passport para comparar la contrasenia ingresada con la contrasenia hasheada.
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema); // Aqui insertamos en una constante, el nombre del modelo ("User") y que Schema debe utilizar ("userSchema"), para luego requerirlo e utilizarlo en el archivo passport.

module.exports = User; // Exportamos la constante User que adentro tiene el nombre del modelo a utilizar y que Schema utilizara ese modelo.
