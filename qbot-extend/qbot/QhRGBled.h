#ifndef QHRGB_LED_H
#define QHRGB_LED_H

#include "FastLED.h"

#define NUM_LEDS 2    //LED数目
#define DATA_PIN 13    

///@brief Class for MeBuzzer module
class QhRGBled 
{
	public:
	  	CRGB leds[NUM_LEDS];
 		
	    QhRGBled();
		  void setRgbColor(unsigned char v_iRed, unsigned char v_iGreen, unsigned char v_iBlue);
};

#endif
