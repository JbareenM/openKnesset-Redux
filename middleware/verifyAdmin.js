const jwt = require('jsonwebtoken');
const user = require("../schema/user");

module.exports = function ( req, res, next) {
 
    const authcookie = req.cookies.cookie;
    try {
        jwt.verify(authcookie, process.env.TOKEN_SECRET, (err, data) => {
          if (err) {
            console.log("err", {ok: false});
            res.send({ok: false});
          }
          else {
            user.findOne({email:data.email}).then(function(userToFind) {
              if((userToFind)&&(userToFind.active) && (userToFind.type === "admin")){
               // req.body.email = data.email;
                next();
                }else{
                  res.send({
                    ok: false,
                    message: "Invalid User"
                  });
                }
            });
      
          }
        })
      }
      catch(e){
        res.send(e);
      }
};