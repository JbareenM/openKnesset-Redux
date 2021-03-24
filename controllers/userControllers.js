const user = require("../schema/user");
const _token = require('../schema/token');
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

exports.Login = async (req, res) => {
  //TAL: use try-catch

  const { email, password } = req.body;

  console.log("Login");

  const userToFind = await user.findOne({ email });

  if ((userToFind === null)||(!userToFind.active)){
    res.send({ ok: false, message: "Login Failed" });
  } else {


    const vaildPass = await bcrypt.compare(password, userToFind.password);
    if (vaildPass) {
      const token = jwt.sign(
        { role: userToFind.type, email: userToFind.email, firstName: userToFind.firstName, lastName: userToFind.lastName },
        process.env.TOKEN_SECRET
      );
      res.cookie("cookie", token, { maxAge: 900000, httpOnly: true });
      res.send({
        role: userToFind.type,
        email: userToFind.email, firstName: userToFind.firstName, lastName: userToFind.lastName,
        ok: true,
        message: "The User Is Logged In",
      });
    } else {
      res.send({ ok: false, message: "Login Failed" });
    }
  }
};

exports.Registration = async (req, res) => {
  //TAL: use try-catch
  console.log("Registration");

  const {
    firstName,
    lastName,
    email,
    company,
    phone,
    type="citizen",
    active,
    language,
  } = req.body;

  const searchUser = await user.findOne({ email });

  const randomPassword = Math.random().toString(36).slice(-8);
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(randomPassword, salt);

  if (searchUser === null) {
    const userToAdd = new user({
      firstName: firstName,
      lastName: lastName,
      email: email.toLowerCase(),
      password: hashPassword,
      company: company,
      phone: phone,
      type: type,
      active: active,
      language: language,
    });
    userToAdd.save().then(() => {
      console.log("user saved");
    });

    const _date = new Date();
    const token = jwt.sign(
      { email: email.toLowerCase(), date: _date },
      process.env.TOKEN_SECRET
    );

    const tokenToAdd = new _token({
      email: email,
      token: token,
      status: true,
    });
    tokenToAdd.save().then(() => {
      console.log("token saved");
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "welcome to knesset website",
      text: `your current password is: ${randomPassword} \n link to change your password: https://open-knesset.herokuapp.com/resetPassword?token=${token}
      `,
    };
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log(err);
        res.send({ ok: false, msg: "Error occurs" });
      } else {
        res.send({ok: true, message: `email sent sucessfuly`});
      }
    });
  } else {
    res.send({ ok: false, message: "The User Is Already Exist" });
  }
};

exports.ForgetPassword = async (req, res) => {
 //TAL: use try-catch

  
  const { to } = req.body;

  const userToCheck = await user.findOne({ email: to });

  if (!(userToCheck === null)&&(userToCheck.active)) {
    const token = jwt.sign(
      { email: userToCheck.email, date: new Date() },
      process.env.TOKEN_SECRET
    );

    const tokenToAdd = new _token({
      email: userToCheck.email,
      token: token,
      status: true,
    });
    tokenToAdd.save().then(() => {
      console.log("token saved");
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: to,
      subject: "reset your password",
      text: `link to change your password: https://open-knesset.herokuapp.com/resetPassword?token=${token}
      `,
    };
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log(err);
        res.send("Error occurs");
      } else {
        res.send(`email sent to ${to} sucessfuly`);
      }
    });
  } else {
    res.send({ ok: false, message: "Invalid Email " });
  }
};

exports.SavePassword = async (req, res) => {
   //TAL: use try-catch
  const { password } = req.body;
  const { token } = req.query;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const searchToken = await _token.findOne({ token });
  if (searchToken === null) {
    res.send({ ok: false, message: "change password Failed" });
  }
  else if (searchToken.status) {

    //TAL: put try at the top

    try {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
        if (err) {
          console.log(err);
          res.send({ ok: false });
        }
        else {
          const timeOver = (new Date() - new Date(data.date)) / 60000.;
          console.log(`time: ${timeOver} minutes`);
          if (timeOver < 10) {
            user.updateOne(
              { email: data.email },
              { password: hashPassword },
              function (err, result) {
                if (err) {
                  res.send(err);
                } else {
                  _token.updateOne({ token: token }, { status: false }, function (err, result) { if (err) { console.log("error token!"); } else { console.log("token status changed!") } });
                  res.send({ ok: true, msg: `password changed sucessfuly for ${data.email} ` });
                }
              }
            );
          }
          else {
            res.send({ ok: false, msg: `password cannot be changed due to time over!` });
          }
        }
      })
    }
    catch (e) {
      res.send({ ok: false, msg: "error!" });
    }
  }
  else {
    res.send({ ok: false, msg: "password already changed!" });
  }
};

exports.GetUsersByType = async (req, res) => {

  //TAL: use try-catch
  console.log("GetUsersByType");

  const { type } = req.body;

  const userToFind = await user.find({ type });
  res.send({ users: userToFind });
};

exports.DeleteCookie = async (req, res) => {
  console.log("DeleteCookie");

  res.clearCookie("cookie");
  res.send({ ok: true });
};

exports.CheckConnection = async (req, res) => {
//TAL: use try-catch from start
  const flag = req.cookies.cookie !== undefined;
  if (flag) {
    try {
      jwt.verify(req.cookies.cookie, process.env.TOKEN_SECRET, (err, data) => {
        if (err) {
          console.log(err);
        }
        else {
          res.send({ ok: true, cookie: flag, type: data.role, firstName: data.firstName, lastName: data.lastName, email: data.email });
        }
      })
    } catch (error) {
      res.send({ ok: false, cookie: flag });
    }
  }
  else {
    res.send({ ok: false, cookie: flag });
  }
};


exports.getAllKnessetMembers = async (req, res) => {
  //TAL: use try-catch

  const users = user.find({ type: "knessetMember" }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
  console.log(users);
  res.send({ ok: true, users: users });
};
