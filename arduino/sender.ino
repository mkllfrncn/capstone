// sender.ino -- simulate sensor data; use on sender MCU or test
void setup() {
  Serial.begin(9600);
  randomSeed(analogRead(0));
}
void loop() {
  int moisture = random(300, 700);
  int humidity = random(40, 70);
  int temperature = random(25, 35);
  int light = random(200, 400);
  String json = "{\"mcu\":\"mcu1\",\"zone\":\"zoneA\",\"data\":{";
  json += "\"moisture\":" + String(moisture) + ",";
  json += "\"humidity\":" + String(humidity) + ",";
  json += "\"temperature\":" + String(temperature) + ",";
  json += "\"light\":" + String(light) + "}}";
  Serial.println(json);
  delay(2000);
}
