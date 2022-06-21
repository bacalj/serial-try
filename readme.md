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
  Serial.println(String(sensorValue));
  delay(10);
}
```

2. Once you have confirmed it's running on the arduino, close Arduino IDE to not complicate access to port. 

3. 
```
$ npm install
$ npm run start
```

4. Visit [http://localhost:1234](http://localhost:1234) and open your terminal. 

5. Click "Connect to Serial".

6. In the popup choose whatever that looks like: `cu.usbmodem1101`

7. See results on page and visit console.

8. The sketch that worked, will need to adopt some of these patterns:

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
  Serial.print(String(finalReading));
}

```