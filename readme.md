# try serial

Proof-of-concept and figuring out how to best parse incoming data from Backyard Brains EMG sensors

## Get it running

1. Get an arduino running a sketch that includes `Serial.println()` of some value, ideally an analog in.  Here is an example. 

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
  delay(10);
}
```

2. Once you have confirmed it's running on the arduino, close Arduino IDE to not complicate access to port. 

3. Serve this page, e.g. `python3 -m https.server --cgi 8081` and vist it at the full localhost domain, eg. `http://localhost:8081/`. 
_(if you go to the `https://[::]:8081/` url that python gives you it will not load the Serial API)_.

4. Click "Connect to Serial".

5. In the popup choose something that looks like: `cu.usbmodem1101`

6. See results on page and visit console.

_WIP_

TODO: parse this stream of bytes stringified


