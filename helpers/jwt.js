const jwt = require("jsonwebtoken");

const genJWT = (id, name) => {
  //el servidor de JWT no g

  return new Promise((resolve, reject) => {
    const payload = { id, name };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED, //me daba error como si esta funcion no funcionara y era que puse SECRET_JSW_SEED
      { expiresIn: "2h" },
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
