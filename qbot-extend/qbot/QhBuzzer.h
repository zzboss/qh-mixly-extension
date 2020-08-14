#ifndef QHBuzzer_H
#define QHBuzzer_H

///@brief Class for MeBuzzer module
class QhBuzzer 
{
	public:
	    QhBuzzer();
	    QhBuzzer(unsigned char pin);
	    void qtone(int frequency, long int duration = 0);
	    void noqTone();
		void play(int num, unsigned int tx);
		void beepHigh();
		void beepLow();
};

#endif
