#ifndef QHRGB_MOTION_CTRL_H
#define QHRGB_MOTION_CTRL_H

///@brief Class for MeBuzzer module
class QhMotionCtrl 
{
	public:
	  char AIN1pin; 
	  char APWMpin; 
		
	  char BIN1pin; 
	  char BPWMpin;
		
		unsigned char speed;
		unsigned char direction;		
		
	  QhMotionCtrl();
	  QhMotionCtrl(char ain1, char apwm, char bin1, char bpwm );
		void setMotionSpeed(unsigned char sp);
		void setMotionDir(unsigned char dir);
		void allSpeed2Sec();
};

#endif
