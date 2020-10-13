"use strict";
goog.provide("Blockly.Arduino.QHMixlyExtend");
goog.require("Blockly.Arduino");
goog.require("Blockly.JavaScript");

const qbotBlockUtil = {
  include(key, libName) {
    Blockly.Arduino.definitions_[
      `qbot_include_${key}`
    ] = `#include "${libName}.h"`;
  },
  setVariable(key, code) {
    Blockly.Arduino.definitions_[`qbot_variale_${key}`] = `${code};`;
  },
  setupCode(key, code) {
    Blockly.Arduino.setups_[`qbot_setup_${key}`] = `${code};`;
  },
  setPinMode(pin, value) {
    this.setupCode(`pin_${pin}`, `pinMode(${pin}, ${value});`);
  },
  getInputFieldCode(block, key, defaultValue) {
    return (
      Blockly.Arduino.valueToCode(block, key, Blockly.Arduino.ORDER_ATOMIC) ||
      defaultValue
    );
  },
};

// 常量定义
const OUTPUT = "OUTPUT";
const INPUT = "INPUT";

/**
 * 输出块生成代码
 */
function generateCodeForOutputBlock(blockName) {
  Blockly.Arduino[blockName] = function () {
    const pin = this.getFieldValue("PIN");
    return [`analogRead(${pin})`, Blockly.Arduino.ORDER_ATOMIC];
  };
}

/**
 * 基础模块
 */

// 按键控制
generateCodeForOutputBlock("qbot_button_control");

// 蜂鸣器
Blockly.Arduino["qbot_buzzer"] = function () {
  const pin = this.getFieldValue("PIN");
  qbotBlockUtil.setPinMode(pin, OUTPUT);
  const status = this.getFieldValue("STATUS");
  return `digitalWrite(${pin}, ${status});\n`;
};

// 钢琴控制
Blockly.Arduino["qbot_piano_base"] = function () {
  qbotBlockUtil.include("piano", "QhBuzzer");
  const pin = this.getFieldValue("PIN");
  const variableName = `qbez_${pin}`;
  qbotBlockUtil.setVariable(`piano_${pin}`, `QhBuzzer ${variableName}(${pin})`);
  const pianoKey = this.getFieldValue("KEY_VALUE");
  const delayMs = qbotBlockUtil.getInputFieldCode(this, "DELAY_MS", 1000);
  return `${variableName}.play(${pianoKey}, ${delayMs});\n`;
};

// 舵机控制
Blockly.Arduino["qbot_servo_base"] = function () {
  qbotBlockUtil.include("servo", "Servo");
  const pin = this.getFieldValue("PIN");
  const variableName = `myservo_${pin}`;
  qbotBlockUtil.setVariable(`servo_${pin}`, `Servo ${variableName}`);
  qbotBlockUtil.setupCode(`servo_pin_${pin}`, `${variableName}.attach(${pin})`);
  const angle = this.getFieldValue("ANGEL");
  return `${variableName}.write(${angle});`;
};
// 超声波测距
Blockly.Arduino["qbot_ultrasonic_base"] = function () {
  qbotBlockUtil.include("utlrasonic", "QhUltrasonic");
  qbotBlockUtil.setVariable("ultrasonic", "QhUltrasonic qhUltrasonic");
  return [`qhUltrasonic.get_ultrasonic_value()`, Blockly.Arduino.ORDER_ATOMIC];
};
// 光强检测
generateCodeForOutputBlock("qbot_read_light_intensity");
// 获取循迹传感器值
generateCodeForOutputBlock("qbot_tracking");
// 读取模拟量
generateCodeForOutputBlock("qbot_read");

/**
 * 灯光控制
 */

// led 基础控制
Blockly.Arduino["qbot_led_base"] = function () {
  const pin = this.getFieldValue("PIN");
  qbotBlockUtil.setPinMode(pin, OUTPUT);
  const status = this.getFieldValue("STATUS");
  return `digitalWrite(${pin}, ${status});\n`;
};

