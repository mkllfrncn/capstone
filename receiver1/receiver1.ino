#include <SPI.h>
#include <LoRa.h>

#define NSS   10
#define RESET 9
#define DIO0  2

unsigned long lastPacketTime = 0;
const unsigned long TIMEOUT = 30000; //Changed to 30sec to make sure it really lost connection
bool connected = false;

void setup() {
  Serial.begin(9600);
  while (!Serial);

  LoRa.setPins(NSS, RESET, DIO0);

  if (!LoRa.begin(433E6)) {
    Serial.println("LoRa init failed!");
    while (1);
  }

  Serial.println("LoRa receiver ready");
}

void loop() {
  int packetSize = LoRa.parsePacket();

  if (packetSize) {
    String received = "";

    while (LoRa.available()) {
      received += (char)LoRa.read();
    }

    lastPacketTime = millis();

    // Connected
    if (!connected) {
      connected = true;
    }

    Serial.print("[+");
    Serial.print((millis() / 1000));
    Serial.print("s] Received: ");
    Serial.println(received);
  }

  // If timeout passes without receiving any data
  if (connected && (millis() - lastPacketTime > TIMEOUT)) {
    Serial.print("[+");
    Serial.print((millis() / 1000));
    Serial.println("s] ⚠️ LoRa connection lost");
    connected = false;
  }

  delay(100);
}
