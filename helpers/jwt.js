const jwt = require("jsonwebtoken");

const genJWT = (uid, name) => {
  //OJO con el argumento en este metodo y su nominacion cuado se invoca
  //

  return new Promise((resolve, reject) => {
    const payload = {uid, name };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED, //me daba error como si esta funcion no funcionara y era que puse SECRET_JSW_SEED
      { expiresIn: 300 },
      (err, token) => {
        if (err) {
          reject("no se pudo generar el token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = { genJWT };
