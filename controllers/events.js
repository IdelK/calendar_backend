const { response } = require("express");
const Evento = require("../models/Evento");

//GET EVENTOS
const getEventos = async (req, res = response) => {
  const eventos = await Evento.find();
  res.json({
    ok: true,
    eventos,
  });
};

//CREAR EVENTOS
const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);

  try {
    //si a evento.user le asingo req.uid me captura  el catch por undifine
    evento.user = evento.id;
  //  console.log(" el evento es : ", evento.id, " ", evento.user);
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
const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;//ld que viene por el URL 
 
    try {
    const evento = await Evento.findById(eventoId);
 
    if (!evento) {
      return res.status(404).json({
          ok: false,
          msg: "Evento no existe por ese id",
        });
    }
    if (evento.user.toString() !== eventoId){
      return res.status(401).json({
        ok:false,
        msg: "No tiene privilegio de editar este evento"
      });
     } 

     const nuevoEvento = {...req.body, user:eventoId};
     const eventoActualizado = await Evento.findByIdAndUpdate(eventoId,nuevoEvento,{new:true});
     
    res.json({ 
      ok: true,
      evento: eventoActualizado
    });

  } catch (error) {
    console.error("error");
    res.status(500).json({ 
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

//ELIMINAR EVENTOS
const eliminarEvento = async(req, res = response) => {
  const eventoId = req.params.id;//ld que viene por el URL 
 
  try {
  const evento = await Evento.findById(eventoId);

  if (!evento) {
    return res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese id",
      });
  }
  if (evento.user.toString() !== eventoId){
    return res.status(401).json({
      ok:false,
      msg: "No tiene privilegio de eliminar este evento"
    });
   } 

  await Evento.findByIdAndDelete(eventoId);

  res.json({ 
    ok: true
  });

} catch (error) {
  console.error("error");
  res.status(500).json({ 
    ok: false,
    msg: "hable con el administrador",
  });
}

};

module.exports = { getEventos, crearEvento, actualizarEvento, eliminarEvento };
