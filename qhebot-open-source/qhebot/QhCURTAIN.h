#ifndef QhCURTAIN_H
#define QhCURTAIN_H

#include "QH_Configuration.h"
#include "arduino.h"

class QhCURTAIN {
	  int curtain_sta = 0;  //0：关窗状态  1：开窗状态
	  int action_time = 1500;
	  int action_open_speed = 110;
	  int action_close_speed = 90;
	  void openCurtain();
	  void closeCurtain();
	  void closeMotor();
	public:
	  QhCURTAIN();
      void SET_QhCURTAIN(unsigned char sta);   //窗帘状态
};

#endif
