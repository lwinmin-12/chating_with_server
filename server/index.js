const mqtt = require("mqtt");
const WebSocket = require("ws");

// Subscribe variables
let sub_topic = "general";
let sub_options = { qos: 0 };

let options = {
  host: "7cb0bb03390b413ca6ebc8bf5bf63014.s2.eu.hivemq.cloud",
  port: 8883,
  protocol: "mqtts",
  username: "lmo-12",
  password: "mindin4580",
  reconnectPeriod: 5000,
};

const client = mqtt.connect(options);

async function connect() {
  client.subscribe(sub_topic, sub_options, function (err) {
    if (err) {
      console.log("An error occurred while subscribing");q
    } else {
      console.log("Subscribed successfully to " + sub_topic.toString());
    }
  });

  client.subscribe("ALSW/#", sub_options, function (err) {
    if (err) {
      console.log("An error occurred while subscribing");
    } else {
      console.log("Subscribed successfully to " + sub_topic.toString());
    }
  });
}

const wss = new WebSocket.Server({
  port: 8884,
});


wss.on('connection' , function(ws) {
  //ws senting
  ws.on('message' , function(data){
      client.publish("general" , data.toString(),{ qos: 0, retain: false })
  })

})


client.on("connect", connect);

client.on("message", (topic , message)=>{
  wss.clients.forEach(function each(client) {
    if (client.readyState == WebSocket.OPEN) {
      client.send(message.toString());
    }
  });

  messageForShow(topic , message)

});


client.on("reconnect", function () {
  console.log("Reconnection starting");
});

client.on("offline", function () {
  console.log("Currently offline. Please check internet!");
});


function messageForShow(topic, message) {
  // if(topic == 'ALWS/temp'){
  //   console.log('temperature' + message.toString())
  // }

  console.log("received message " + topic + "/" + message.toString());

  
  
}