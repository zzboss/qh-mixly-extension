#ifndef QHLED_H
#define QHLED_H

#include "QH_Configuration.h"
#include "arduino.h"

class QhLED {
	  int brightness = 255;
	public:
	  QhLED();
      void QhLED_L(unsigned char sta);   //左大灯
      void QhLED_M(unsigned char sta);   //中大灯
      void QhLED_R(unsigned char sta);   //右大灯
      void QhLED_ALL(unsigned char sta); //所有大灯
      void QhLED_ADD_BRIG(); //所有大灯 亮度增加
      void QhLED_SUB_BRIG(); //所有大灯 亮度减弱

      void atmosphereMode();
      void warmMode();
      void sleepMode();
};

#endif
