const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email })  ;

    if (usuario)
     {
      return res.status(400).json({
        ok: false,
        msg: "un usario ya existe con ese correo ",
      });
     } 
    else
    {
      usuario = new Usuario(req.body);

      //encryptar password
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(toString(password), salt);

      await usuario.save();

      res.status(201).json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        password: usuario.password,
      });
    }
   } 
   catch (error) {
    res.status(500).json({
      ok: false,
      msg: "vaya con el administrador",
    });
  }
};





const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

 

  res.status(201).json({
    ok: true,
    msg: "login",
    email,
    password,
  });
};


const revalidarToken = (req, res = response) => {
  const { email, password } = req.body;
  res.status(201).json({
    ok: true,
    msg: "token",
  });
};

module.exports = { crearUsuario, loginUsuario, revalidarToken };
