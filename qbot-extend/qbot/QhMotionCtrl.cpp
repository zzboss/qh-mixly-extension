#include "QhMotionCtrl.h"
#include "arduino.h"

QhMotionCtrl::QhMotionCtrl()
{
    AIN1pin = 7;
    APWMpin = 6;
	
	BIN1pin = 4;
    BPWMpin = 5;
    
	pinMode(AIN1pin, OUTPUT);
    pinMode(APWMpin, OUTPUT);
	pinMode(BIN1pin, OUTPUT);
    pinMode(BPWMpin, OUTPUT);
	
	digitalWrite(AIN1pin, LOW);
	digitalWrite(BIN1pin, HIGH);	
	analogWrite(APWMpin, 0);
	analogWrite(BPWMpin, 0);
	speed = 0;
}

QhMotionCtrl::QhMotionCtrl(char ain1, char apwm, char bin1, char bpwm)
{
    AIN1pin = ain1;
    APWMpin = apwm;
	
	BIN1pin = bin1;
    BPWMpin = bpwm;
    
	pinMode(AIN1pin, OUTPUT);
    pinMode(APWMpin, OUTPUT);
	pinMode(BIN1pin, OUTPUT);
    pinMode(BPWMpin, OUTPUT);
	
  	digitalWrite(AIN1pin, LOW);
  	digitalWrite(BIN1pin, HIGH);
  	analogWrite(APWMpin, 0);
  	analogWrite(BPWMpin, 0);
}

void QhMotionCtrl::setMotionSpeed(unsigned char sp)
{
	sp > 100 ? sp = 100:sp = sp;
	sp < 0 ? sp = 0:sp = sp;
	speed = sp*2.5;
	analogWrite(APWMpin, speed);
	analogWrite(BPWMpin, speed);
}

void QhMotionCtrl::setMotionDir(unsigned char dir)
{
	direction = dir;
	switch(dir){
		case 1:		digitalWrite(AIN1pin, LOW);
					digitalWrite(BIN1pin, HIGH);break;
	    case 2:	    digitalWrite(AIN1pin, HIGH);
				    digitalWrite(BIN1pin, LOW); break;	
		case 3:		digitalWrite(AIN1pin, LOW);
					digitalWrite(BIN1pin, LOW); break;
	    case 4:		digitalWrite(AIN1pin, HIGH);
					digitalWrite(BIN1pin, HIGH);break;
		default:  	analogWrite(APWMpin, 0);
					analogWrite(BPWMpin, 0);
					speed = 0;                break;
	}
}

void QhMotionCtrl::allSpeed2Sec(){
	setMotionDir(1);
	analogWrite(APWMpin, 250);
	analogWrite(BPWMpin, 250);
	delay(2000);
	setMotionDir(7);
	analogWrite(APWMpin, 0);
	analogWrite(BPWMpin, 0);
}
