require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const socket = require("socket.io");
const cors = require("cors");
var mqtt = require("mqtt");
var settings = {
  mqttServerUrl: "192.168.100.5",
  port: 1884,
  topic: "ModbusDaTa",
};

const model = require("./models/Mqtt");
const db = require("./config/db");
db.connect();

const app = express();

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const mqttRouter = require("./routes/mqtt");

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT);

// Socket.io server-side
//Setup
const io = require("socket.io")(server, {
  cors: {
    origin: PORT,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
let a = 0;
//Connection
io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("send_sys_state", (data) => {
    console.log(data);
    socket.emit("receive_sys_state", data);
  });
  /// MQTT Power metter
  var clientMQTT = mqtt.connect(
    "mqtt://" + settings.mqttServerUrl + ":" + settings.port
  );
  clientMQTT.on("connect", function () {
    clientMQTT.subscribe(settings.topic);
    //console.log("Subscribed topic " + settings.topic);
  });

  clientMQTT.on("message", function (topic, message) {
    let data = JSON.parse(message);
    a = a + 1;
    if (a == 150) {
      a = 0;
      const simdatatodb = {
        UL1: data.S.UL1 / 10,
        UL2: data.S.UL2 / 10,
        UL3: data.S.UL3 / 10,
        IL1: data.S.IL1,
        IL2: data.S.IL2,
        IL3: data.S.IL3,
        P: data.S.P,
        Q: data.S.Q,
        S: data.S.S,
        PF: data.S.PF / 1000,
        Phi: data.S.Phi,
        F: data.S.F / 100,
      };
      //const simdata = new model.SimData(simdatatodb);
      //console.log(simdatatodb);
      //simdata.save();
      //--------------
      const tstatdatatodb = {
        CM: data.T.CM,
        MO: data.T.MO,
        Tp: data.T.Tp / 10,
        D: data.T.D / 10,
        N: data.T.N / 10,
      };
      //--------------
      //const tstatdata = new model.TSTATData(tstatdatatodb);
      //tstatdata.save();
    }
    // console.log(data)
    //
    // console.log(message);
    let simeas = data.S;
    let temperature = data.T;
    socket.emit("temperature", temperature);
    socket.emit("powermeter", simeas);
  });

  /// temperature
  socket.on("sysMode", (data) => {
    console.log(data);
    //  let sysMode= JSON.stringify(data);

    clientMQTT.publish("R101TSTAT", data);
    setTimeout(() => {
      clientMQTT.publish("NTS", 'D2D');
    }, 1500);
  });

  socket.on("temperatureSet", (data) => {
    console.log(data);
    //  let tem= JSON.stringify(data);

    clientMQTT.publish("R350TSTAT", data);
    setTimeout(() => {
      clientMQTT.publish("NTS", 'D2D');
    }, 1500);
    
  });

  socket.on("lightSet", (data) => {
    console.log(data);
    //  let tem= JSON.stringify(data);
  
    clientMQTT.publish("LIGHT", data);
    setTimeout(() => {
      clientMQTT.publish("NTS", 'D2D');
    }, 1500);
    
  });
  

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});



// const connectDB = async () => {
//   try {
//     await mongoose.connect(
//       `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@login.ezfrs.mongodb.net/mythesis?retryWrites=true&w=majority`,
//       {
//         useCreateIndex: true,
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//       }
//     );

//     console.log("MongoDB connected");
//   } catch (error) {
//     console.log(error.message);
//     process.exit(1);
//   }
// };

// connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/mqtts", mqttRouter);
