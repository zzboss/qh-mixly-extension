/**
 * 语音播报
 */

// 初始化
const qhebot_mp3_init = function () {
  Blockly.Arduino.definitions_["include_SoftwareSerial"] = "#include <SoftwareSerial.h>";
  Blockly.Arduino.definitions_["include_QHPlayer_Mini_Mp3"] = '#include "QHPlayer_Mini_Mp3.h"';
  Blockly.Arduino.setups_["qhebot_mp3_init"] = `Serial.begin (9600);\n  mp3_set_serial (Serial);`;
};

// 音量设置
Blockly.Arduino.qhebot_mp3_volume_set = function () {
  qhebot_mp3_init();
  var number_vol = this.getFieldValue("vol");
  var code = `mp3_set_volume(${number_vol});\n`;
  return code;
};

// 播放音频文件
Blockly.Arduino.qhebot_mp3_play = function () {
  qhebot_mp3_init();
  var text_file_name = this.getFieldValue("file_name");
  var code = `mp3_play(${text_file_name});\n`;
  return code;
};

// 播放下一曲
Blockly.Arduino.qhebot_mp3_next = function () {
  qhebot_mp3_init();
  return "mp3_next();\n";
};

// 播放上一曲
Blockly.Arduino.qhebot_mp3_prev = function () {
  qhebot_mp3_init();
  return "mp3_prev();\n";
};

/**
 * 蓝牙
 */

// 初始化
Blockly.Arduino.qhebot_bluetooth_init = function () {
  Blockly.Arduino.definitions_["include_" + "qhebot_bluetooth"] = '#include "QhAgreement.h"';
  Blockly.Arduino.definitions_["qhebot_bluetooth_variable"] = "QhAgreement qhAgreement;";
  Blockly.Arduino.setups_["qhebot_bluetooth_init"] = "qhAgreement.QhAgreementInit();";
  var code = "";
  return code;
};

// 蓝牙数据解析
Blockly.Arduino.qhebot_bluetooth_resolve = function () {
  var code = "qhAgreement.get_qh_Agreement();\n";
  return code;
};

// 读取q值
Blockly.Arduino.qhebot_bluetooth_get_q = function () {
  var code = "qhAgreement.get_q_code()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 读取h值
Blockly.Arduino.qhebot_bluetooth_get_h = function () {
  var code = "qhAgreement.get_h_code()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 设置q值
Blockly.Arduino.qhebot_bluetooth_set_q_code = function () {
  var number_NAME = this.getFieldValue("NAME");
  var code = `qhAgreement.set_q_code(${number_NAME});\n`;
  return code;
};

// 设置h值
Blockly.Arduino.qhebot_bluetooth_set_h_code = function () {
  var number_NAME = this.getFieldValue("NAME");
  var code = `qhAgreement.set_h_code(${number_NAME});\n`;
  return code;
};
