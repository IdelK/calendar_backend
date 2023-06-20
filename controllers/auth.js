const { response } = require("express");
const { genJWT } = require("../helpers/jwt");

const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "un usario ya existe con ese correo ",
      });
    } else {
      usuario = new Usuario(req.body);

      //encryptar password
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(toString(password), salt);

      await usuario.save();

      //generar JWT
     const token = await genJWT(toString(usuario.id),toString(usuario.name));

      res.status(201).json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        password: usuario.password,
       // token,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "vaya con el administrador",
    });
  }
};

//**********login***** */
const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email: email });

    if (!usuario) {
      return (
        res.status(400),
        json({
          ok: false,
          msg: "el usuario no existe con ese email",
        })
      );
    }

    //confirmar los passwords
    const validPassword = bcrypt.compare(password, usuario.password);
    if (!validPassword) {
      return (
        res.status(400),
        json({
          ok: false,
          msg: "password incorrecto",
        })
      );
    }

    //generar JWT
    const token = await genJWT(usuario.id, usuario.name);

    res.json({
      ok: true,
      uid: usuario.uid,
      name: usuario.name,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "vaya con el administrador",
    });
  }
};




const revalidarToken = (req, res = response) => {
  const { email, password } = req.body;
  res.status(201).json({
    ok: true,
    msg: "token",
  });
};

module.exports = { crearUsuario, loginUsuario, revalidarToken };
