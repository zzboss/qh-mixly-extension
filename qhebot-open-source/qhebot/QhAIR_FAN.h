#ifndef QhAIR_FAN_H
#define QhAIR_FAN_H

#include "QH_Configuration.h"
#include "arduino.h"

class QhAIR_FAN {
	  int fanSpeed = 50;
	 public:
	  QhAIR_FAN();
      void QhAIR(unsigned char sta);   //空调
      void QhFAN(unsigned char sta);   //风扇
      void QhFAN_ADD();   //风扇速度增加
      void QhFAN_SUB();   //风扇速度减小
};

#endif
