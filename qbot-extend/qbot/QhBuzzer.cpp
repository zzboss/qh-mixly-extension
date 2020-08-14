#include "QhBuzzer.h"
#include "arduino.h"

static unsigned char buzzer_pin;


QhBuzzer::QhBuzzer()
{
    buzzer_pin = 8;
    pinMode(buzzer_pin, OUTPUT);
    digitalWrite(buzzer_pin, LOW);
}
QhBuzzer::QhBuzzer(unsigned char pin)
{
    buzzer_pin = pin;
    pinMode(buzzer_pin, OUTPUT);
    digitalWrite(buzzer_pin, LOW);
}

// frequency (in hertz) and duration (in milliseconds).
void QhBuzzer::qtone(int frequency, long int duration)
{
   tone(buzzer_pin, frequency, duration);
}

void QhBuzzer::noqTone()
{
	noTone(buzzer_pin);
}

void QhBuzzer::play(int num, unsigned int tx)
{
	switch(num){
		case 1: tone(buzzer_pin,595, tx); break;
		case 2: tone(buzzer_pin,661, tx); break;
		case 3: tone(buzzer_pin,700, tx); break;
		case 4: tone(buzzer_pin,786, tx); break;
		case 5: tone(buzzer_pin,882, tx); break;
		case 6: tone(buzzer_pin,990, tx); break;
		case 7: tone(buzzer_pin,1112,tx); break;
    case 11: tone(buzzer_pin,621, tx); break;
    case 12: tone(buzzer_pin,680, tx); break;
    case 13: tone(buzzer_pin,740, tx); break;
    case 14: tone(buzzer_pin,940, tx); break;
    case 15: tone(buzzer_pin,1050, tx); break;
    default: break;
	}
}

void QhBuzzer::beepHigh(){
	digitalWrite(buzzer_pin, HIGH);
}

void QhBuzzer::beepLow(){
	digitalWrite(buzzer_pin, LOW);
}
