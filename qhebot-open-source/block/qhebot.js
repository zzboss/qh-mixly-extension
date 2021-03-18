/**
 * 语音播报
 */

const voiceBlockColor = "#1abc9c";

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
