const jwt =require('jsonwebtoken'); 

const genJWT=(uid , name)=>{
    //el servidor de JWT no g

    return new Promise((resolve,reject) => {
        const payload = {uid,name};
        jwt.sign(
            payload,
            process.env.SECRET_JSW_SEED,
            {expiresIn: '2h'},
            (err,token)=>{
                            if(err){reject("no se pudo generar el token");}
                            resolve(token);
                          }  )


            })
        }






module.exports = {genJWT};