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


## some notes

- this sketch from backyard brains that reduces output to 1 - 6
- once we can parse this we can go back to parsing the real output from the original sketch

```c++

#define NUM_LED 6  //sets the maximum numbers of LEDs
#define MAX 150     //maximum posible reading. TWEAK THIS VALUE!!
int reading[10];
int finalReading;
byte litLeds = 0;
byte multiplier = 1;
byte leds[] = {8, 9, 10, 11, 12, 13};

void setup(){
  Serial.begin(9600); //begin serial communications
  for(int i = 0; i < NUM_LED; i++){ //initialize LEDs as outputs
    pinMode(leds[i], OUTPUT);
  }
}

void loop(){
  for(int i = 0; i < 10; i++){    //take ten readings in ~0.02 seconds
    reading[i] = analogRead(A0) * multiplier;
    delay(2);
  }
  for(int i = 0; i < 10; i++){   //average the ten readings
    finalReading += reading[i];
  }
  finalReading /= 10;
  for(int j = 0; j < NUM_LED; j++){  //write all LEDs low
    digitalWrite(leds[j], LOW);
  }
  //Serial.print(finalReading);
  //Serial.print("\t");
  finalReading = constrain(finalReading, 0, MAX);
  litLeds = map(finalReading, 0, MAX, 0, NUM_LED);
  //Serial.println(litLeds);
  for(int k = 0; k < litLeds; k++){
    digitalWrite(leds[k], HIGH);
  }
  //for serial debugging, uncomment the next two lines.
  Serial.println(finalReading);
  delay(100);
}
```

## lets try passing options to TextDecoder

https://encoding.spec.whatwg.org/#dom-textdecoder-encoding