#include <SPI.h>
#include <LoRa.h>
#include <DHT.h>

// Temperature & Humidity pins
#define DHTPIN1 3
#define DHTTYPE DHT11

// Moisture pins
#define SOIL1 A0

// Light pins
#define LIGHT1 A2     

// LoRa pins
#define NSS   10
#define RESET 9
#define DIO0  2

DHT dht1(DHTPIN1, DHTTYPE);

void setup() {
  Serial.begin(9600);
  while (!Serial);

  dht1.begin();

  // Check LoRa
  LoRa.setPins(NSS, RESET, DIO0);
  if (!LoRa.begin(433E6)) {
    Serial.println("LoRa init failed!");
    while (1);
  }
  Serial.println("LoRa sender ready");
}

void loop() {
  int soil1 = analogRead(SOIL1);
  float h1 = dht1.readHumidity();
  float t1 = dht1.readTemperature();
  int light1 = analogRead(LIGHT1);   

  // Check DHT readings
  if (isnan(h1) || isnan(t1)) {
    Serial.println("DHT1 read failed!");
    String nanReading = "h1 reading: " + String(h1) + "; t1 reading: " + String(t1);
    Serial.println(nanReading);
  }

  // Format
  String payload = "A," + String(soil1) + "," + String(h1) + "," + String(t1) + "," + String(light1);
  // + "," + String(solenoid);

  // Send via LoRa
  LoRa.beginPacket();
  LoRa.print(payload);
  LoRa.endPacket();

  Serial.print("Sent: ");
  Serial.println(payload);

  delay(5000); 
}
