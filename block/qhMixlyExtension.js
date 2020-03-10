"use strict";
goog.provide("Blockly.Blocks.QHMixlyExtension");
goog.require("Blockly.Blocks");

Blockly.qhColour = {};
/**********************************************
 * utils
 *********************************************/
/**
 * 生成高低电平的下拉项
 */
function createHightLowDropdwon() {
  const fieldDropdown = [
    [Blockly.MIXLY_ON, "HIGH"],
    [Blockly.MIXLY_OFF, "LOW"]
  ];
  return createDropDown(fieldDropdown);
}

/**
 * 创建下拉项
 * @param {Array} ItemArr 下拉项 [[item1,val1],[item2,val2]]
 */
function createDropDown(ItemArr) {
  return new Blockly.FieldDropdown(ItemArr);
}

/**
 * 块定义函数
 * @param {String} blockName 块名称 
 * @param {Function} initFunc 块初始化函数
 */
function defineBlock(blockName, initFunc) {
  Blockly.Blocks[blockName] = {
    init: initFunc,
    setQHValue: function(key, val) {
      this[key] = val;
    },
    getQhValue: function(key) {
      return this[key];
    },
    setDefault: function(tooltip) {
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
      this.setTooltip(tooltip);
    }
  }
}

/********************************************
 * 灯光模块
 *********************************************/

// 运行指示灯
defineBlock('qh_indicator_light', function() {
  this.setColour(Blockly.Blocks.base.HUE);
  this.appendDummyInput("")
    .appendField(Blockly.QH_INDICATOR_LIGHT_SWITCH)
    .appendField(createHightLowDropdwon(), "MODE");
  this.setDefault(Blockly.QH_TOOLTIP_INDICSTOR_LIGHT);
});

// RGB 灯控制
defineBlock('qh_rgb_light', function() {
  this.setColour(Blockly.Blocks.base.HUE);
  this.appendDummyInput('')
    .appendField(Blockly.QH_RGB_LIGHT_CHOOSE)
    .appendField(Blockly.QH_RGB_LIGHT_R)
    .appendField(createHightLowDropdwon(), 'R')
    .appendField(Blockly.QH_RGB_LIGHT_G)
    .appendField(createHightLowDropdwon(), 'G')
    .appendField(Blockly.QH_RGB_LIGHT_B)
    .appendField(createHightLowDropdwon(), 'B')
  this.setDefault(Blockly.QH_TOOLTIP_RGB_LIGHT);
});

// 随机rgb灯光
defineBlock('qh_random_rgb', function() {
  this.setColour(Blockly.Blocks.base.HUE);
  this.appendDummyInput('')
    .appendField(Blockly.QH_RGB_RANDOM)
  this.setDefault(Blockly.QH_TOOLTIP_RGB_RANDOM);
});

/********************************************
 * 基础模块
 *********************************************/
Blockly.qhColour.MODEL = '#2E8B57';
// 超声波测距
defineBlock('qh_ultrasonic_ranging', function() {
  this.setColour(Blockly.qhColour.MODEL);
  this.appendDummyInput('')
    .appendField(Blockly.QH_ULTRASONIC_RANGING);
  this.setOutput(true, Number);
  this.setInputsInline(true);
  this.setTooltip(Blockly.QH_TOOLTIP_ULTRASONIC_RANGING);
});

// 舵机转动
defineBlock('qh_servo_angle', function() {
  this.setColour(Blockly.qhColour.MODEL);
  this.appendValueInput('angle')
    .setCheck(Number)
    .appendField(Blockly.QH_SERVO_ANGLE);
  this.appendDummyInput('')
    .appendField(Blockly.QH_SERVO_ANGLE_UNIT);
  this.setDefault(Blockly.QH_TOOLTIP_SERVO_ANGLE);
});

/**
 * 创建通用快 digitalRead
 * @param {String} name 模块名称
 * @param {String} desc 描述
 */
function createDigitalReadBlock(name, desc) {
  defineBlock(name, function() {
    this.setColour(Blockly.qhColour.MODEL);
    this.appendDummyInput("")
      .appendField(desc)
    this.appendValueInput("PIN", Number)
      .appendField(Blockly.MIXLY_PIN)
      .setCheck(Number);
    this.setOutput(true, Boolean);
    this.setInputsInline(true);
    this.setTooltip(desc);
  });
}

