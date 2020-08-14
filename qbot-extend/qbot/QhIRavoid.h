#ifndef QH_IR_AVOID_H
#define QH_IR_AVOID_H

///@brief Class for MeBuzzer module
class QhIRavoid 
{
	public:
	    char leftPin; 
	    char rightPin; 
		int irValue;
	    QhIRavoid();
	    QhIRavoid( char LIRPin, char RIRPin );
		int get_IR_avoid_value();
};

#endif
