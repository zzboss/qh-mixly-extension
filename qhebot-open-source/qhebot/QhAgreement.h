#ifndef QHAGREEMENT_H
#define QHAGREEMENT_H

class QhAgreement
{
public:
	int q_Code = 0;
	int h_Code = 0;

	QhAgreement();
	void QhAgreementInit();
	void get_qh_Agreement();
	int get_q_code();
	int get_h_code();
};

#endif
