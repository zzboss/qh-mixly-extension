#include "QhLED.h"

QhLED::QhLED(){
	pinMode(LED_L_PIN,OUTPUT);
	pinMode(LED_M_PIN,OUTPUT);
	pinMode(LED_R_PIN,OUTPUT);
	analogWrite(LED_L_PIN, 0);
	analogWrite(LED_M_PIN, 0);
	analogWrite(LED_R_PIN, 0);
}

void QhLED::QhLED_L(unsigned char sta){
	if(sta == 0){ analogWrite(LED_L_PIN, 0); }
	else { analogWrite(LED_L_PIN, brightness); }
}

void QhLED::QhLED_M(unsigned char sta){
	if(sta == 0){ analogWrite(LED_M_PIN, 0); }
	else { analogWrite(LED_M_PIN, brightness); }
}

void QhLED::QhLED_R(unsigned char sta){
	if(sta == 0){ analogWrite(LED_R_PIN, 0); }
	else { analogWrite(LED_R_PIN, brightness); }
}

void QhLED::QhLED_ALL(unsigned char sta){
	if(sta == 0){ 
		analogWrite(LED_L_PIN, 0); 
		analogWrite(LED_M_PIN, 0); 
		analogWrite(LED_R_PIN, 0); 
	}else { 
		analogWrite(LED_L_PIN, brightness); 
		analogWrite(LED_M_PIN, brightness); 
		analogWrite(LED_R_PIN, brightness); 
	}
}

void QhLED::QhLED_ADD_BRIG(){
	brightness += 100;
	if(brightness > 255){ brightness = 255; }
	analogWrite(LED_L_PIN, brightness); 
	analogWrite(LED_M_PIN, brightness); 
	analogWrite(LED_R_PIN, brightness); 
}

void QhLED::QhLED_SUB_BRIG(){
	brightness -= 100;
	if(brightness < 0){ brightness = 0; }
	analogWrite(LED_L_PIN, brightness); 
	analogWrite(LED_M_PIN, brightness); 
	analogWrite(LED_R_PIN, brightness); 
}

void QhLED::atmosphereMode(){
  brightness = 250;
  analogWrite(LED_L_PIN, brightness); 
  analogWrite(LED_M_PIN, brightness); 
  analogWrite(LED_R_PIN, brightness); 
}

void QhLED::warmMode(){
  brightness = 100;
  analogWrite(LED_L_PIN, brightness); 
  analogWrite(LED_M_PIN, brightness); 
  analogWrite(LED_R_PIN, brightness); 
}

void QhLED::sleepMode(){
  brightness = 50;
  analogWrite(LED_L_PIN, brightness); 
  analogWrite(LED_M_PIN, brightness); 
  analogWrite(LED_R_PIN, brightness); 
}
