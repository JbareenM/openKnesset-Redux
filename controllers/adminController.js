const user = require("../schema/user");
const _token = require('../schema/token');
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const Suggestion = require("../schema/Suggestion");

exports.getMemberByEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const userToFind = await user.find({ email: email });
        res.send({ ok: true, users: userToFind });
    } catch (error) {
        console.log("getting data from DB Failed! try again");
        res.send({
            ok: false,
            message:
                "getting data from DB Failed! try again" + error,
        });
    }
};

exports.getMemberByFirstLastName = async (req, res) => {
    const { firstName = "", lastName = "" } = req.body;
    try {
        let userToFind;
        if (firstName && lastName) {
            userToFind = await user.find({ $and: [{ firstName: firstName }, { lastName: lastName }] });
        }
        else {
            userToFind = await user.find({ $or: [{ firstName: firstName }, { lastName: lastName }] });
        }
        res.send({ ok: true, users: userToFind });
    } catch (error) {
        console.log("getting data from DB Failed! try again");
        res.send({
            ok: false,
            message:
                "getting data from DB Failed! try again" + error,
        });
    }
};

exports.getAllMembers = async (req, res) => {
    try {
        const userToFind = await user.find({});
        res.send({ ok: true, users: userToFind });
    } catch (error) {
        res.send({
            ok: false,
            message:
                "getting the parliamentary Tools from the DB Failed! try again" + error,
        });
    }
};



exports.getBlockedMembers = async (req, res) => {
    try {
        const userToFind = await user.find({ active: false });
        res.send({ ok: true, users: userToFind });
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message:
                "getting the parliamentary Tools from the DB Failed! try again" + error,
        });
    }
};



exports.getActiveMembers = async (req, res) => {
    try {
        const userToFind = await user.find({ active: true });
        res.send({ ok: true, users: userToFind });
    } catch (error) {
        res.send({
            ok: false,
            message:
                "getting the parliamentary Tools from the DB Failed! try again" + error,
        });
    }
};



exports.changeStatus = async (req, res) => {
    const { _email, active = false } = req.body;
    try {
        user.updateOne({ email: _email }, { active: active }, function (err, result) {
            if (err) {
                console.log("error status!");
                res.send({ ok: false });
            }
            else {
                console.log("status changed!");
                res.send({ ok: true, msg: "status changed!" });
            }
        });
    } catch (error) {
        res.send({
            ok: false,
            message:
                "getting the parliamentary Tools from the DB Failed! try again" + error,
        });
    }
};




exports.checkSpam = async (req, res) => {
    // const { email, active } = req.body;
    try {
        const suggestionToFind = await Suggestion.find({ isSpam: true });
        res.send({ ok: true, isSpam: suggestionToFind });//[0].status[0].isSpam 
    } catch (error) {
        res.send({
            ok: false,
            message:
                "getting the parliamentary Tools from the DB Failed! try again" + error,
        });
    }
};



exports.allSuggestions = async (req, res) => {
    // const { email, active } = req.body;
    try {
        const suggestionToFind = await Suggestion.find({});
        res.send({ ok: true, isSpam: suggestionToFind });//[0].status[0].isSpam 
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message:
                "getting the parliamentary Tools from the DB Failed! try again" + error,
        });
    }
};



exports.notSpam = async (req, res) => {
    // const { email, active } = req.body;
    try {
        const suggestionToFind = await Suggestion.find({ isSpam: false });
        res.send({ ok: true, isSpam: suggestionToFind });//[0].status[0].isSpam 
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message:
                "getting the parliamentary Tools from the DB Failed! try again" + error,
        });
    }
};



exports.changeSpam = async (req, res) => {
    const { _id, isSpam } = req.body;
    try {
        Suggestion.updateOne({ _id: _id }, { isSpam: isSpam }, function (err, result) {
            if (err) {
                console.log("error status!");
                res.send({ ok: false });
            }
            else {
                console.log("status changed!");
                res.send({ ok: true });
            }
        });
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message:
                "getting the parliamentary Tools from the DB Failed! try again" + error,
        });
    }
};




exports.addMember = async (req, res) => {
 

    const {
        firstName,
        lastName,
        email,
        company,
        phone,
        type = "knessetMember",
        active,
        language,
    } = req.body;
    console.log({
        firstName: firstName,
        lastName: lastName,
        email: email,
        company: company,
        phone: phone,
        type: type,
        active: active,
        language: language,
    })
    const searchUser = await user.findOne({ email });


    const randomPassword = Math.random().toString(36).slice(-8);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(randomPassword, salt);

    if (searchUser === null) {
        const userToAdd = new user({
            firstName: firstName,
            lastName: lastName,
            email: email,
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
            { email: email, date: _date },
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
                res.send({ ok: true, message: `email sent sucessfuly` });
            }
        });
    } else {
        res.send({ ok: false, message: "The User Is Already Exist" });
    }
};

exports.getSuggestionsByUserSuggest = async (req, res) => {
    const { email } = req.body;
    try {
        Promise.all([
            Suggestion.find({
                $and: [
                    { "whoIsWorkingOnIt.email": null },
                    {
                        "status.status": { $ne: "done" },
                    },
                    {
                        "submittedBy.email": email,
                    },
                ],
            }),
            Suggestion.find({
                $and: [
                    { "whoIsWorkingOnIt.email": { $ne: null } },
                    {
                        "status.status": { $ne: "done" },
                    },
                    {
                        "submittedBy.email": email,
                    },
                ],
            }),
            Suggestion.find({
                $and: [
                    {
                        "status.status": "done",
                    },
                    {
                        "submittedBy.email": email,
                    },
                ],
            }),
        ])
            .then((results) => {
                //results return an array
                const [
                    waitingSuggestions,
                    adoptedSuggestions,
                    closedSuggestions,
                ] = results;
                let allSuggestions = waitingSuggestions
                    .concat(adoptedSuggestions)
                    .concat(closedSuggestions);

                res.send({
                    waitingSuggestions: waitingSuggestions,
                    adoptedSuggestions: adoptedSuggestions,
                    closedSuggestions: closedSuggestions,
                    suggestions: allSuggestions,
                    ok: true,
                });
            })
            .catch((err) => {
                console.error("Something went wrong", err);
                res.send({
                    ok: false,
                    message:
                        "getting the appropriate user suggestion from the DB Failed! try again , " +
                        error,
                });
            });
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message:
                "getting the appropriate user suggestion from the DB Failed! try again , " +
                error,
        });
    }
};