// rgb 灯光控制
Blockly.Arduino["qbot_rgb_base"] = function () {
  qbotBlockUtil.include("rgb", "QhRGBled");
  qbotBlockUtil.setVariable("rgb", `QhRGBled qhRGBled`);
  const r = qbotBlockUtil.getInputFieldCode(this, "R", 120);
  const g = qbotBlockUtil.getInputFieldCode(this, "G", 120);
  const b = qbotBlockUtil.getInputFieldCode(this, "B", 120);
  return `qhRGBled.setRgbColor(${r}, ${g}, ${b});\n`;
};

/**
 * 运动控制
 */

// 小车运动控制
Blockly.Arduino["qbot_car_base"] = function () {
  qbotBlockUtil.include("car_motion", "QhMotionCtrl");
  qbotBlockUtil.setVariable("car_motion", `QhMotionCtrl qhMotionCtrl`);
  const speed = qbotBlockUtil.getInputFieldCode(this, "CAR_SPEED", 30);
  const dir = this.getFieldValue("DIR");
  return `qhMotionCtrl.setMotionDir(${dir});\nqhMotionCtrl.setMotionSpeed(${speed});\n`;
};
// 小车停止运动
Blockly.Arduino["qbot_car_pouse"] = function () {
  qbotBlockUtil.include("car_motion", "QhMotionCtrl");
  qbotBlockUtil.setVariable("car_motion", `QhMotionCtrl qhMotionCtrl`);
  return `qhMotionCtrl.setMotionDir(1);\nqhMotionCtrl.setMotionSpeed(0);\n`;
};

/********************************************
遥控 - 红外遥控 、 PS2-手柄遥控
*********************************************/
//红外接收模块
Blockly.Arduino["qbot_ir_recv"] = function () {
  var variable = Blockly.Arduino.variableDB_.getName(
    this.getFieldValue("VAR"),
    Blockly.Variables.NAME_TYPE
  );
  Blockly.Arduino.definitions_["var_declare" + variable] =
    "long " + variable + ";";
  var dropdown_pin = qbotBlockUtil.getInputFieldCode(this, "PIN");
  var branch = Blockly.Arduino.statementToCode(this, "DO");
  var branch2 = Blockly.Arduino.statementToCode(this, "DO2");
  Blockly.Arduino.variableDB_.getName(
    this.getFieldValue("VAR"),
    Blockly.Variables.NAME_TYPE
  );
  qbotBlockUtil.include("define_ir_recv", "IRremote");
  Blockly.Arduino.definitions_["var_ir_recv" + dropdown_pin] =
    "IRrecv irrecv_" +
    dropdown_pin +
    "(" +
    dropdown_pin +
    ");\ndecode_results results_" +
    dropdown_pin +
    ";\n";
  Blockly.Arduino.setups_["setup_ir_recv_" + dropdown_pin] =
    "irrecv_" + dropdown_pin + ".enableIRIn();";
  var code =
    "if (irrecv_" +
    dropdown_pin +
    ".decode(&results_" +
    dropdown_pin +
    ")) {\n";
  code += "  " + variable + "=results_" + dropdown_pin + ".value;\n";
  code += '  String type="UNKNOWN";\n';
  code +=
    '  String typelist[14]={"UNKNOWN", "NEC", "SONY", "RC5", "RC6", "DISH", "SHARP", "PANASONIC", "JVC", "SANYO", "MITSUBISHI", "SAMSUNG", "LG", "WHYNTER"};\n';
  code +=
    "  if(results_" +
    dropdown_pin +
    ".decode_type>=1&&results_" +
    dropdown_pin +
    ".decode_type<=13){\n";
  code += "    type=typelist[results_" + dropdown_pin + ".decode_type];\n";
  code += "  }\n";
  code += '  Serial.print("IR TYPE:"+type+"  ");\n';
  code += branch;
  code += "  irrecv_" + dropdown_pin + ".resume();\n";
  code += "} else {\n";
  code += branch2;
  code += "}\n";
  return code;
};

