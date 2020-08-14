#include "QhUltrasonic.h"
#include "arduino.h"

QhUltrasonic::QhUltrasonic()
{
    trigPin = A2;
    echoPin = A3;
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);    //定义超声波输入脚
}

QhUltrasonic::QhUltrasonic(char tPin, char ePin)
{
    trigPin = tPin;
    echoPin = ePin;
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);    //定义超声波输入脚
}

int QhUltrasonic::get_ultrasonic_value()
{
  digitalWrite(trigPin, LOW);               //给触发脚低电平2μs
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);              //给触发脚高电平10μs，这里至少是10μs
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  ultrasonic_distance = pulseIn(echoPin, HIGH)/58; // 读取高电平时间(单位：微秒)
  return ultrasonic_distance;
}
