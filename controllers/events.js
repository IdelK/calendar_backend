const { response } = require("express");
const Evento = require("../models/Evento");

//GET EVENTOS
const getEventos = (req, res = response) => {
  res.json({
    ok: true,
    msg: "getEventos",
  }); 
};

//CREAR EVENTOS
const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);

  try { 
    //si a evento.user le asingo req.uid me captura  el catch por undifine
    evento.user = evento.id;   
    console.log(" el evento es : " , evento.id," ", evento.user);  
    const eventoGuardado = await evento.save();
 
    res.json({ 
      ok: true, 
      evento: eventoGuardado,
    });
  } catch (error) {
    console.error("error"); 
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
  
};

//ACTUALIZAR EVENTOS
const actualizarEvento = (req, res = response) => {
  res.json({
    ok: true,
    msg: "actualizarEvento",
  });
};

//ELIMINAR EVENTOS
const eliminarEvento = (req, res = response) => {
  res.json({
    ok: true,
    msg: "eliminarEvento",
  });
};

module.exports = { getEventos, crearEvento, actualizarEvento, eliminarEvento };
