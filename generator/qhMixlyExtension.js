'use strict';
goog.provide('Blockly.Arduino.QHMixlyExtend');
goog.require('Blockly.Arduino');
goog.require('Blockly.JavaScript');

/*********************
 * 常量定义
 ********************/
const OUTPUT = 'OUTPUT';
const INPUT = 'INPUT';

/*******************
 * utils
 *******************/
/**
 * 设置一组引脚
 * @param {Array} pinModeArray 引脚定义的数组 ep:[[9,'HIGH'],[10,'LOW']] 
 */
function setPinModeArray(pinModeArray) {
  pinModeArray.forEach(setPinMode);
}

/**
 * 设置单个引脚
 * @param {Array} pinMode 
 */
function setPinMode(pinMode) {
  let pinName = 'setup_output_' + pinMode[0];
  Blockly.Arduino.setups_[pinName] = 'pinMode(' + pinMode[0] + ', ' + pinMode[1] + ');';
}

/**
 * 定义块的代码生成器
 * @param {String} name 块名称
 * @param {Function} func 生成器函数
 */
function defineBlockGenerator(name, func) {
  Blockly.Arduino[name] = func;
}

/**
 * 库引入代码生成
 * @param {String} key 库定义所需键 
 * @param {String} libName 引入的库名称
 */
function defineInclude(key, libName) {
  Blockly.Arduino.definitions_[key] = '#include "' + libName + '"';
}

/**
 * 引入沁和库文件
 */
function importQH() {
  defineInclude('qh_include_qheduino', 'qheduino.h');
}

/**
 * 变量定义代码生成
 * @param {String} key 变量定义所需键 
 * @param {*} code 变量定义的代码
 */
function defineVariable(key, code) {
  Blockly.Arduino.definitions_[key] = code + ';';
}

/***************************
 * 灯光控制
 **************************/
// 运行指示灯: 引脚-9
defineBlockGenerator('qh_indicator_light', function() {
  setPinMode([9, OUTPUT]);
  var dropdown_mode = this.getFieldValue('MODE');
  var code = 'pinMode(9, ' + dropdown_mode + ');\n';
  return code;
});

// RGB 灯控制: r-10 g-9 b-11
defineBlockGenerator('qh_rgb_light', function() {
  setPinModeArray([
    [10, OUTPUT],
    [9, OUTPUT],
    [11, OUTPUT]
  ]);
  let code = 'digitalWrite(10, ' + this.getFieldValue('R') + ');\n' +
    'digitalWrite(9, ' + this.getFieldValue('G') + ');\n' +
    'digitalWrite(11, ' + this.getFieldValue('B') + ');\n';
  return code;
});

// 随机RGB灯光 : r-10 g-9 b-11
defineBlockGenerator('qh_random_rgb', function() {
  setPinModeArray([
    [9, OUTPUT],
    [10, OUTPUT],
    [11, OUTPUT]
  ]);
  Blockly.Arduino.setups_['random_seed'] = 'randomSeed(analogRead(0));';

  let code = 'digitalWrite(9, random(0,2));\n' +
    'digitalWrite(10, random(0,2));\n' +
    'digitalWrite(11, random(0,2));\n';
  return code;
});

/***************************
 * 基础模块
 **************************/
/**
 * 创建统一代码块 digitalRead
 * @param {Stirng} name 代码块名称
 */
function createDigitalReadGenerator(name) {
  defineBlockGenerator(name, function() {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'digitalRead(' + dropdown_pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  });
};

/**
 * 创建统一代码块 digitalWrite
 * @param {Stirng} name 代码块名称
 */