/**
 * 创建通用快 digitalWrite
 * @param {String} name 模块名称
 * @param {String} desc 描述
 */
function createDigitalWriteBlock(name, desc) {
  defineBlock(name, function() {
    this.setColour(Blockly.qhColour.MODEL);
    this.appendDummyInput("")
      .appendField(desc)
    this.appendValueInput("PIN", Number)
      .appendField(Blockly.MIXLY_PIN)
      .setCheck(Number);
    this.appendValueInput("STAT")
      .appendField(Blockly.MIXLY_STAT)
      .setCheck([Number, Boolean]);
    this.setDefault(desc);
  });
}

// 红外避障
createDigitalReadBlock('qh_ir_evading', Blockly.QH_IR_EVADING);
// 红外循迹
createDigitalReadBlock('qh_ir_tracking', Blockly.QH_IR_TRACKING);
// 寻光
createDigitalReadBlock('qh_light_seeking', Blockly.QH_LIGHT_SEEKING);
// 电压测量
createDigitalReadBlock('qh_voltage_measurement', Blockly.QH_VOLTAGE_MEASUREMENT);
// 蜂鸣器
createDigitalWriteBlock('qh_buzzer', Blockly.QH_BUZZER);



/********************************************
 * 运动模块
 *********************************************/
Blockly.qhColour.MOTION = '#FFB6C1';
// 小车运动  0:刹车 1:前进 2:后退 3:左转 4:右转 5:原地左转 6:原地右转
defineBlock('qh_car_base_motion', function() {
  const selection = [
    [Blockly.QH_FORWARD, '1'],
    [Blockly.QH_BACKWARD, '2'],
    [Blockly.QH_TURN_LEFT, '3'],
    [Blockly.QH_TURN_RIGHT, '4'],
    [Blockly.QH_SPIN_RIGHT, '5'],
    [Blockly.QH_SPIN_RIGHT, '6']
  ];
  this.setColour(Blockly.qhColour.MOTION);
  this.appendValueInput('power')
    .setCheck(Number)
    .appendField(Blockly.QH_CAR_DIRECTION)
    .appendField(createDropDown(selection), 'direction')
    .appendField(Blockly.QH_VELOCITY);
  this.setDefault(Blockly.QH_TOOLTIP_CAR_MOTION);
});

// 定义不同方向的小车运动块
function defineCarControlBlock(blockName, dirVal, desc) {
  defineBlock(blockName, function() {
    this.setColour(Blockly.qhColour.MOTION);
    this.appendValueInput('power')
      .setCheck(Number)
      .appendField(desc);
    this.appendValueInput('secs')
      .setCheck(Number)
      .appendField(Blockly.QH_PERCENT)
      .appendField(Blockly.QH_MOVE);
    this.appendDummyInput('')
      .appendField(Blockly.QH_SECONDS);
    this.setDefault(Blockly.QH_TOOLTIP_CAR_CONTROL);
    this.setQHValue('direction', dirVal);
  });
}

defineCarControlBlock('qh_car_farword', '1', Blockly.QH_FARWORD_WITH_POWER);
defineCarControlBlock('qh_car_backword', '2', Blockly.QH_BACKWORD_WITH_POWER);
defineCarControlBlock('qh_car_turn_left', '3', Blockly.QH_TURN_LEFT_WITH_POWER);
defineCarControlBlock('qh_car_turn_right', '4', Blockly.QH_TURN_RIGHT_WITH_POWER);
defineCarControlBlock('qh_car_spin_left', '5', Blockly.QH_SPIN_LEFT_WITH_POWER);
defineCarControlBlock('qh_car_spin_right', '6', Blockly.QH_SPIN_RIGHT_WITH_POWER);

// 小车停止
defineBlock('qh_car_pause', function() {
  this.setColour(Blockly.qhColour.MOTION);
  this.appendDummyInput('')
    .appendField(Blockly.QH_CAR_PAUSE);
  this.setDefault(Blockly.QH_CAR_PAUSE);
});

