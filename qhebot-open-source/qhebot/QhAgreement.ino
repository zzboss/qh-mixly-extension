#include "QH_Configuration.h"
#include "QhAgreement.h"
#include <Wire.h> 
#include "LiquidCrystal_I2C.h"
#include "QhVoice.h"
#include <SoftwareSerial.h>
#include "QhLED.h"
#include "QhAIR_FAN.h"
#include "QhDHT11.h"
#include "QhWS2812.h"
#include "QhCURTAIN.h"

QhAIR_FAN qhair_fan;
QhAgreement qhAgreement;
LiquidCrystal_I2C lcd(0x27,16,2);  // set the LCD address to 0x27 for a 16 chars and 2 line display

QhLED qhled;
QhDHT11 qhdht11;
QhWS2812 qhws2812;
QhCURTAIN qhcurtain;
QhVoice qhvoice;

void setup(){
  qhAgreement.QhAgreementInit();
//  qhvoice.QhVoiceInit();
  qhvoice.QhVolume_control(30);
  lcd.init();                      // initialize the lcd
  lcd.backlight();
  lcd.setCursor(2,1); // go to start of 2nd line
  lcd.print("Hello, world!");
  lcd.setCursor(4,0); // go to start of 2nd line
  lcd.print("QHEBOT"); 
  delay(1000); 
  qhvoice.QhPlayVoice(1);
  delay(2000); 
  qhvoice.QhPlayVoice(2);
  Serial.println(" QHEBOT INIT OVER ");
} 

long int timeCnt = 0;

void loop(){
  qhAgreement.get_qh_Agreement();
  switch(qhAgreement.q_Code){
    case 41:  q41hcodeAction();  break;
    case 42:  q42hcodeAction();  break;
  }
  qhAgreement.q_Code = 99;

  if( millis() - timeCnt >= 50 ){ timeCnt = millis(); TimerInt(); }
}        


void q41hcodeAction(){
  switch(qhAgreement.h_Code){
    case 1:  qhled.QhLED_ALL(1);  break;
    case 2:  qhled.QhLED_ALL(0);break;
    case 3:  qhled.QhLED_ADD_BRIG();break;
    case 4:  qhled.QhLED_SUB_BRIG();break;
    case 5:  qhair_fan.QhAIR(1);  break;
    case 6:  qhair_fan.QhAIR(0);  break;
    case 7:  lcd.backlight();     break;
    case 8:  lcd.noBacklight();   break;
    case 9:  qhair_fan.QhFAN(1);  break;
    case 10: qhair_fan.QhFAN(0);  break;
    case 11: qhair_fan.QhFAN_ADD();  break;
    case 12: qhair_fan.QhFAN_SUB();  break;
    case 13: qhws2812.flag_atmos_mode_sta = 1; qhled.atmosphereMode();  break;
    case 14: qhws2812.flag_atmos_mode_sta = 0; qhws2812.setWS2812Off(); qhled.QhLED_ALL(0); break;
    case 15: qhws2812.warmMode(1); qhled.warmMode();  break;
    case 16: qhws2812.sleepMode(1); qhled.sleepMode(); break;
    case 17: qhcurtain.SET_QhCURTAIN(1); break;
    case 18: qhcurtain.SET_QhCURTAIN(0); break;
    case 19: qhvoice.QhVolume_add();  break;
    case 20: qhvoice.QhVolume_sub();  break;
  }
}


void q42hcodeAction(){
  switch(qhAgreement.h_Code){
    case 1:      Serial.print( "F42H-" ); Serial.print( (int)qhdht11.temperature ); 
                 Serial.print( "-" ); Serial.print( (int)qhdht11.humidity );
                 Serial.print( "-" ); Serial.println( (int)((double)(analogRead(PT_SENSOR_PIN))*100/1023) );break;
  }
}


void TimerInt(){
  static int cnt = 0;
  cnt++;
  if(cnt >= 20){ cnt = 0; qhdht11.getTHValue(DHT11_PIN); }
  qhws2812.atmosphereMode();
}


 
