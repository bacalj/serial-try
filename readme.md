# try serial

first, an arduino with a pot that outputs to serial

sketch
```c++
int sensorValue = 0;

void setup()
{
  pinMode(A0, INPUT);
  Serial.begin(9600);
}

void loop()
{
  sensorValue = analogRead(A0);
  Serial.println(sensorValue);
  delay(10); // mite want to change this
}
```

