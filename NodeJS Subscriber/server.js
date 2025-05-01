const mqtt = require("mqtt");
const express = require("express");

const app = express();
const port = 3000;

const broker = "mqtt://mqtt.flespi.io";
const topic = "restaurant/scanner/input";
const token =
  "9VyYmnSjnJEmvpT9DE2SABY4qQPGcdAnlbdLjPyuNtm0aZACQLkhQSjKJ8cAhKBE"; // Replace with actual token

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
    console.log(`📨 Received on [${topic}]:`, data);
    // You can store/process here
  } catch (err) {
    console.error("❌ Error parsing message:", err);
  }
});

app.listen(port, () => {
  console.log(`🚀 Express backend running at http://localhost:${port}`);
});
