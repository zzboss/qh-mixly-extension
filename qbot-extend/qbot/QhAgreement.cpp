#include "QhAgreement.h"
#include "arduino.h"

static unsigned char buzzer_pin;


QhAgreement::QhAgreement()
{
   q_Code = 0;
   h_Code = 0;
   Serial.begin(9600); 
}

void QhAgreement::QhAgreementInit()
{
   q_Code = 0;
   h_Code = 0;
   Serial.begin(9600); 
}

//void QhAgreement::get_qh_Agreement()
//{
//  while(Serial.available()){
//    if(Serial.read() == 'q'){
//      q_Code = Serial.parseInt();
//      if(Serial.read() != 'h'){
//        q_Code = 99;
//        h_Code = 99;
//      }
//      else { h_Code = Serial.parseInt(); }
//      Serial.print( "q" );
//      Serial.print( (int)q_Code );
//      Serial.print( "h" );
//      Serial.println( (int)h_Code );
//      Serial.println( "ok" );
//    }
//  } 
//}

void QhAgreement::get_qh_Agreement()
{
  char flag_over = 0;
  
  while(Serial.available()){
    if(Serial.read() == 'q'){
      q_Code = 0;
      while(1){
        while(Serial.available()){
          flag_over = Serial.read();
          if(flag_over == 'h') break;
          q_Code = q_Code*10 + flag_over - 48;
        }
        if(flag_over == 'h') break;
      }
      
      h_Code = 0;
      
      while(1){
        while(Serial.available()){
          flag_over = Serial.read();
          if(flag_over == 'd') break;
          h_Code = h_Code*10 + flag_over - 48;
        }
        if(flag_over == 'd') break;
      }
    }
      Serial.print( "q" );
      Serial.print( (int)q_Code );
      Serial.print( "h" );
      Serial.println( (int)h_Code );
      Serial.println( "ok" );
  } 
}