function createDigitalWriteGenerator(name) {
  defineBlockGenerator(name, function() {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_stat = Blockly.Arduino.valueToCode(this, 'STAT', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
    var code = 'digitalWrite(' + dropdown_pin + ',' + dropdown_stat + ');\n'
    return code;
  });
}

// 红外避障
createDigitalReadGenerator('qh_ir_evading');
// 红外循迹
createDigitalReadGenerator('qh_ir_tracking');
// 寻光
createDigitalReadGenerator('qh_light_seeking');
// 电压测量
createDigitalReadGenerator('qh_voltage_measurement');
// 蜂鸣器
createDigitalWriteGenerator('qh_buzzer');


// 超声波测距
defineBlockGenerator('qh_ultrasonic_ranging', function() {
  defineInclude('qh_include_qheduino', 'qheduino.h');
  defineVariable('qh_variable_SR04_13_12', 'SR04 SR04_13_12(13,12)');
  let code = 'SR04_13_12.DistanceAvg()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
});

// 舵机转动
defineBlockGenerator('qh_servo_angle', function() {
  let angle = Blockly.Arduino.valueToCode(this, 'angle', Blockly.Arduino.ORDER_ATOMIC) || 90;
  defineInclude('qh_servo_angle', 'Servo.h');
  defineVariable('qh_servo', 'Servo myservo');
  Blockly.Arduino.setups_['qh_attach_pin'] = 'myservo.attach(3);';
  let code = 'myservo.write(' + angle + ');\n';
  return code;
});

// 小车运动控制
defineBlockGenerator('qh_car_base_motion', function() {
  defineInclude('qh_include_qheduino', 'qheduino.h');
  let direction = this.getFieldValue('direction');
  let velocity = Blockly.Arduino.valueToCode(this, 'power', Blockly.Arduino.ORDER_ATOMIC);
  defineVariable('qh_car', 'CAR car(7,8,6,2,4,5)');
  let code = 'car.direction_speed_ctrl(' + direction + ', ' + velocity + ');\n';
  return code;
});

// 小车运动
function defineCarControlBlockGenerator(name) {
  defineBlockGenerator(name, function() {
    importQH();
    let direction = this.getQhValue('direction');
    let power = Blockly.Arduino.valueToCode(this, 'power', Blockly.Arduino.ORDER_ATOMIC);
    let secs = Blockly.Arduino.valueToCode(this, 'secs', Blockly.Arduino.ORDER_ATOMIC);
    defineVariable('qh_car', 'CAR car(7,8,6,2,4,5)');
    let code = 'car.direction_speed_ctrl(' + direction + ', ' + power + ');\n' +
      'delay(' + (parseInt(secs) * 1000) + ');\n';
    return code;
  });
}

defineCarControlBlockGenerator('qh_car_farword');
defineCarControlBlockGenerator('qh_car_backword');
defineCarControlBlockGenerator('qh_car_turn_left');
defineCarControlBlockGenerator('qh_car_turn_right');
defineCarControlBlockGenerator('qh_car_spin_left');
defineCarControlBlockGenerator('qh_car_spin_right');

// 小车停止运动
defineBlockGenerator('qh_car_pause', function() {
  importQH();
  defineVariable('qh_car', 'CAR car(7,8,6,2,4,5)');
  return 'car.direction_speed_ctrl(0, 0);\n'
});


/********************************************
遥控 - 红外遥控 、 PS2-手柄遥控
*********************************************/
//红外接收模块
defineBlockGenerator('yf_ir_recv', function() {
  var variable = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  Blockly.Arduino.definitions_['var_declare' + variable] = 'long ' + variable + ';';
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var branch2 = Blockly.Arduino.statementToCode(this, 'DO2');
  Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>';
  Blockly.Arduino.definitions_['var_ir_recv' + dropdown_pin] = 'IRrecv irrecv_' + dropdown_pin + '(' + dropdown_pin + ');\ndecode_results results_' + dropdown_pin + ';\n';
  Blockly.Arduino.setups_['setup_ir_recv_' + dropdown_pin] = 'irrecv_' + dropdown_pin + '.enableIRIn();';
  var code = "if (irrecv_" + dropdown_pin + ".decode(&results_" + dropdown_pin + ")) {\n"
  code += '  ' + variable + '=results_' + dropdown_pin + '.value;\n';
  code += '  String type="UNKNOWN";\n';
  code += '  String typelist[14]={"UNKNOWN", "NEC", "SONY", "RC5", "RC6", "DISH", "SHARP", "PANASONIC", "JVC", "SANYO", "MITSUBISHI", "SAMSUNG", "LG", "WHYNTER"};\n';
  code += '  if(results_' + dropdown_pin + '.decode_type>=1&&results_' + dropdown_pin + '.decode_type<=13){\n';
  code += '    type=typelist[results_' + dropdown_pin + '.decode_type];\n'
  code += '  }\n';
  code += '  Serial.print("IR TYPE:"+type+"  ");\n';
  code += branch;
  code += '  irrecv_' + dropdown_pin + '.resume();\n'
  code += '} else {\n';
  code += branch2;
  code += '}\n';
  return code;
});

//红外mini遥控器键值
defineBlockGenerator('yf_ir_val', function() {
  var code = (this.getFieldValue('VAL'));
  var order = code < 0 ?
    Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
  return [code, order];
});

// PS2 Controller init
defineBlockGenerator('yf_ps2_init', function() {
  var PS2_DAT = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC || '10');
  var PS2_CMD = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC || '11');
  var PS2_CS = Blockly.Arduino.valueToCode(this, 'PIN3', Blockly.Arduino.ORDER_ATOMIC || '12');
  var PS2_CLK = Blockly.Arduino.valueToCode(this, 'PIN4', Blockly.Arduino.ORDER_ATOMIC || '13');
  Blockly.Arduino.definitions_['include_ps2'] = '#include "PS2X_lib.h"';
  Blockly.Arduino.definitions_['define_ps2_dat'] = '#define PS2_DAT ' + PS2_DAT;
  Blockly.Arduino.definitions_['define_ps2_cmd'] = '#define PS2_CMD ' + PS2_CMD;
  Blockly.Arduino.definitions_['define_ps2_cs'] = '#define PS2_CS ' + PS2_CS;
  Blockly.Arduino.definitions_['define_ps2_clk'] = '#define PS2_CLK ' + PS2_CLK;
  Blockly.Arduino.definitions_['var_ps2x'] = 'PS2X ps2x;';
  Blockly.Arduino.setups_['setup_init_ps2'] = 'ps2x.config_gamepad(PS2_CLK, PS2_CMD, PS2_CS, PS2_DAT, true, true);\n';
  return '';
});

