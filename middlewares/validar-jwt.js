const { response } = require("express");

export const validarJWT = (req,res=response,next) => {
  return (
    <div>validar-jwt</div>
  )
}


module.exports = {validarJWT}