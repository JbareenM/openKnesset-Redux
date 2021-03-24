const jwt = require('jsonwebtoken');
const user = require("../schema/user");

module.exports = function ( req, res, next) {
 
    const authcookie = req.cookies.cookie;
    console.log(req.cookies);
    try {
        jwt.verify(authcookie, process.env.TOKEN_SECRET, (err, data) => {
          if (err) {
            console.log(err);
            res.send(err);
          }
          else {
             
             const {role} = data;
             if(role === "knessetMember"){
               next();
              
             }else{
               res.send({ok:false,message:"user is not member knesset"});
             }
          }
        })
      }
      catch(e){
        res.send(e);
      }
};