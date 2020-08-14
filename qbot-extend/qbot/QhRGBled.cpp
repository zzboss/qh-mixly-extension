#include "QhRGBled.h"
#include "arduino.h"

QhRGBled::QhRGBled()
{
	FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);
}

void QhRGBled::setRgbColor(unsigned char v_iRed, unsigned char v_iGreen, unsigned char v_iBlue)
{
  LEDS.showColor(CRGB(v_iRed, v_iGreen, v_iBlue));
}
