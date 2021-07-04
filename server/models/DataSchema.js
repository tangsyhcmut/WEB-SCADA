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
    value: { type: Number, require: true},

    dateCreated :{type:String,
        default:formatted_date(now)}
});

module.exports = mongoose.model('PS1_Report', TestData);