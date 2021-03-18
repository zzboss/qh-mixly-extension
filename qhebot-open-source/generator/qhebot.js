/**
 * 语音播报
 */

// 初始化
Blockly.Arduino.qhebot_voice_init = function () {
  Blockly.Arduino.definitions_["include_" + "qhebot_voice"] = '#include "QhVoice.h"';
  Blockly.Arduino.definitions_["qhebot_voice_variable"] = "QhVoice qhvoice;";
  Blockly.Arduino.setups_["qhebot_voice_init"] = "qhvoice.QhVoiceInit();";
  return "";
};

// 音量设置
Blockly.Arduino.qhebot_voice_volume_set = function () {
  var number_vol = this.getFieldValue("vol");
  var code = `qhvoice.QhVolume_control(${number_vol});\n`;
  return code;
};

// 播放音频文件
Blockly.Arduino.qhebot_voice_play = function () {
  var text_file_name = this.getFieldValue("file_name");
  var code = `qhvoice.QhPlayVoice("${text_file_name}");\n`;
  return code;
};
