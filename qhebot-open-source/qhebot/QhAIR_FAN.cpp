#include "QhAIR_FAN.h"

QhAIR_FAN::QhAIR_FAN(){
	pinMode(FAN_PIN,OUTPUT);
	pinMode(AIR_LED_R_PIN,OUTPUT);
	pinMode(AIR_LED_G_PIN,OUTPUT);
  analogWrite(FAN_PIN, 0); 
  digitalWrite(AIR_LED_R_PIN, LOW); 
  digitalWrite(AIR_LED_G_PIN, HIGH); 
}

void QhAIR_FAN::QhAIR(unsigned char sta){
	if(sta == 0){ digitalWrite(AIR_LED_R_PIN, LOW); digitalWrite(AIR_LED_G_PIN, HIGH); }
	else { digitalWrite(AIR_LED_R_PIN, HIGH); digitalWrite(AIR_LED_G_PIN, LOW); }
}

void QhAIR_FAN::QhFAN(unsigned char sta){
	if(sta == 0){ analogWrite(FAN_PIN, 0); }
	else { analogWrite(FAN_PIN, fanSpeed); }
}

void QhAIR_FAN::QhFAN_ADD(){
	fanSpeed += 50;
	if(fanSpeed > 230){ fanSpeed = 230; }
	analogWrite(FAN_PIN, fanSpeed);
}

void QhAIR_FAN::QhFAN_SUB(){
	fanSpeed -= 50;
	if(fanSpeed < 50){ fanSpeed = 50; }
	analogWrite(FAN_PIN, fanSpeed);
}
