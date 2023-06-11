const { Router } = require("express");
const router = Router();
const {crearUsuario} = require("../controllers/auth");


router.get("/", (req, res) => {
  res.json({
    ok: true,
  });
});


router.get("/new", crearUsuario);


router.get("/", (req, res) => {
  res.json({
    ok: true,
  });
});


router.get("/", (req, res) => {
  res.json({
    ok: true,
  });
});

module.exports = router;
