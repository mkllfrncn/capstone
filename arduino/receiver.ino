// receiver.ino -- example: if you have LoRa, adapt radio read and print JSON to Serial
void setup() {
  Serial.begin(9600);
}
void loop() {
  // For testing, nothing to do; real receiver should print JSON same as sender
  delay(1000);
}