/********************************************
遥控 - 红外遥控 、 PS2-手柄遥控
*********************************************/
Blockly.qhColour.REMOTE_CTL = '#47C5CA';
//红外接收模块
Blockly.Blocks.yf_ir_recv = {
  init: function() {
    this.setColour(Blockly.qhColour.REMOTE_CTL);
    this.appendDummyInput()
      .appendField(Blockly.MIXLY_YF_IR_RECEIVE)
      .appendField(" ")
      .appendField(new Blockly.FieldTextInput('ir_item'), 'VAR');
    this.appendValueInput("PIN", Number)
      .appendField(Blockly.MIXLY_PIN)
      .setCheck(Number);
    this.appendStatementInput('DO')
      .appendField(Blockly.MIXLY_IR_RECEIVE_YES);
    this.appendStatementInput('DO2')
      .appendField(Blockly.MIXLY_IR_RECEIVE_NO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_IR_RECIEVE_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};

//红外mini遥控器键值
var YF_IR_VAL = [
  [{ 'src': '../../media/qheduino/yf_ir_val/yf_ir_pow.png', 'width': 32, 'height': 32 }, '0xFFA25D'],
  [{ 'src': '../../media/qheduino/yf_ir_val/yf_ir_menu.png', 'width': 32, 'height': 32 }, '0xFFE21D'],
  [{ 'src': '../../media/qheduino/yf_ir_val/yf_ir_test.png', 'width': 32, 'height': 32 }, '0xFF22DD'],
  [{ 'src': '../../media/qheduino/yf_ir_val/yf_ir_+.png', 'width': 32, 'height': 32 }, '0xFF02FD'],
  [{ 'src': '../../media/qheduino/yf_ir_val/yf_ir_back.png', 'width': 32, 'height': 32 }, '0xFFC23D'],
  [{ 'src': '../../media/qheduino/yf_ir_val/yf_ir_rewind.png', 'width': 32, 'height': 32 }, '0xFFE01F'],
  [{ 'src': '../../media/qheduino/yf_ir_val/yf_ir_play.png', 'width': 32, 'height': 32 }, '0xFFA857'],
  [{ 'src': '../../media/qheduino/yf_ir_val/yf_ir_fastForward.png', 'width': 32, 'height': 32 }, '0xFF906F'],
  [{ 'src': '../../media/qheduino/yf_ir_val/yf_ir_0.png', 'width': 32, 'height': 32 }, '0xFF6897'],
  [{ 'src': '../../media/qheduino/yf_ir_val/yf_ir_-.png', 'width': 32, 'height': 32 }, '0xFF9867'],
  [{ 'src': '../../media/qheduino/yf_ir_val/yf_ir_c.png', 'width': 32, 'height': 32 }, '0xFFB04F'],
  [{ 'src': '../../media/qheduino/yf_ir_val/yf_ir_1.png', 'width': 32, 'height': 32 }, '0xFF30CF'],
  [{ 'src': '../../media/qheduino/yf_ir_val/yf_ir_2.png', 'width': 32, 'height': 32 }, '0xFF18E7'],
  [{ 'src': '../../media/qheduino/yf_ir_val/yf_ir_3.png', 'width': 32, 'height': 32 }, '0xFF7A85'],
  [{ 'src': '../../media/qheduino/yf_ir_val/yf_ir_4.png', 'width': 32, 'height': 32 }, '0xFF10EF'],
  [{ 'src': '../../media/qheduino/yf_ir_val/yf_ir_5.png', 'width': 32, 'height': 32 }, '0xFF38C7'],
  [{ 'src': '../../media/qheduino/yf_ir_val/yf_ir_6.png', 'width': 32, 'height': 32 }, '0xFF5AA5'],
  [{ 'src': '../../media/qheduino/yf_ir_val/yf_ir_7.png', 'width': 32, 'height': 32 }, '0xFF42BD'],
  [{ 'src': '../../media/qheduino/yf_ir_val/yf_ir_8.png', 'width': 32, 'height': 32 }, '0xFF4AB5'],
  [{ 'src': '../../media/qheduino/yf_ir_val/yf_ir_9.png', 'width': 32, 'height': 32 }, '0xFF52AD'],
];
Blockly.Blocks.yf_ir_val = {
  init: function() {
    this.setColour(Blockly.qhColour.REMOTE_CTL);
    this.appendDummyInput()
      .appendField(Blockly.MIXLY_YF_IR_VAL)
      .appendField(new Blockly.FieldDropdown(YF_IR_VAL), 'VAL');
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_IR_RECIEVE_TOOLTIP);
  }
};

// PS2 Controller init
Blockly.Blocks.yf_ps2_init = {
  init: function() {
    this.setColour(Blockly.qhColour.REMOTE_CTL);
    this.appendDummyInput("")
      .appendField(Blockly.MIXLY_YF_PS2)
      .appendField(new Blockly.FieldImage("../../media/qheduino/yf_ps2x.png", 60, 37))
      .appendField(Blockly.MIXLY_SETUP)
    this.appendValueInput("PIN1")
      .setCheck(Number).setAlign(Blockly.ALIGN_RIGHT)
      .appendField("DAT")
    this.appendValueInput("PIN2")
      .setCheck(Number).setAlign(Blockly.ALIGN_RIGHT)
      .appendField("CMD")
    this.appendValueInput("PIN3")
      .setCheck(Number).setAlign(Blockly.ALIGN_RIGHT)
      .appendField("CS")
    this.appendValueInput("PIN4")
      .setCheck(Number).setAlign(Blockly.ALIGN_RIGHT)
      .appendField("CLK")
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

//PS2手柄键值 - button 数字
var MIXLY_YF_PS2_BTN = [
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_start.png', 'width': 32, 'height': 20 }, 'PSB_START'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_select.png', 'width': 32, 'height': 21 }, 'PSB_SELECT'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_up.png', 'width': 52, 'height': 52 }, 'PSB_PAD_UP'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_right.png', 'width': 52, 'height': 52 }, 'PSB_PAD_RIGHT'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_left.png', 'width': 52, 'height': 52 }, 'PSB_PAD_LEFT'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_down.png', 'width': 52, 'height': 52 }, 'PSB_PAD_DOWN'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_cross.png', 'width': 32, 'height': 32 }, 'PSB_CROSS'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_circle.png', 'width': 32, 'height': 32 }, 'PSB_CIRCLE'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_square.png', 'width': 32, 'height': 32 }, 'PSB_SQUARE'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_triangle.png', 'width': 32, 'height': 32 }, 'PSB_TRIANGLE'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_l1.png', 'width': 73, 'height': 32 }, 'PSB_L1'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_r1.png', 'width': 73, 'height': 32 }, 'PSB_R1'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_l2.png', 'width': 73, 'height': 37 }, 'PSB_L2'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_r2.png', 'width': 73, 'height': 37 }, 'PSB_R2'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_l3.png', 'width': 48, 'height': 48 }, 'PSB_L3'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_r3.png', 'width': 48, 'height': 48 }, 'PSB_R3'],
];

