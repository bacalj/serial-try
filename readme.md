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

```js

let buffer = "";

function handleStreamObj(val){

  const regex = /(\d+)\\r\\n/;

  buffer += val;

  const match = regex.exec(buffer);
  if (match?.[1]) {
    console.log(match[1]);
    buffer = buffer.substring(match[0].length);
  }


}

```