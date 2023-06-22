const { response } = require("express");
const { genJWT } = require("../helpers/jwt");

const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

//CREAR USUARIO
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
      const token = await genJWT(usuario.id, usuario.name);
      console.log(token);

      res.status(201).json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        password: usuario.password,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "vaya con el administrador",
    });
  }
};

//LOGIN
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
    const validPassword = bcrypt.compare(toString(password), usuario.password);
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
    console.log(token);

    res.json({
      ok: true,
      uid: usuario.uid,
      name: usuario.name,
      token,
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
