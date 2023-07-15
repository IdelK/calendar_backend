const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");


const {
  getEventos,
  crearEvento, 
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");
const { route } = require("./auth");

const router = Router();

//todas las rutas será validadas con el middleware JWT
//cuando se usa router.use cualquier peticion debajo pasa por el middleware
router.use(validarJWT);

//obtener eventos
router.get("/", getEventos);

//crear eventos
router.post(
  "/",
  [
    check("title",  "El titulo es oblogatorio").not().isEmpty(), 
    check("start", "Fecha de inicio es oblogatorio").custom(isDate), 
    check("end", "Fecha de finalizacion es oblogatorio").custom(isDate), 
    validarCampos
  ],
  crearEvento
);

//actualizar eventos
router.put("/:id", actualizarEvento);

//eliminar eventoss
router.delete("/:id", eliminarEvento);

module.exports = router;
