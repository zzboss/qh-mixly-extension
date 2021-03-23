/**
 * 语音播报
 */

const voiceBlockColor = "#1abc9c";
const bluetoothBlockColor = "#5cb3cc";

// 初始化
Blockly.Blocks.qhebot_voice_init = {
  init: function () {
    this.appendDummyInput().appendField(new Blockly.FieldImage("../../media/voice.svg", 20, 20, "*")).appendField(Blockly.QHEBOT_VOICE_INIT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(voiceBlockColor);
    this.setTooltip(Blockly.QHEBOT_VOICE_INIT);
  },
};

// 音量设置
Blockly.Blocks.qhebot_voice_volume_set = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage("../../media/voice.svg", 20, 20, "*"))
      .appendField(Blockly.QHEBOT_VOLUME_SET)
      .appendField(new Blockly.FieldNumber(30, 0, 100, 1), "vol")
      .appendField("%");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(voiceBlockColor);
    this.setTooltip(Blockly.QHEBOT_VOLUME_SET);
  },
};

// 播放音频文件
Blockly.Blocks.qhebot_voice_play = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage("../../media/voice.svg", 20, 20, "*"))
      .appendField(Blockly.QHEBOT_VOICE_PLAY)
      .appendField(new Blockly.FieldTextInput("文件名称"), "file_name");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(voiceBlockColor);
    this.setTooltip(Blockly.QHEBOT_VOICE_PLAY);
  },
};

/**
 * 蓝牙
 */

// 初始化
Blockly.Blocks.qhebot_bluetooth_init = {
  init: function () {
    this.appendDummyInput().appendField(new Blockly.FieldImage("../../media/bluetooth.svg", 20, 20, "*")).appendField(Blockly.QHEBOT_BLUETOOTH_INIT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(bluetoothBlockColor);
    this.setTooltip(Blockly.QHEBOT_BLUETOOTH_INIT);
  },
};

// 蓝牙数据接收
Blockly.Blocks.qhebot_bluetooth_receive = {
  init: function () {
    this.appendDummyInput().appendField(new Blockly.FieldImage("../../media/bluetooth.svg", 20, 20, "*")).appendField(Blockly.QHEBOT_BLUETOOTH_READ);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(bluetoothBlockColor);
    this.setTooltip(Blockly.QHEBOT_BLUETOOTH_READ);
  },
};

// 读取q值
Blockly.Blocks.qhebot_bluetooth_get_q = {
  init: function () {
    this.appendDummyInput().appendField(new Blockly.FieldImage("../../media/bluetooth.svg", 20, 20, "*")).appendField(Blockly.QHEBOT_BLUETOOTH_READ_Q);
    this.setOutput(true, null);
    this.setColour(bluetoothBlockColor);
    this.setTooltip(Blockly.QHEBOT_BLUETOOTH_READ_Q);
  },
};

// 读取h值
Blockly.Blocks.qhebot_bluetooth_get_h = {
  init: function () {
    this.appendDummyInput().appendField(new Blockly.FieldImage("../../media/bluetooth.svg", 20, 20, "*")).appendField(Blockly.QHEBOT_BLUETOOTH_READ_H);
    this.setOutput(true, null);
    this.setColour(bluetoothBlockColor);
    this.setTooltip(Blockly.QHEBOT_BLUETOOTH_READ_H);
  },
};
