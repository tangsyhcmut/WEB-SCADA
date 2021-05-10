require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const socket = require("socket.io");
const cors = require('cors')



const app = express()

const authRouter = require('./routes/auth')
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

  
  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});






const connectDB = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@login.rr5zz.mongodb.net/test?retryWrites=true&w=majority`,
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










