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
#define MAX 150
int reading[10];
int finalReading;
byte multiplier = 1;

void setup(){
  Serial.begin(9600); //begin serial communications
}

void loop(){
  
  //take ten readings in ~0.02 seconds
  for(int i = 0; i < 10; i++){    
    reading[i] = analogRead(A0) * multiplier;
    delay(2);
  }
  
  //average the ten readings
  for(int i = 0; i < 10; i++){   
    finalReading += reading[i];
  }
  finalReading /= 10;

  finalReading = constrain(finalReading, 0, MAX);

  /* output strings for browser's sake - no newline not so nice on arduino side */
  Serial.print(String(finalReading));
}

```