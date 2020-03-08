#ifndef _QHEDUINO_CAR_H_
#define _QHEDUINO_CAR_H_

#if defined(ARDUINO) && ARDUINO >= 100
	#include "Arduino.h"
#else
	#include "WProgram.h"
#endif

#include <inttypes.h>


class CAR 
{
	public:
		  //输入参数为TB6612六个引脚对应的Arduino管脚
		  CAR( int left_go, int left_back, int left_pwm, int right_go, int right_back, int right_pwm);
		  //dir ----- 0:刹车 1:前进 2:后退 3:左转 4:右转 5:原地左转 6:原地右转
		  //speed 0~255
		  void direction_speed_ctrl(int dir = 0, int speed  = 200);
		 
		
	private:
		  //引脚定义
		  int Left_motor_go  = 0;        //左电机前进 AIN1
		  int Left_motor_back  = 0;      //左电机后退 AIN2

		  int Right_motor_go  = 0;       //右电机前进 BIN1
		  int Right_motor_back  = 0;     //右电机后退 BIN2

		  int Left_motor_pwm  = 0;       //左电机控速 PWMA
		  int Right_motor_pwm  = 0;      //右电机控速 PWMB
		  
		  void run(int speed = 200);
		  void back(int speed = 200);
		  void right(int speed = 200);
		  void left(int speed = 200);
		  void spin_right(int speed = 200);
		  void spin_left(int speed = 200);	  
	      void brake();
};
#endif



