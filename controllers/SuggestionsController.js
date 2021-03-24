const Suggestion = require("../schema/Suggestion");
const nodemailer = require("nodemailer");

exports.getSuggestionsByKnessetMember = async (req, res) => {
  const { email } = req.body;
  try {
    Promise.all([
      Suggestion.find({ "whoIsWorkingOnIt.email": email }),
      Suggestion.find({
        $and: [
          { "whoIsWorkingOnIt.email": null },
          {
            "preferredKnessetMembers.email": { $in: [email] },
          },{
            isSpam: false,
          }
        ],
      }),

      
      Suggestion.find({
        $and: [
          { $or: [{ "whoIsWorkingOnIt.email": null }] },
          {
            isSpam: false,
          },
          {
            $or: [{ "knessetMembersWhoRejected.email": { $nin: [email] } }],
          },
          {
            preferredKnessetMembers: {
              $size: 0,
            },
          },
        ],
      }),
    ])
      .then((results) => {
        //results return an array
        const [
          adoptedSuggestions,
          newSuggestions,
          newGeneralSuggestions,
        ] = results;

        res.send({
          newSuggestions: newSuggestions,
          adoptedSuggestions: adoptedSuggestions,
          newGeneralSuggestions: newGeneralSuggestions,
          ok: true,
        });
      })
      .catch((err) => {
        console.error("Something went wrong", err);
        res.send({
          ok: false,
          message:
            "getting the appropriate suggestion from the DB Failed! try again , " +
            error,
        });
      });
  } catch (error) {
    console.log(error);
    res.send({
      ok: false,
      message:
        "getting the appropriate suggestion from the DB Failed! try again , " +
        error,
    });
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

// add new suggestion
exports.createSuggestions = async (req, res) => {
  let {
    subject,
    description,
    preferredKnessetMembers = [],
    toolType,
    email,
    question,
    governmentOffice,
    files = [],
    firstName = "",
    lastName = "",
  } = req.body;
  try {
    let obj = {};
    let temp = [];
    for (const userDetails of preferredKnessetMembers) {
      obj["email"] = userDetails.email;
      temp.push(obj);
      obj = {};
    }
    preferredKnessetMembers = temp;
    const suggestionToAdd = new Suggestion({
      subject: subject,
      description: description,
      preferredKnessetMembers: preferredKnessetMembers,
      toolType: { title: toolType },
      submittedBy: { email: email, firstName: firstName, lastName: lastName },
      question: question,
      governmentOffice: governmentOffice,
      files: files,
      status: { status: "ממתין לאימוץ" },
      isSpam: false,
    });

    
    suggestionToAdd.save().then(() => {
      console.log("the suggestion has been saved in th DB successfully");
      console.log("created Suggestion", suggestionToAdd);
      res.send({
        ok: true,
        createdSuggestion: req.body,
        message: "the suggestion has been saved in th DB successfully",
      });
    });
  } catch (error) {
    console.log(error);
    res.send({
      ok: false,
      message: "adding the suggestion to the DB Failed! try again" + error,
    });
  }
};

exports.updateSuggestion = async (req, res) => {
  let { newStatus, suggestion, date = new Date() } = req.body;

  let suggestionToUpdate = {
    _id: suggestion,
  };

  const suggestionSubmittedBy = await Suggestion.findOne({ _id: suggestion });
 
  let update = {
    $push: { status: { status: newStatus, date: date } },
  };

  if (newStatus == "done") {
    update["whoIsWorkingOnIt"] = null;
  }
  //TAL: try should come at the start of the function
  try {
    const suggestionKnessetMemberCanSee = await Suggestion.findOneAndUpdate(
      suggestionToUpdate,
      update
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: suggestionSubmittedBy.submittedBy.email,
      subject: "there is an update in your suggestion status",
      text: `link to knesset website: https://open-knesset.herokuapp.com
      `,
    };
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log(err);
        res.send({ ok: false, msg: "Error occurs" });
      } else {
        res.send({
          ok: true,
          message: "the suggestion status has ben updated successfully..",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.send({
      ok: false,
      message: "updating the suggestion status Failed! try again" + error,
    });
  }
};

exports.rejectOrAdoptSuggestion = async (req, res) => {
 
  let { adopt = false, suggestion, email, firstName = "",
    lastName = "" } = req.body;

  const suggestionToUpdate = await Suggestion.findOne({ _id: suggestion });

  
  if (adopt) {

    //TAL: try should come at the start of the function
    try {
      const updatedSuggestion = await Suggestion.findOneAndUpdate(
        { _id: suggestion },
        {
          whoIsWorkingOnIt: { email: email, firstName: firstName,
            lastName: lastName },
          $pull: { preferredKnessetMembers: { email: email } },
          $push: { status: { status: " תאריך אימוץ : " } },
        }
      );

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL,
        to: suggestionToUpdate.submittedBy.email,
        subject: "there is an update in your suggestion status",
        text: `link to knesset website: https://open-knesset.herokuapp.com
        `,
      };
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.log(err);
          res.send({ ok: false, msg: "Error occurs" });
        } else {
          res.send({
            ok: true,
            message: "the suggestion status has ben updated successfully..",
          });
        }
      });
    } catch (error) {
      console.log(error);
      res.send({
        ok: false,
        message: "updating the suggestion status Failed! try again" + error,
      });
    }
  } else {
    try {
      let suggestionToUpdate = await Suggestion.findOne({
        _id: suggestion,
      });
      if (suggestionToUpdate.preferredKnessetMembers.length == 1) {
        suggestionToUpdate.preferredKnessetMembers[0].email == email;
        let updatedSuggestion = await Suggestion.findOneAndUpdate(
          { _id: suggestion },
          {
            $pull: { preferredKnessetMembers: { email: email } },
            $push: {
              knessetMembersWhoRejected: { email: email },
              status: { status: " נדחתה עי חבר כנסת " },
            },
          }
        );
      } else {
        let updatedSuggestion = await Suggestion.findOneAndUpdate(
          { _id: suggestion },
          {
            $pull: { preferredKnessetMembers: { email: email } },
            $push: { knessetMembersWhoRejected: { email: email } },
          }
        );
      }

      res.send({
        ok: true,
        message: "the suggestion status has ben updated successfully..",
        suggestionToUpdate: suggestionToUpdate,
      });
    } catch (error) {
      console.log(error);
      res.send({
        ok: false,
        message: "updating the suggestion status Failed! try again" + error,
      });
    }
  }
};


exports.spamSuggestion = async (req, res) => {
  const { _id, isSpam } = req.body;
  console.log("_id: ", _id, " isSpam: ", isSpam);
    try {
        Suggestion.updateOne({ _id: _id }, { isSpam: isSpam }, function (err, result) {
            if (err) {
                console.log("error status!");
                res.send({ ok: false });
            }
            else {
                console.log("status changed and sent to admin!");
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
