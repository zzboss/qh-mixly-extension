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
  Blockly.Arduino['qh_' + name] = func;
}

/**
 * 库引入代码生成
 * @param {String} key 库定义所需键 
 * @param {String} libName 引入的库名称
 */
function defineInclude(key, libName) {
  Blockly.Arduino.definitions_['qh_' + key] = '#include "' + libName + '.h"';
}

/**
 * 引入沁和库文件
 */
function importQH() {
  defineInclude('include_qheduino', 'qheduino');
}

/**
 * 变量定义代码生成
 * @param {String} key 变量定义所需键 
 * @param {*} code 变量定义的代码
 */
function defineVariable(key, code) {
  Blockly.Arduino.definitions_['qh_' + key] = code + ';';
}

/**
 * 
 * @param {String} key setup 定义所需键
 * @param {String} code 设置部分的一行代码
 */
function defineSetUp(key, code) {
  Blockly.Arduino.setups_['qh_' + key] = code + ';';
}

/**
 * 获取接入块的返回值，需要配合call/apply改变this指向
 * 优先级为ORDER_ATOMIC时可使用
 * @param {String} key code变量名 
 */
function qhValueToCode(key, defaultVal) {
  return Blockly.Arduino.valueToCode(this, key, Blockly.Arduino.ORDER_ATOMIC) || defaultVal;
}

/***************************
 * 灯光控制
 **************************/
// 运行指示灯: 引脚-9
defineBlockGenerator('indicator_light', function() {
  setPinMode([9, OUTPUT]);
  var dropdown_mode = this.getFieldValue('MODE');
  var code = 'pinMode(9, ' + dropdown_mode + ');\n';
  return code;
});

// RGB 灯控制: r-10 g-9 b-11
defineBlockGenerator('rgb_light', function() {
  setPinModeArray([
    [10, OUTPUT],
    [9, OUTPUT],
    [11, OUTPUT]
  ]);
  let code = `digitalWrite(10, ${this.getFieldValue('R')});
digitalWrite(9, ${this.getFieldValue('G')}); 
digitalWrite(11,${this.getFieldValue('B')});`;
  return code;
});

// rgb 灯光值控制
defineBlockGenerator('rgb_control', function() {
  defineInclude('include_fast_led', 'FastLED');
  defineVariable('fast_led', 'CRGB leds[6]');
  defineSetUp('setup_fastled', 'FastLED.addLeds<NEOPIXEL, 12>(leds, 6)');
  let r = qhValueToCode.call(this, 'R', '0');
  let g = qhValueToCode.call(this, 'G', '0');
  let b = qhValueToCode.call(this, 'B', '0');
  return `LEDS.showColor(CRGB(${r}, ${g}, ${b}));\n`;
})

// 随机RGB灯光 : r-10 g-9 b-11
defineBlockGenerator('random_rgb', function() {
  setPinModeArray([
    [9, OUTPUT],
    [10, OUTPUT],
    [11, OUTPUT]
  ]);
  defineSetUp('random_seed', 'randomSeed(analogRead(0))');

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
    var dropdown_pin = qhValueToCode.call(this, 'PIN');
    defineSetUp('setup_input_' + dropdown_pin, 'pinMode(' + dropdown_pin + ', INPUT)');
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
    var dropdown_pin = qhValueToCode.call(this, 'PIN');
    var dropdown_stat = qhValueToCode.call(this, 'STAT');
    defineSetUp('setup_output_' + dropdown_pin, 'pinMode(' + dropdown_pin + ', OUTPUT)');
    var code = 'digitalWrite(' + dropdown_pin + ',' + dropdown_stat + ');\n'
    return code;
  });
}

// 红外避障
createDigitalReadGenerator('ir_evading');
// 红外循迹
createDigitalReadGenerator('ir_tracking');
// 寻光
createDigitalReadGenerator('light_seeking');
// 控制按键
createDigitalReadGenerator('control_key');
// 蜂鸣器
createDigitalWriteGenerator('buzzer');
// 电压测量
defineBlockGenerator('voltage_measurement', function() {
  var dropdown_pin = qhValueToCode.call(this, 'PIN');
  defineSetUp('setup_input_' + dropdown_pin, 'pinMode(' + dropdown_pin + ', INPUT)');
  var code = 'analogRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
});


// 超声波测距
defineBlockGenerator('ultrasonic_ranging', function() {
  importQH();
  defineVariable('sr04_13_12', 'SR04 SR04_13_12(13,12)');
  let code = 'SR04_13_12.DistanceAvg()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
});

// rgb超声波测距
defineBlockGenerator('rgb_ultrasonic', function() {
  defineSetUp('serial_begin', 'Serial.begin(115200)');
  let code =
    `float qh_rgb_getDistance(){
  pinMode(13, OUTPUT); 
  digitalWrite(13, LOW);  
  delayMicroseconds(2);         
  digitalWrite(13, HIGH);  
  delayMicroseconds(10);        
  digitalWrite(13, LOW);   
  pinMode(13, INPUT); 
  return pulseIn(13, HIGH);
}`;
  defineVariable('rgb_getDistance', code);
  return ['qh_rgb_getDistance()', Blockly.Arduino.ORDER_ATOMIC];
});

// 舵机转动
defineBlockGenerator('servo_angle', function() {
  let angle = qhValueToCode.call(this, 'angle', 90);
  defineInclude('servo_angle', 'Servo');
  defineVariable('servo', 'Servo myservo');
  defineSetUp('attach_pin', 'myservo.attach(3)');
  let code = 'myservo.write(' + angle + ');\n';
  return code;
});