const MIXLY_YF_PS2_BTN_STA = [
  [Blockly.MIXLY_YF_PSB_PRESSED, "ButtonPressed"],
  [Blockly.MIXLY_YF_PSB_RELEASED, "ButtonReleased"]
];

// PS2 Controller button 
defineBlock('yf_ps2_btn', function() {
  this.setColour(Blockly.qhColour.REMOTE_CTL);
  this.appendDummyInput("")
    .appendField(Blockly.MIXLY_YF_PS2_BUTTON)
    .appendField(new Blockly.FieldImage("../../media/qheduino/yf_ps2x.png", 60, 37))
    .appendField(new Blockly.FieldDropdown(MIXLY_YF_PS2_BTN), "PS2_BTN")
    .appendField(Blockly.MIXLY_YF_PS2_BTN_STATUS)
    .appendField(new Blockly.FieldDropdown(MIXLY_YF_PS2_BTN_STA), "PS2_BTN_STATUS");
  this.setOutput(true, Number);
  this.setInputsInline(true);
  this.setTooltip('');
});

//PS2手柄摇杆
const MIXLY_YF_PS2_ROCKER_STA = [
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_lx.png', 'width': 48, 'height': 48 }, 'PSS_LX'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_ly.png', 'width': 48, 'height': 48 }, 'PSS_LY'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_rx.png', 'width': 48, 'height': 48 }, 'PSS_RX'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_ry.png', 'width': 48, 'height': 48 }, 'PSS_RY'],
];

