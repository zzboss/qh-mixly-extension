#include "QhWS2812.h"

QhWS2812::QhWS2812(){
	pinMode(WS2812_PIN,OUTPUT);
	LEDS.addLeds<WS2812, WS2812_PIN, GRB>(leds, WS2812_NUM_LEDS);
	FastLED.setBrightness(15);                            // 设置光带亮度
//	FastLED.show();                // 更新LED色彩
}

void QhWS2812::atmosphereMode(){
	if(flag_atmos_mode_sta == 1){
		flag_atmos_mode_cnt += 10;
    if(flag_atmos_mode_cnt > 760) flag_atmos_mode_cnt = 10;
		if(flag_atmos_mode_cnt < 255) LEDS.showColor(CRGB(flag_atmos_mode_cnt, 0, 0));
		else if( flag_atmos_mode_cnt < 2*255 && flag_atmos_mode_cnt > 255 ) LEDS.showColor(CRGB(0, flag_atmos_mode_cnt-255, 0));
		else if( flag_atmos_mode_cnt < 3*255 && flag_atmos_mode_cnt > 2*255 ) LEDS.showColor(CRGB(0, 0, flag_atmos_mode_cnt-2*255));		
	}
}

void QhWS2812::setWS2812Off(){
  LEDS.showColor(CRGB(0, 0, 0));
}

void QhWS2812::warmMode(unsigned char sta){
  flag_atmos_mode_sta = 0;
	if(sta == 1){  LEDS.showColor(CRGB(100, 100, 0));
	}else { LEDS.showColor(CRGB(0, 0, 0)); }
}

void QhWS2812::sleepMode(unsigned char sta){
  flag_atmos_mode_sta = 0;
  if(sta == 1){ LEDS.showColor(CRGB(10, 10, 0));
  }else { LEDS.showColor(CRGB(0, 0, 0)); }
}
