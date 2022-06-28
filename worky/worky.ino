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

  /* println gives us a newline delimeter which we end up using */
  Serial.println(finalReading);
}