// PS2 Controller Rocker
defineBlock('yf_ps2_rocker', function() {
  this.setColour(Blockly.qhColour.REMOTE_CTL);
  this.appendDummyInput("")
    .appendField(Blockly.MIXLY_YF_PS2_ROCKER)
    .appendField(new Blockly.FieldImage("../../media/qheduino/yf_ps2x.png", 60, 37))
    .appendField(new Blockly.FieldDropdown(MIXLY_YF_PS2_ROCKER_STA), "PS2_ROCKER_STATUS");
  this.setOutput(true, Number);
  this.setInputsInline(true);
  this.setTooltip('');
});

//PS2手柄键值 - A button 模拟
const MIXLY_YF_PS2_A_BTN = [
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_up.png', 'width': 52, 'height': 52 }, 'PSAB_PAD_UP'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_right.png', 'width': 52, 'height': 52 }, 'PSAB_PAD_RIGHT'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_left.png', 'width': 52, 'height': 52 }, 'PSAB_PAD_LEFT'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_down.png', 'width': 52, 'height': 52 }, 'PSAB_PAD_DOWN'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_cross.png', 'width': 32, 'height': 32 }, 'PSAB_CROSS'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_circle.png', 'width': 32, 'height': 32 }, 'PSAB_CIRCLE'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_square.png', 'width': 32, 'height': 32 }, 'PSAB_SQUARE'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_triangle.png', 'width': 32, 'height': 32 }, 'PSAB_TRIANGLE'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_l1.png', 'width': 73, 'height': 32 }, 'PSB_L1'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_r1.png', 'width': 73, 'height': 32 }, 'PSB_R1'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_l2.png', 'width': 73, 'height': 37 }, 'PSB_L2'],
  [{ 'src': '../../media/qheduino/yf_ps2_val/yf_ps2_r2.png', 'width': 73, 'height': 37 }, 'PSB_R2'],
];

// PS2 Controller read analog value of the button  --- how hard you press the button
defineBlock('yf_ps2_a_btn', function() {
  this.setColour(Blockly.qhColour.REMOTE_CTL);
  this.appendDummyInput("")
    .appendField(Blockly.MIXLY_YF_PS2_A_BUTTON)
    .appendField(new Blockly.FieldImage("../../media/qheduino/yf_ps2x.png", 60, 37))
    .appendField(new Blockly.FieldDropdown(MIXLY_YF_PS2_A_BTN), "PS2_A_BTN");
  this.setOutput(true, Number);
  this.setInputsInline(true);
  this.setTooltip('');
});

// PS2 Controller read controller and setmotor
defineBlock('yf_ps2_readController_setMotor', function() {
  this.setColour(Blockly.qhColour.REMOTE_CTL);
  this.appendDummyInput("")
    .appendField(Blockly.MIXLY_YF_PS2)
    .appendField(new Blockly.FieldImage("../../media/qheduino/yf_ps2x.png", 60, 37))
    .appendField(Blockly.MIXLY_YF_PS2_R_MOTOR)
    .appendField("MOTOR1")
    .appendField(new Blockly.FieldDropdown([
      ["true", "true"],
      ["false", "false"]
    ]), "MOTOR1");
  this.appendValueInput("MOTOR2")
    .setCheck(Number).setAlign(Blockly.ALIGN_RIGHT)
    .appendField("MOTOR2");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
});

// 蓝牙是否有可读数据
defineBlock('qh_bluetooth_available', function() {
  this.setColour(Blockly.qhColour.REMOTE_CTL);
  this.appendDummyInput()
    .appendField(Blockly.QH_BLUETOOTH_AVAILABLE);
  this.setOutput(true, Boolean);
  this.setTooltip(Blockly.QH_BLUETOOTH_AVAILABLE);
});

// 蓝牙读取字符串
defineBlock('qh_bluetooth_readstr', function() {
  this.setColour(Blockly.qhColour.REMOTE_CTL);
  this.appendDummyInput()
    .appendField(Blockly.QH_BLUETOOTH_READ_STRING);
  this.setOutput(true, String);
  this.setTooltip(Blockly.QH_BLUETOOTH_READ_STRING);
});

// 蓝牙读取字符串
defineBlock('qh_bluetooth_read_data', function() {
  this.setColour(Blockly.qhColour.REMOTE_CTL);
  this.appendDummyInput()
    .appendField(Blockly.QH_BLUETOOTH_READ_DATA);
  this.setOutput(true, String);
  this.setTooltip(Blockly.QH_BLUETOOTH_READ_DATA);
});