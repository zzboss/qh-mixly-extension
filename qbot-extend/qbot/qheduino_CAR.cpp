#include "qheduino_CAR.h"

//输入参数为TB6612六个引脚对应的Arduino管脚
CAR::CAR(int left_go, int left_back, int left_pwm, int right_go, int right_back, int right_pwm ) {
	  Left_motor_go   =   left_go;        //左电机前进 AIN1
	  Left_motor_back =   left_back;      //左电机后退 AIN2

      Right_motor_go   =  right_go;       //右电机前进 BIN1
	  Right_motor_back =  right_back;     //右电机后退 BIN2

      Left_motor_pwm  =   left_pwm;       //左电机控速 PWMA
	  Right_motor_pwm =   right_pwm;      //右电机控速 PWMB
	  
	  //初始化电机驱动IO口为输出方式
	  pinMode(Left_motor_go, OUTPUT);
	  pinMode(Left_motor_back, OUTPUT);
	  pinMode(Right_motor_go, OUTPUT);
	  pinMode(Right_motor_back, OUTPUT);
}

//dir ----- 0:刹车 1:前进 2:后退 3:左转 4:右转 5:原地左转 6:原地右转
//speed 0~255
void CAR::direction_speed_ctrl(int dir, int speed){
	
	speed = (int)( ((float)speed)*2.55 );
	
	speed = speed>255?255:speed;
	speed = speed<0?0:speed;
	
	switch(dir){
		case 1: run( speed ); break;
		case 2: back( speed );  break;
		case 3: left( speed );  break;
		case 4: right( speed );  break;
		case 5: spin_left( speed );  break;
		case 6: spin_right( speed );  break;
		case 0: brake();  break;
		default: brake(); break;
	}
}



/**
* Function       run
* @author        George
* @brief         小车前进
* @param[in]     time
* @param[out]    void
* @retval        void
* @par History   无
*/
void CAR::run(int speed)
{

  //左电机前进
  digitalWrite(Left_motor_go, HIGH);   //左电机前进使能
  digitalWrite(Left_motor_back, LOW);  //左电机后退禁止
  analogWrite(Left_motor_pwm, speed);    //PWM比例0-255调速，左右轮差异略增减

  //右电机前进
  digitalWrite(Right_motor_go, HIGH);  //右电机前进使能
  digitalWrite(Right_motor_back, LOW); //右电机后退禁止
  analogWrite(Right_motor_pwm, speed);   //PWM比例0-255调速，左右轮差异略增减
}

/**
* Function       back
* @author        George
* @brief         小车后退 
* @param[in]     time
* @param[out]    void
* @retval        void
* @par History   无
*/
void CAR::back(int speed)
{
  //左电机后退
  digitalWrite(Left_motor_go, LOW);     //左电机前进禁止
  digitalWrite(Left_motor_back, HIGH);  //左电机后退使能
  analogWrite(Left_motor_pwm, speed);

  //右电机后退
  digitalWrite(Right_motor_go, LOW);    //右电机前进禁止
  digitalWrite(Right_motor_back, HIGH); //右电机后退使能
  analogWrite(Right_motor_pwm, speed);
}


/**
* Function       brake
* @author        George
* @brief         小车刹车
* @param[in]     time
* @param[out]    void
* @retval        void
* @par History   无
*/
void CAR::brake()
{
  digitalWrite(Left_motor_go, LOW);
  digitalWrite(Left_motor_back, LOW);
  digitalWrite(Right_motor_go, LOW);
  digitalWrite(Right_motor_back, LOW);
}

/**
* Function       left
* @author        George
* @brief         小车左转 左转(左轮不动,右轮前进)
* @param[in]     time
* @param[out]    void
* @retval        void
* @par History   无
*/
void CAR::left(int speed)
{
  //左电机停止
  digitalWrite(Left_motor_go, LOW);     //左电机前进禁止
  digitalWrite(Left_motor_back, LOW);   //左电机后退禁止
  analogWrite(Left_motor_pwm, 0);       //左边电机速度设为0(0-255)

  //右电机前进
  digitalWrite(Right_motor_go, HIGH);  //右电机前进使能
  digitalWrite(Right_motor_back, LOW); //右电机后退禁止
  analogWrite(Right_motor_pwm, speed);   //右边电机速度设200(0-255)
}

/**
* Function       right
* @author        George
* @brief         小车右转 右转(左轮前进,右轮不动)
* @param[in]     time
* @param[out]    void
* @retval        void
* @par History   无
*/
void CAR::right(int speed)
{
  //左电机前进
  digitalWrite(Left_motor_go, HIGH);    //左电机前进使能
  digitalWrite(Left_motor_back, LOW);   //左电机后退禁止
  analogWrite(Left_motor_pwm, speed);     //左边电机速度设200(0-255)

  //右电机停止
  digitalWrite(Right_motor_go, LOW);    //右电机前进禁止
  digitalWrite(Right_motor_back, LOW);  //右电机后退禁止
  analogWrite(Right_motor_pwm, 0);      //右边电机速度设0(0-255)
}

/**
* Function       spin_left
* @author        George
* @brief         小车原地左转 原地左转(左轮后退，右轮前进)
* @param[in]     time
* @param[out]    void
* @retval        void
* @par History   无
*/
void CAR::spin_left(int speed)
{
  //左电机后退
  digitalWrite(Left_motor_go, LOW);     //左电机前进禁止
  digitalWrite(Left_motor_back, HIGH);  //左电机后退使能
  analogWrite(Left_motor_pwm, speed);

  //右电机前进
  digitalWrite(Right_motor_go, HIGH);  //右电机前进使能
  digitalWrite(Right_motor_back, LOW); //右电机后退禁止
  analogWrite(Right_motor_pwm, speed);
}

/**
* Function       spin_right
* @author        George
* @brief         小车原地右转 原地右转(右轮后退，左轮前进)
* @param[in]     time
* @param[out]    void
* @retval        void
* @par History   无
*/
void CAR::spin_right(int speed)
{
  //左电机前进
  digitalWrite(Left_motor_go, HIGH);    //左电机前进使能
  digitalWrite(Left_motor_back, LOW);   //左电机后退禁止
  analogWrite(Left_motor_pwm, speed);

  //右电机后退
  digitalWrite(Right_motor_go, LOW);    //右电机前进禁止
  digitalWrite(Right_motor_back, HIGH); //右电机后退使能
  analogWrite(Right_motor_pwm, speed);
}







