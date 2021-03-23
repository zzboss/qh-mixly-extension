#include "QhCURTAIN.h"

QhCURTAIN::QhCURTAIN(){
	pinMode(CURTAIN_MOTOR_INA1,OUTPUT);
	pinMode(CURTAIN_MOTOR_INA2,OUTPUT);
	analogWrite(CURTAIN_MOTOR_INA1, 0);
	analogWrite(CURTAIN_MOTOR_INA2 , 0);
}

void QhCURTAIN::SET_QhCURTAIN(unsigned char sta){
	if(sta == 0){ 
		if(curtain_sta == 1){
			curtain_sta = 0;
			openCurtain();//执行开窗指令  
			delay(action_time);
			closeMotor();//关闭电机
		} 
	}else { 
		if(curtain_sta == 0){
			curtain_sta = 1;
			closeCurtain();//执行关窗指令
			delay(action_time);
			closeMotor();//关闭电机
		}
	}
}

void QhCURTAIN::openCurtain(){
	analogWrite(CURTAIN_MOTOR_INA1, action_close_speed);
	analogWrite(CURTAIN_MOTOR_INA2 , 0);
}

void QhCURTAIN::closeCurtain(){
	analogWrite(CURTAIN_MOTOR_INA1, 0);
	analogWrite(CURTAIN_MOTOR_INA2 , action_open_speed);
}

void QhCURTAIN::closeMotor(){
	analogWrite(CURTAIN_MOTOR_INA1, 0);
	analogWrite(CURTAIN_MOTOR_INA2 , 0);
}