//红外mini遥控器键值
Blockly.Arduino["qbot_ir_val"] = function () {
  var code = this.getFieldValue("VAL");
  var order =
    code < 0
      ? Blockly.Arduino.ORDER_UNARY_PREFIX
      : Blockly.Arduino.ORDER_ATOMIC;
  return [code, order];
};

// PS2 Controller init
Blockly.Arduino["qbot_ps2_init"] = function () {
  qbotBlockUtil.include("qheduino", "qheduino");
  var PS2_DAT = qbotBlockUtil.getInputFieldCode(this, "PIN1", "10");
  var PS2_CMD = qbotBlockUtil.getInputFieldCode(this, "PIN2", "11");
  var PS2_CS = qbotBlockUtil.getInputFieldCode(this, "PIN3", "12");
  var PS2_CLK = qbotBlockUtil.getInputFieldCode(this, "PIN4", "13");

  Blockly.Arduino.definitions_["define_ps2_dat"] = "#define PS2_DAT " + PS2_DAT;
  Blockly.Arduino.definitions_["define_ps2_cmd"] = "#define PS2_CMD " + PS2_CMD;
  Blockly.Arduino.definitions_["define_ps2_cs"] = "#define PS2_CS " + PS2_CS;
  Blockly.Arduino.definitions_["define_ps2_clk"] = "#define PS2_CLK " + PS2_CLK;
  Blockly.Arduino.definitions_["var_ps2x"] = "PS2X ps2x;";
  Blockly.Arduino.setups_["setup_init_ps2"] =
    "ps2x.config_gamepad(PS2_CLK, PS2_CMD, PS2_CS, PS2_DAT, true, true);\n";
  return "";
};

// PS2 Controller button
Blockly.Arduino["qbot_ps2_btn"] = function () {
  var PS2_BTN = Blockly.Arduino.variableDB_.getName(
    this.getFieldValue("PS2_BTN"),
    Blockly.Variables.NAME_TYPE
  );
  var PS2_BTN_STATUS = Blockly.Arduino.variableDB_.getName(
    this.getFieldValue("PS2_BTN_STATUS"),
    Blockly.Variables.NAME_TYPE
  );
  var code = "ps2x." + PS2_BTN_STATUS + "(" + PS2_BTN + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// PS2 Controller Rocker
Blockly.Arduino["qbot_ps2_rocker"] = function () {
  var PS2_ROCKER_STATUS = Blockly.Arduino.variableDB_.getName(
    this.getFieldValue("PS2_ROCKER_STATUS"),
    Blockly.Variables.NAME_TYPE
  );
  var code = "ps2x.Analog(" + PS2_ROCKER_STATUS + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// PS2 Controller read analog value of the button  --- how hard you press the button
Blockly.Arduino["qbot_ps2_a_btn"] = function () {
  var PS2_A_BTN = this.getFieldValue("PS2_A_BTN");
  var code = "ps2x.Analog(" + PS2_A_BTN + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// PS2 Controller read controller and setmotor
Blockly.Arduino["qbot_ps2_readController_setMotor"] = function () {
  var PS2_Motor1 = this.getFieldValue("MOTOR1");
  var PS2_Motor2 = qbotBlockUtil.getInputFieldCode(this, "MOTOR2", "0");
  var code = "ps2x.read_gamepad(" + PS2_Motor1 + "," + PS2_Motor2 + ");\n";
  return code;
};

// 蓝牙是否有数据可读
Blockly.Arduino["qbot_bluetooth_available"] = function () {
  var code = "Serial.available() > 0";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 蓝牙读取字符串
Blockly.Arduino["qbot_bluetooth_readstr"] = function () {
  var code = "Serial.readString()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
// 蓝牙读取数据
Blockly.Arduino["qbot_bluetooth_read_data"] = function () {
  var code = "Serial.read()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
