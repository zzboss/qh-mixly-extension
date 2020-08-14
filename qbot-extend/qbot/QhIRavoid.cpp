#include "QhIRavoid.h"
#include "arduino.h"

QhIRavoid::QhIRavoid()
{
    leftPin = A0;
    rightPin = A1;
    pinMode(leftPin, INPUT);
    pinMode(rightPin, INPUT); 
	  irValue = 0;	
}

QhIRavoid::QhIRavoid(char LIRPin, char RIRPin)
{
    leftPin = LIRPin;
    rightPin = RIRPin;
    pinMode(leftPin, INPUT);
    pinMode(rightPin, INPUT);  
	irValue = 0;		
}

int QhIRavoid::get_IR_avoid_value()
{
	if( digitalRead(leftPin) == LOW && digitalRead(rightPin) == LOW ){
		irValue = 3;
	}else if( digitalRead(leftPin) == LOW && digitalRead(rightPin) == HIGH ){
		irValue = 1;
	}else if( digitalRead(leftPin) == HIGH && digitalRead(rightPin) == LOW ){
		irValue = 2;
	}else {
		irValue = 1;
	}
	return irValue;
}
