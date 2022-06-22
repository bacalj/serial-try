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

9. Below is original sketch from BB

```c++

  /*
  * ----------------------------------------------------------------------------------------------------
  * Backyard Brains 2016
  * Muscle SpikerShield Arduino UNO Code for Testing Gripper Funcionality.
  *
  * V1.0
  * Written by Tim Marzullo
  *
  * Tested with Muscle SpikerShield V2.6
  * ----------------------------------------------------------------------------------------------------
  */

  #include <Servo.h>  
  #define SERVO_PIN 2                         //pin for servo motor
  Servo Gripper;                              //servo for gripper


  //-----------------------------------------------------------------------------------
  //   Setup servo
  // ----------------------------------------------------------------------------------
  void setup(){
    //init servo
    Gripper.attach(SERVO_PIN); 
  }


  //-----------------------------------------------------------------------------------
  //   Main loop
  //   Moves Gripper between Open and Closed Position to Test Gripper Functionality
  // ----------------------------------------------------------------------------------
  void loop() {
    Gripper.write(105); //close Gripper
    delay(500);         // delay 500 ms
    Gripper.write(190); //open Gripper
    delay(2000);        // delay 2000 ms
}

```

10. You can now edit and upload sketches right from VSC via the extension, so tweak is in a real file `tweakClaw.ino` and in git now

## 1

```c++
Serial.print(analogReadings);
```
yields
```js
{value: '9383', done: false}
{value: '8383', done: false}
{value: '7363', done: false}
{value: '6363', done: false}
```

## 2

```c++
Serial.println(analogReadings);
```
yields
```js

```

## 3

```c++
Serial.print(String(analogReadings));
```
yields
```js

```

## 4

```c++
Serial.write(analogReadings);
```
yields
```js
{value: '?>>=', done: false}
{value: '=<<<', done: false}
{value: ';;;:', done: false}
{value: ':999', done: false}
{value: '9988', done: false}
```