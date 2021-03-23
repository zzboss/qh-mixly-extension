#ifndef QHDHT11_H  
#define QHDHT11_H  
      
#if ARDUINO < 100  
#include <WProgram.h>  
#else  
#include <Arduino.h>  
#endif  
            
class QhDHT11{  
    public:  
        int getTHValue(uint8_t pin);  
        double humidity;  
        double temperature;  
      
    private:  
        uint8_t bits[5];  // buffer to receive data  
        int read(uint8_t pin);  
};  
#endif  
