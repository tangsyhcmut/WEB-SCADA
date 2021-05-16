require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const socket = require("socket.io");
const cors = require('cors')
var mqtt = require('mqtt')
var settings = {
    mqttServerUrl :"192.168.100.5", 
    port : 1884,
    topic :"ModbusDaTa"
    }


const app = express()

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')

const PORT = process.env.PORT || 5000
const server =app.listen(PORT)

// Socket.io server-side
//Setup
const io = require("socket.io")(server, {
	cors: {
	  origin: PORT,
	  methods: ["GET", "POST"],
	  allowedHeaders: ["my-custom-header"],
	  credentials: true
	}
  });


//Connection
io.on("connection", (socket) => {
  console.log(socket.id);

   socket.on("send_sys_state",(data)=>{
	   console.log(data);
	   socket.emit("receive_sys_state",data)
   })
   /// MQTT Power metter
   var clientMQTT  = mqtt.connect('mqtt://' + settings.mqttServerUrl + ":" + settings.port);
   clientMQTT.on('connect', function () {
       clientMQTT.subscribe(settings.topic)
       console.log("Subscribed topic " + settings.topic);
   })
   
   
   clientMQTT.on('message',function (topic, message){
       
      let data = JSON.parse(message);
      // console.log(data)
      // 
      // console.log(message);
      let simeas = data.S;
      let temperature = data.T;
      socket.emit('temperature',temperature);
      socket.emit('powermeter',simeas);
   })
 
  /// temperature
   socket.on('sysMode',data=>{
     console.log(data);
    //  let sysMode= JSON.stringify(data);
    
     clientMQTT.publish('R101TSTAT',data);
   })


   socket.on('temperatureSet',data=>{
     console.log(data);
    //  let tem= JSON.stringify(data);
    
    clientMQTT.publish('R345TSTAT',data);
   })




  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});






const connectDB = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@login.ezfrs.mongodb.net/mythesis?retryWrites=true&w=majority`,
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

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
