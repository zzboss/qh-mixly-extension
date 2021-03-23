#ifndef QHVOICE_H
#define QHVOICE_H

#include <Wire.h> 
#include <SoftwareSerial.h>
#include "QH_Configuration.h"
#include "arduino.h"

extern SoftwareSerial voiceSer;

class QhVoice {
	private:
		unsigned char selVoice[9] = {0x00, 0x7E ,0xFF ,0x06 ,0x03 ,0x00 ,0x00 ,0x1E ,0xEF};   //音频选择指令
		unsigned char setVolume[9] = {0x00, 0x7E ,0xFF ,0x06 ,0x06 ,0x00 ,0x00 ,0x1E ,0xEF};  //音量设置
    
	public:
	    
      int qhVolume = 25;
	    QhVoice();
      void QhVoiceInit();
      void QhPlayVoice(unsigned char selData);   //语音播放
      void QhVolume_control(unsigned char volumeData);      //音量控制
      void QhVolume_add();      //音量增加
      void QhVolume_sub();      //音量减小
};

#endif
