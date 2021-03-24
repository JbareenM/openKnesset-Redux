const rp = require('request-promise');
const future_history = {
    regular_day_suggetion_day_schedule_history:[],
    regular_day_suggetion_day_schedule_future:[],
    one_minute_speeches_history:[],
    one_minute_speeches_future:[],
    queries_history:[],
    queries_future:[]
};


rp('https://ok.moshe742.name/api/regular_day_suggetion_day_schedule/future/?start_date=2020-01-01&end_date=2021-01-01').then(body => {
    JSON.parse(body).forEach(element => { 
        let object = {date:element.date,description:element.subject + " " + element.text};
        future_history.regular_day_suggetion_day_schedule_future.push(object);
      });
}).catch(err => {
    console.log(err);
});

rp('https://ok.moshe742.name/api/urgent_day_suggetion_day_schedule/history/?start_date=2020-01-01&end_date=2021-01-01').then(body => {
    JSON.parse(body).forEach(element => { 
        let object = {date:element.date,description:element.subject + " " + element.text};
        future_history.regular_day_suggetion_day_schedule_history.push(object);
      });
}).catch(err => {
    console.log(err);
});

rp('https://ok.moshe742.name/api/one_minute_speeches/future/?start_date=2020-01-01&end_date=2021-01-01').then(body => {
    JSON.parse(body).forEach(element => { 
        let object = {date:element.date,description:element.subject + " " + element.text};
        future_history.one_minute_speeches_future.push(object);
      });
}).catch(err => {
    console.log(err);
});

rp('https://ok.moshe742.name/api/one_minute_speeches/history/?start_date=2020-01-01&end_date=2021-01-01').then(body => {
    JSON.parse(body).forEach(element => { 
        let object = {date:element.date,description:element.subject + " " + element.text};
        future_history.one_minute_speeches_history.push(object);
      });
}).catch(err => {
    console.log(err);
});

rp('https://ok.moshe742.name/api/queries/history/?start_date=2020-01-01&end_date=2021-01-01').then(body => {
    JSON.parse(body).forEach(element => { 
        let object = {date:element.date,description:element.subject + " " + element.text};
        future_history.queries_history.push(object);
      });
}).catch(err => {
    console.log(err);
});

rp('https://ok.moshe742.name/api/queries/future/?start_date=2020-01-01&end_date=2021-01-01').then(body => {
    JSON.parse(body).forEach(element => { 
        let object = {date:element.date,description:element.subject + " " + element.text};
        future_history.queries_future.push(object);
      });
}).catch(err => {
    console.log(err);
});


module.exports.future_history = future_history;

