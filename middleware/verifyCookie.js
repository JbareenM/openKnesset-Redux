const jwt = require('jsonwebtoken');
const user = require("../schema/user");

//TAL: the file should be called verifyUser, because this is what this middlware does


module.exports = function ( req, res, next) {
 
    const authcookie = req.cookies.cookie;
 
    //TAL: please make it async function
    try {
        jwt.verify(authcookie, process.env.TOKEN_SECRET, (err, data) => {
          if (err) {
            console.log(err);
            res.send(err);
          }
          else {
            user.findOne({email:data.email}).then(function(userToFind) {
              if((userToFind)&&(userToFind.active)){
                console.log(data.email);
                req.body.email = data.email;
                req.body.firstName = data.firstName;
                req.body.lastName = data.lastName;
                //TAL: shouldnt you have also the user role?
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