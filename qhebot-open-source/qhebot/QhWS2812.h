#ifndef QHWS2812_H
#define QHWS2812_H

#include "QH_Configuration.h"
#include "arduino.h"
#include "FastLED.h"            // 此示例程序需要使用FastLED库

class QhWS2812 {
	  CRGB leds[WS2812_NUM_LEDS];
	  int flag_atmos_mode_cnt = 0;
	public:
    int flag_atmos_mode_sta = 0;
	  QhWS2812();
    void atmosphereMode();
    void warmMode(unsigned char sta);
    void sleepMode(unsigned char sta);
    void setWS2812Off();
};

#endif
