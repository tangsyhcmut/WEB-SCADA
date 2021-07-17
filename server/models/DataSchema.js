const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let now = new Date();
function formatted_date()
{
   var result="";
   var d = new Date();
   var e = d.getHours()
   
   result += d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()+ 
             " "+ e +":"+d.getMinutes()
   return result;
}

const TestData = new Schema({
    PS1: { type: Number, require: true},
    PS2: { type: Number, require: true},
    PS3: { type: Number, require: true},
    dateCreated :{type:String,
        default:formatted_date(now)}
});

const AlarmData = new Schema({
    type: { type: String, require: true},
    warnMsg:{ type: String, require: true},
    warnTime:{type:String,
        default:formatted_date(now)}
});

module.exports.TestData = mongoose.model('PS1_Report', TestData);
module.exports.AlarmData = mongoose.model('Alarm_Report', AlarmData);