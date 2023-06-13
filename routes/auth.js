const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/",
  [
    check("email", "obligatorio").isEmail(),
    check("password", "obligatorio 6 carateres").isLength({ min: 6 }),
    validarCampos,
  ],
  loginUsuario
);

router.post(
  "/new",
  [
    check("name", "obligatorio").not().isEmpty(),
    check("email", "obligatorio").isEmail(),
    check("password", "obligatorio 6 carateres").isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario
);

router.get("/renew", revalidarToken);

module.exports = router;
