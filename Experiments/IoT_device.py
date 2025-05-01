import paho.mqtt.client as mqtt
import json
import time

broker = "mqtt.flespi.io"
port = 1883
topic = "restaurant/scanner/input"
username = "BfNjPf35CflUrLjsyN8SmlCNPfHbBrxisSIPvginGb0FI4JeUhOVxwHneAk76cf7"  # Replace this

client = mqtt.Client()
client.username_pw_set(username)

client.connect(broker, port, 60)
print("📡 Connected to Flespi MQTT broker")

while True:
    payload = {
        "productId": "prod-" + str(time.time_ns())[7:],
        "timestamp": time.strftime('%Y-%m-%d %H:%M:%S')
    }

    client.publish(topic, json.dumps(payload))
    print(f"📤 Sent: {payload}")
    time.sleep(3)