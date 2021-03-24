const Tool = require("../schema/Tool");
const future_history = require("../future_history_api");



exports.getAllParliamentaryTools = async (req, res) => {
  try {
    const parliamentaryTools = await Tool.find({});
    res.send({ parliamentaryTools: parliamentaryTools, success: true });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message:
        "getting the parliamentary Tools from the DB Failed! try again" + error,
    });
  }
};

exports.createParliamentaryTool = async (req, res) => {
  let { type, title, subTitle, tkanon, language, redirectTo } = req.body;

  try {
    const toolToAdd = new Tool({
      type: type,
      title: title,
      subTitle: subTitle,
      tkanon: tkanon,
      language: language,
      redirectTo: redirectTo,
    });
    toolToAdd.save().then(() => {
      res.send({
        success: true,
        createdSuggestion: req.body,
        message: "the  parliamentary Tool has been saved in the DB successfully",
      });
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message:
        "adding the parliamentary Tool to the DB Failed! try again" + error,
    });
  }
};
exports.getToolByType = async (req, res) => {
  let future = [];
  let history = [];
  try {
    const { toolType } = req.body;
    const parliamentaryTool = await Tool.findOne({ type: toolType });
    //this code is Temporary**************
    if (parliamentaryTool.type == "כינוס הכנסת") {
      future =
        future_history.future_history.regular_day_suggetion_day_schedule_future;
      history =
        future_history.future_history
          .regular_day_suggetion_day_schedule_history;
    }
    if (parliamentaryTool.type == "נאום בן דקה") {
      future = future_history.future_history.one_minute_speeches_future;
      history = future_history.future_history.one_minute_speeches_history;
    }
    if (parliamentaryTool.type == "שאילתא") {
      future = future_history.future_history.queries_future;
      history = future_history.future_history.queries_history;
    }
    //**************
    res.send({
      parliamentaryTool: parliamentaryTool,
      future: future,
      history: history,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message:
        "getting the parliamentary Tools from the DB Failed! try again" + error,
    });
  }
};
//mooc data for futur and history********
const firstToolFuture = [
  { date: "22.8.19", description: "מענה לשאילתות: שר התחבורה, שר המשפטים" },
];
const firstToolHistory = [
  { date: "17.8.19", description: "מענה לשאילתות: שרת התרבות" },
  { date: "12.8.19", description: "מענה לשאילתות: שר הבריאות" },
  { date: "8.8.19", description: "מענה לשאילתות: שרת האוצר" },
];
const secondToolFuture = [
  { date: "22.8.19", description: "ישיבת המליאה: נאומים בני דקה" },
  { date: "8.8.19", description: "מענה לשאילתות: שרת האוצר" },
];
const secondToolHistory = [
  { date: "17.8.19", description: "ישיבת המליאה: נאומים בני דקה" },
  { date: "12.8.19", description: "ישיבת המליאה: נאומים בני דקה" },
  { date: "8.8.19", description: "ישיבת המליאה: נאומים בני דקה" },
];
const thirdToolFuture = [
  {
    date: "22.8.19",
    description:
      "הצעה לסדר היום בנושא: תקצוב עמותות העוסקות בהנגשת מידע פרלמנטרי",
  },
];
const thirdToolHistory = [
  {
    date: "15.7.19",
    description:
      "הצעה לסדר היום בנושא: הכישלון הלאומי המתמשך בקליטות יהודי אתיופיה",
  },
  {
    date: "10.7.19",
    description:
      "הצעה לסדר היום בנושא: הצורך הדחוף לבחון את המחדליםשיבת המליאה: נאומים בני דקה",
  },
];
