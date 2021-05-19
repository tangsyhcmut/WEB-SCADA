const model = require('./app/models/Test1');
//const db = require('./config/db');
const mongoose = require('mongoose')
//db.connect();

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://phucsy:123@login.ezfrs.mongodb.net/mythesis?retryWrites=true&w=majority`,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }
        )

        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
connectDB()

var mqtt = require('mqtt')
var settings = {
  mqttServerUrl: "192.168.100.1",
  port: 1884,
  topic: "ModbusDaTa"
}

var clientMQTT = mqtt.connect('mqtt://' + settings.mqttServerUrl + ":" + settings.port);

clientMQTT.on('connect', function () {
  clientMQTT.subscribe(settings.topic)
  console.log("Subscribed topic " + settings.topic);
})

let a = 0;
clientMQTT.on('message', function (topic, message) {
  a = a + 1;
  if (a == 35) {
    a = 0;
    const dataRaw = JSON.parse(message);
    const simdatatodb = {
      UL1: dataRaw.S.UL1 / 10,
      UL2: dataRaw.S.UL2 / 10,
      UL3: dataRaw.S.UL3 / 10,
      IL1: dataRaw.S.IL1,
      IL2: dataRaw.S.IL2,
      IL3: dataRaw.S.IL3,
      P: dataRaw.S.P,
      Q: dataRaw.S.Q,
      S: dataRaw.S.S,
      PF: dataRaw.S.PF / 1000,
      Phi: dataRaw.S.Phi,
      F: dataRaw.S.F / 100
    }
    const simdata = new model.SimData(simdatatodb)
    simdata.save();
    //--------------
    const tstatdatatodb = {
      CM: dataRaw.T.CM,
      MO: dataRaw.T.MO,
      Tp: dataRaw.T.Tp/10,
      D: dataRaw.T.D/10,
      N: dataRaw.T.N/10,
    }
    //--------------
    const tstatdata = new model.TSTATData(tstatdatatodb)
    tstatdata.save();
  }
  //const formDate = JSON.parse(message);
})


// const data = new Data(PS);
// data.save();
