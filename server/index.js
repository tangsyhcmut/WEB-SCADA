require("dotenv").config();
const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");
const chalk = require("chalk");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const mqttRouter = require("./routes/mqtt");
const nodemailer = require("nodemailer");
// Connect Port

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT);
// Connect MongoDB
const db = require("./config/db");
db.connect();
////////////////////////////////OPC UA
////////////////////////////////////////////////////////////////
const {
  AttributeIds,
  OPCUAClient,
  TimestampsToReturn,
  DataType,
} = require("node-opcua");

const nodeOPC = require("./NodeOPC");

const endpointUrl = "opc.tcp://192.168.2.3:4840";
let a = 0;
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

/////OPC UA
(async () => {
  try {
    const client = OPCUAClient.create({
      endpoint_must_exist: false,
    });
    client.on("backoff", (retry, delay) => {
      console.log("Retrying to connect to ", endpointUrl, " attempt ", retry);
    });
    console.log(" connecting to ", chalk.cyan(endpointUrl));
    await client.connect(endpointUrl);
    console.log(" connected to ", chalk.cyan(endpointUrl));

    const session = await client.createSession();
    console.log(" session created");

    const subscription = await session.createSubscription2({
      requestedPublishingInterval: 1000,
      requestedLifetimeCount: 1000,
      requestedMaxKeepAliveCount: 20,
      maxNotificationsPerPublish: 10,
      publishingEnabled: true,
      priority: 10,
    });

    subscription
      .on("keepalive", function () {
        console.log("keepalive");
      })
      .on("terminated", function () {
        console.log(" TERMINATED ------------------------------>");
      });

    // ---------------------FC Read-----------------------------------

    async function readNodeMonitor(nodeIdToMonitor, callback) {
      try {
        const itemToMonitor = {
          nodeId: nodeIdToMonitor,
          attributeId: AttributeIds.Value,
        };
        const parameters = {
          samplingInterval: 100,
          discardOldest: true,
          queueSize: 100,
        };
        const monitoredItem = await subscription.monitor(
          itemToMonitor,
          parameters,
          TimestampsToReturn.Both
        );

        monitoredItem.on("changed", (dataValue) => {
          return callback(dataValue);
        });
      } catch (error) {}
    }

    //---------------FC Read 2-------------
    async function readNode(nodeIdToMonitor, callback) {
      try {
        const maxAge = 0;
        const nodeToRead = {
          nodeId: nodeIdToMonitor,
          attributeId: AttributeIds.Value,
        };
        const dataValue = await session.read(nodeToRead, maxAge);
        //console.log(" value ", dataValue.toString());
        return callback(dataValue);
      } catch (error) {}
    }

    //TEST WRITE-------------------
    function WriteNode(setPointTemperatureId, Type, Wvalue) {
      var nodesToWrite = [
        {
          nodeId: setPointTemperatureId,
          attributeId: AttributeIds.Value,
          value: {
            value: {
              dataType: Type,
              value: Wvalue,
            },
          },
        },
      ];

      session.write(nodesToWrite, function (err, statusCodes) {
        if (!err) {
        }
      });
    }
    // readnode('ns=3;s="Clock_0.5Hz"', (dataValue) => {
    // //   const PS = {
    // //     value: dataValue.value.value,
    // //     TimeStamp: JSON.stringify(dataValue.serverTimestamp),
    // //   };
    // //     socket.emit("MQTT", dataValue.value.value.toString());
    // //   if (dataValue.value.value > 5.5) {
    // //     //const data = new Data(PS);
    // //     //data.save();
    //   console.log("KQ: ", JSON.stringify(dataValue.value));
    //   // }
    //  });

    //--------Emit DATA------------------------------////
    io.on("connection", (socket) => {
      console.log(socket.id);
      // /--------------------------------------------------------------------------------------
      const nodereads = nodeOPC.Nodereads;
      let Pre_Read = [];
      setInterval(() => {
        for (let index = 0; index < nodereads.length; index++) {
          const nodeID = nodereads[index];
          readNode(nodeID, (dataValue) => {
            if (dataValue.value.value.toString() !== Pre_Read[index]) {
              Pre_Read[index] = dataValue.value.value.toString();
              socket.emit(nodeID , dataValue.value.value);
            }
          });
        }
      }, 3000);

      ////-------------------Speed----------//////

      // readnode("ns=3;s=\"Pump_1\".\"Speed\"", (dataValue) => {

      //   socket.emit('Pump_1_SPEED',dataValue.value.value.toFixed(2));
      //  })
      //  readnode("ns=3;s=\"Pump_2\".\"Speed\"", (dataValue) => {

      //   socket.emit('Pump_2_SPEED',dataValue.value.value.toFixed(2));
      //  })
      //  readnode("ns=3;s=\"Pump_3\".\"Speed\"", (dataValue) => {

      //   socket.emit('Pump_3_SPEED',dataValue.value.value.toFixed(2));
      //  })
      //  readnode("ns=3;s=\"Pump_4\".\"Speed\"", (dataValue) => {

      //   socket.emit('Pump_4_SPEED',dataValue.value.value.toFixed(2));
      //  })
      //  readnode("ns=3;s=\"Pump_5\".\"Speed\"", (dataValue) => {

      //   socket.emit('Pump_5_SPEED',dataValue.value.value.toFixed(2));
      //  })
      //  readnode("ns=3;s=\"Pump_6\".\"Speed\"", (dataValue) => {

      //   socket.emit('Pump_6_SPEED',dataValue.value.value.toFixed(2));
      //  })

      //  --------------------------------socket on------------------------------------//

      socket.on("Button", (message) => {
        let node = 'ns=3;s=' + message;
        /////SYSTEM
        console.log(message);
        WriteNode(node, DataType.Boolean, true);
        WriteNode(node, DataType.Boolean, false);
      });
      ////////////////////////////--------------------Setmode
      socket.on("VAF_MODE", (message) => {
        let VM = 5;
        console.log(typeof message);
        if (message === "0") {
          VM = 0;
        }
        if (message === "2") {
          VM = 2;
        }
        if (message === "1") {
          VM = 1;
        }

        WriteNode('ns=3;s="VF"."MODE"', DataType.Int16, VM);
      });
      socket.on("VA1_MODE", (message) => {
        let VM = 5;
        console.log(typeof message);
        if (message === "0") {
          VM = 0;
        }
        if (message === "2") {
          VM = 2;
        }
        if (message === "1") {
          VM = 1;
        }

        WriteNode('ns=3;s="VA1"."MODE"', DataType.Int16, VM);
      });
      ////
      socket.on("Pump1_MODE", (message) => {
        let PM = 5;
        console.log(typeof message);
        if (message === "0") {
          PM = 0;
        }
        if (message === "2") {
          PM = 2;
        }
        if (message === "1") {
          PM = 1;
        }

        WriteNode('ns=3;s="Pump_1"."MODE"', DataType.Int16, PM);
      });
      socket.on("Pump2_MODE", (message) => {
        let PM = 5;
        console.log(typeof message);
        if (message === "0") {
          PM = 0;
        }
        if (message === "2") {
          PM = 2;
        }
        if (message === "1") {
          PM = 1;
        }

        WriteNode('ns=3;s="Pump_2"."MODE"', DataType.Int16, PM);
      });

      /////--------SET SPEED-----------------------------//////////////

      socket.on("SetSpeed_Pump1", (message) => {
        WriteNode('ns=3;s="Pump_1"."SetSpeed"', DataType.Float, message);
      });
      socket.on("SetSpeed_Pump2", (message) => {
        WriteNode('ns=3;s="Pump_2"."SetSpeed"', DataType.Float, message);
      });
      socket.on("SetSpeed_Pump3", (message) => {
        WriteNode('ns=3;s="Pump_3"."SetSpeed"', DataType.Float, message);
      });
      socket.on("SetSpeed_Pump4", (message) => {
        WriteNode('ns=3;s="Pump_4"."SetSpeed"', DataType.Float, message);
      });
      socket.on("SetSpeed_Pump5", (message) => {
        WriteNode('ns=3;s="Pump_5"."SetSpeed"', DataType.Float, message);
      });
      socket.on("SetSpeed_Pump6", (message) => {
        WriteNode('ns=3;s="Pump_6"."SetSpeed"', DataType.Float, message);
      });

      /////--------SET Parameters-------------------------------------//////////////

      socket.on("SetPressure_1", (message) => {
        WriteNode(
          'ns=3;s="DataSystem"."PS_Filter1_Set"',
          DataType.Float,
          message
        );
      });
      socket.on("SetPressure_2", (message) => {
        WriteNode(
          'ns=3;s="DataSystem"."PS_Filter2_Set"',
          DataType.Float,
          message
        );
      });
      socket.on("SetPressure_3", (message) => {
        WriteNode('ns=3;s="DataSystem"."PS_RO_Set"', DataType.Float, message);
      });

      socket.on("Clean_Rinse", (message) => {
        WriteNode('ns=3;s="DataSystem"."Time_Rinse"', DataType.Int32, message);
        console.log(message);
      });
      socket.on("Clean_Backwash", (message) => {
        WriteNode(
          'ns=3;s="DataSystem"."Time_Backwash"',
          DataType.Int32,
          message
        );
      });
      socket.on("Convert23", (message) => {
        console.log(message);
        WriteNode(
          'ns=3;s="DataSystem"."TimeInvertPump23"',
          DataType.Int32,
          message
        );
      });
      socket.on("Convert45", (message) => {
        WriteNode(
          'ns=3;s="DataSystem"."TimeInvertPump45"',
          DataType.Int32,
          message
        );
      });

      socket.on("disconnect", () => {
        console.log("USER DISCONNECTED");
      });
    });
    //ad(setPointTemperatureId, DataType.Int16, 22);
    // ad("ns=3;s=\"GAuto\"", DataType.Boolean, true);
    // detect CTRL+C and close
    let running = true;
    process.on("SIGINT", async () => {
      if (!running) {
        return; // avoid calling shutdown twice
      }
      console.log("shutting down client");
      running = false;

      await subscription.terminate();

      await session.close();
      await client.disconnect();
      console.log("Done");
      process.exit(0);
    });
  } catch (err) {
    console.log(chalk.bgRed.white("Error" + err.message));
    console.log(err);
    process.exit(-1);
  }
})();

//********** */

app.use(express.json());
app.use(cors());
/// khai bao ham se thuc hien khi den url
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/mqtts", mqttRouter);
