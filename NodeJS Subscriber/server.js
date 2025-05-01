const mqtt = require("mqtt");
const express = require("express");

const app = express();
const port = 3000;

const broker = "mqtt://mqtt.flespi.io";
const topic = "restaurant/scanner/input";
const token =
  "9VyYmnSjnJEmvpT9DE2SABY4qQPGcdAnlbdLjPyuNtm0aZACQLkhQSjKJ8cAhKBE"; // Replace with actual token

const org_devices = [
  {
    box_ID: "123-456",
  },
  {
    box_ID: "458-657",
  },
  {
    box_ID: "458-657",
  },
];

function check_connectivity(devices, data) {
  devices.forEach((device) => {
    if (device.box_ID === data.productId) {
      console.log(`Box no ${device.box_ID} is connected`);
    }
  });
}

// Connect to Flespi MQTT broker
const client = mqtt.connect(broker, {
  username: token,
  password: "", // not needed
});

client.on("connect", () => {
  console.log("✅ Connected to Flespi MQTT broker");
  client.subscribe(topic, () => {
    console.log(`📡 Subscribed to topic: ${topic}`);
  });
});

client.on("message", (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    //console.log(`📨 Received on [${topic}]:`, data);
    check_connectivity(org_devices, data);
    // You can store/process here
  } catch (err) {
    console.error("❌ Error parsing message:", err);
  }
});

app.listen(port, () => {
  console.log(`🚀 Express backend running at http://localhost:${port}`);
});
