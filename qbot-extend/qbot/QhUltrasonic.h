#ifndef QHRGB_ULTRASONIC_H
#define QHRGB_ULTRASONIC_H

///@brief Class for MeBuzzer module
class QhUltrasonic 
{
	public:
	    char trigPin; 
	    char echoPin; 
		  int ultrasonic_distance;
	    QhUltrasonic();
	    QhUltrasonic( char tPin, char ePin );
		int get_ultrasonic_value();
};

#endif
