#include "QhVoice.h"

SoftwareSerial voiceSer(VOICE_SERIAL_RX_PIN, VOICE_SERIAL_TX_PIN);

QhVoice::QhVoice(){
     voiceSer.begin(9600); 
}

void QhVoice::QhVoiceInit(){
   voiceSer.begin(9600); 
//   QhVolume_control(qhVolume);
}

void QhVoice::QhPlayVoice(unsigned char selData){
   unsigned char i;
   for(i=0; i<7; i++){
      voiceSer.write(selVoice[i]);
   }

   voiceSer.write(selData);
   voiceSer.write(selVoice[8]);
}

void QhVoice::QhVolume_control(unsigned char volumeData){
   unsigned char i;
   for(i=0; i<7; i++){
      voiceSer.write(setVolume[i]);
   }

   voiceSer.write(volumeData);
   voiceSer.write(setVolume[8]);
}

void QhVoice::QhVolume_add(){
  qhVolume += 5;
  if(qhVolume > 30) qhVolume = 30;
  QhVolume_control(qhVolume);
}
void QhVoice::QhVolume_sub(){
  qhVolume -= 5;
  if(qhVolume < 0) qhVolume = 0;
  QhVolume_control(qhVolume);
}