// 小车运动控制
defineBlockGenerator('car_base_motion', function() {
  importQH();
  let direction = this.getFieldValue('direction');
  let velocity = qhValueToCode.call(this, 'power', 50);
  defineVariable('car', 'CAR car(8,7,6,2,4,5)');
  let code = 'car.direction_speed_ctrl(' + direction + ', ' + velocity + ');\n';
  return code;
});

// 小车运动
function defineCarControlBlockGenerator(name) {
  defineBlockGenerator(name, function() {
    importQH();
    let direction = this.getQhValue('direction');
    let power = qhValueToCode.call(this, 'power', 50);
    let secs = qhValueToCode.call(this, 'secs', 1);
    defineVariable('car', 'CAR car(8,7,6,2,4,5)');
    let code = 'car.direction_speed_ctrl(' + direction + ', ' + power + ');\n' +
      'delay(' + (parseInt(secs) * 1000) + ');\n';
    return code;
  });
}

defineCarControlBlockGenerator('car_farword');
defineCarControlBlockGenerator('car_backword');
defineCarControlBlockGenerator('car_turn_left');
defineCarControlBlockGenerator('car_turn_right');
defineCarControlBlockGenerator('car_spin_left');
defineCarControlBlockGenerator('car_spin_right');

// 小车停止运动
defineBlockGenerator('car_pause', function() {
  importQH();
  defineVariable('car', 'CAR car(8,7,6,2,4,5)');
  return 'car.direction_speed_ctrl(0, 0);\n'
});


/********************************************
遥控 - 红外遥控 、 PS2-手柄遥控
*********************************************/
//红外接收模块
defineBlockGenerator('ir_recv', function() {
  var variable = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  Blockly.Arduino.definitions_['var_declare' + variable] = 'long ' + variable + ';';
  var dropdown_pin = qhValueToCode.call(this, 'PIN');
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var branch2 = Blockly.Arduino.statementToCode(this, 'DO2');
  Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),Blockly.Variables.NAME_TYPE);
  defineInclude('define_ir_recv', 'IRremote');
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
defineBlockGenerator('ir_val', function() {
  var code = (this.getFieldValue('VAL'));
  var order = code < 0 ?
    Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
  return [code, order];
});

// PS2 Controller init
defineBlockGenerator('ps2_init', function() {
  importQH();
  var PS2_DAT = qhValueToCode.call(this, 'PIN1', '10');
  var PS2_CMD = qhValueToCode.call(this, 'PIN2', '11');
  var PS2_CS = qhValueToCode.call(this, 'PIN3', '12');
  var PS2_CLK = qhValueToCode.call(this, 'PIN4', '13');

  Blockly.Arduino.definitions_['define_ps2_dat'] = '#define PS2_DAT ' + PS2_DAT;
  Blockly.Arduino.definitions_['define_ps2_cmd'] = '#define PS2_CMD ' + PS2_CMD;
  Blockly.Arduino.definitions_['define_ps2_cs'] = '#define PS2_CS ' + PS2_CS;
  Blockly.Arduino.definitions_['define_ps2_clk'] = '#define PS2_CLK ' + PS2_CLK;
  Blockly.Arduino.definitions_['var_ps2x'] = 'PS2X ps2x;';
  Blockly.Arduino.setups_['setup_init_ps2'] = 'ps2x.config_gamepad(PS2_CLK, PS2_CMD, PS2_CS, PS2_DAT, true, true);\n';
  return '';
});

// PS2 Controller button
defineBlockGenerator('ps2_btn', function() {
  var PS2_BTN = Blockly.Arduino.variableDB_.getName(this.getFieldValue('PS2_BTN'), Blockly.Variables.NAME_TYPE);
  var PS2_BTN_STATUS = Blockly.Arduino.variableDB_.getName(this.getFieldValue('PS2_BTN_STATUS'), Blockly.Variables.NAME_TYPE);
  var code = 'ps2x.' + PS2_BTN_STATUS + '(' + PS2_BTN + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
});

// PS2 Controller Rocker
defineBlockGenerator('ps2_rocker', function() {
  var PS2_ROCKER_STATUS = Blockly.Arduino.variableDB_.getName(this.getFieldValue('PS2_ROCKER_STATUS'), Blockly.Variables.NAME_TYPE);
  var code = 'ps2x.Analog(' + PS2_ROCKER_STATUS + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
});

// PS2 Controller read analog value of the button  --- how hard you press the button
defineBlockGenerator('ps2_a_btn', function() {
  var PS2_A_BTN = this.getFieldValue('PS2_A_BTN');
  var code = 'ps2x.Analog(' + PS2_A_BTN + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
});

// PS2 Controller read controller and setmotor
defineBlockGenerator('ps2_readController_setMotor', function() {
  var PS2_Motor1 = this.getFieldValue('MOTOR1');
  var PS2_Motor2 = qhValueToCode.call(this, 'MOTOR2', '0');
  var code = 'ps2x.read_gamepad(' + PS2_Motor1 + ',' + PS2_Motor2 + ');\n'
  return code;
});

// 蓝牙是否有数据可读
defineBlockGenerator('bluetooth_available', function() {
  var code = "Serial.available() > 0";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
});

// 蓝牙读取字符串
defineBlockGenerator('bluetooth_readstr', function() {
  var code = "Serial.readString()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
});
// 蓝牙读取数据
defineBlockGenerator('bluetooth_read_data', function() {
  var code = "Serial.read()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
});