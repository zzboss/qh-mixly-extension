#ifndef QH_CONFIGURATION_H
#define QH_CONFIGURATION_H

#include <Arduino.h>

#define IR_REMOTE_PIN 7

#define LED_L_PIN  9
#define LED_M_PIN  10
#define LED_R_PIN  11

#define DHT11_PIN  4
#define FAN_PIN  6
#define PT_SENSOR_PIN A0         //光敏模块

#define AIR_LED_R_PIN -1
#define AIR_LED_G_PIN A1
#define AIR_LED_B_PIN -1

#define CURTAIN_MOTOR_INA1 3
#define CURTAIN_MOTOR_INA2 5

#define VOICE_SERIAL_RX_PIN -1
#define VOICE_SERIAL_TX_PIN 2

#define WS2812_PIN  13
#define WS2812_NUM_LEDS  6


#endif