// PS2 Controller button
defineBlockGenerator('yf_ps2_btn', function() {
  var PS2_BTN = Blockly.Arduino.variableDB_.getName(this.getFieldValue('PS2_BTN'), Blockly.Variables.NAME_TYPE);
  var PS2_BTN_STATUS = Blockly.Arduino.variableDB_.getName(this.getFieldValue('PS2_BTN_STATUS'), Blockly.Variables.NAME_TYPE);
  var code = 'ps2x.' + PS2_BTN_STATUS + '(' + PS2_BTN + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
});

// PS2 Controller Rocker
defineBlockGenerator('yf_ps2_rocker', function() {
  var PS2_ROCKER_STATUS = Blockly.Arduino.variableDB_.getName(this.getFieldValue('PS2_ROCKER_STATUS'), Blockly.Variables.NAME_TYPE);
  var code = 'ps2x.Analog(' + PS2_ROCKER_STATUS + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
});

// PS2 Controller read analog value of the button  --- how hard you press the button
defineBlockGenerator('yf_ps2_a_btn', function() {
  var PS2_A_BTN = this.getFieldValue('PS2_A_BTN');
  var code = 'ps2x.Analog(' + PS2_A_BTN + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
});

// PS2 Controller read controller and setmotor
defineBlockGenerator('yf_ps2_readController_setMotor', function() {
  var PS2_Motor1 = this.getFieldValue('MOTOR1');
  var PS2_Motor2 = Blockly.Arduino.valueToCode(this, 'MOTOR2', Blockly.Arduino.ORDER_ATOMIC || '0');
  var code = 'ps2x.read_gamepad(' + PS2_Motor1 + ',' + PS2_Motor2 + ');\n'
  return code;
});

// 蓝牙是否有数据可读
defineBlockGenerator('qh_bluetooth_available', function() {
  var code = "Serial.available() > 0";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
});

// 蓝牙读取字符串
defineBlockGenerator('qh_bluetooth_readstr', function() {
  var code = "Serial.readString()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
});
// 蓝牙读取数据
defineBlockGenerator('qh_bluetooth_read_data', function() {
  var code = "Serial.read()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
});