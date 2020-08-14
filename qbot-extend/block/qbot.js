"use strict";
goog.provide("Blockly.Blocks.QHMixlyExtension");
goog.require("Blockly.Blocks");

// led 控制模块颜色
const colour_led_control = "#e67e22";
const colour_base_model = "#3498db";
const colour_car_motion = "#079992";
const colour_remote_ctl = "#47C5CA";

// 默认变量加载
const qbotProfile = profile["Arduino/Genuino Uno"];

// 创建管脚下拉项
function createQbotPinDropdown() {
  return new Blockly.FieldDropdown(qbotProfile.digital);
}

// 创建高低电平下拉项
function createQbotHighLowDropDown() {
  return new Blockly.FieldDropdown([
    [Blockly.MIXLY_HIGH, "HIGH"],
    [Blockly.MIXLY_LOW, "LOW"],
  ]);
}

// 创建琴键下拉项
function createPianoKeysDropDown() {
  return new Blockly.FieldDropdown([
    ["do", "1"],
    ["#do", "11"],
    ["re", "2"],
    ["#re", "12"],
    ["mi", "3"],
    ["fa", "4"],
    ["#fa", "13"],
    ["so", "5"],
    ["#so", "14"],
    ["la", "6"],
    ["#la", "15"],
    ["si", "7"],
  ]);
}

// 创建小车运动下拉项
function createMotionDropDown() {
  return new Blockly.FieldDropdown([
    ["向上", "1"],
    ["向下", "2"],
    ["向左", "3"],
    ["向右", "4"],
  ]);
}

// qbot block 常用块创建函数
function createQbotBlock(initFunc, colour, tip) {
  return {
    init: function () {
      initFunc.call(this);
      this.setColour(colour);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
      this.setTooltip(tip);
    },
  };
}

// qbot block 输出块创建函数(指定管脚读取数据)
function createQbotReadBlock(blockName, desc, colour, tip) {
  Blockly.Blocks[blockName] = {
    init: function () {
      this.appendDummyInput()
        .appendField(`${desc} 管脚#`)
        .appendField(createQbotPinDropdown(), "PIN");
      this.setColour(colour);
      this.setOutput(true, Number);
      this.setInputsInline(true);
      this.setTooltip(tip || desc);
    },
  };
}

/**
 * 基础模块
 */

// 按键控制
createQbotReadBlock("qbot_button_control", "按键控制", colour_base_model);
createQbotReadBlock("qbot_read_light_intensity", "光强检测", colour_base_model);

// 蜂鸣器控制
Blockly.Blocks["qbot_buzzer"] = createQbotBlock(
  function () {
    this.appendDummyInput()
      .appendField("蜂鸣器 管脚#")
      .appendField(createQbotPinDropdown(), "PIN")
      .appendField("设为#")
      .appendField(createQbotHighLowDropDown(), "STATUS");
  },
  colour_base_model,
  "蜂鸣器控制"
);

// 钢琴控制
Blockly.Blocks["qbot_piano_base"] = createQbotBlock(
  function () {
    this.appendDummyInput()
      .appendField("钢琴管脚#")
      .appendField(createQbotPinDropdown(), "PIN")
      .appendField("点击琴键#")
      .appendField(createPianoKeysDropDown(), "KEY_VALUE");
    this.appendValueInput("DELAY_MS").appendField("持续#").setCheck(Number);
    this.appendDummyInput().appendField("ms");
  },
  colour_base_model,
  "发出钢琴音"
);

// 舵机控制
Blockly.Blocks["qbot_servo_base"] = createQbotBlock(
  function () {
    this.appendDummyInput()
      .appendField("舵机管脚#")
      .appendField(createQbotPinDropdown(), "PIN")
      .appendField("旋转")
      .appendField(new Blockly.FieldAngle(90), "ANGEL")
      .appendField("°");
  },
  colour_base_model,
  "控制舵机转动角度"
);

// 超声波测距
Blockly.Blocks["qbot_ultrasonic_base"] = {
  init: function () {
    this.appendDummyInput().appendField("读取超声波测距值");
    this.setColour(colour_base_model);
    this.setOutput(true, Number);
    this.setInputsInline(true);
    this.setTooltip("超声波测距值读取");
  },
};

// 获取循迹传感器值
Blockly.Blocks["qbot_tracking"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("读取")
      .appendField(
        new Blockly.FieldDropdown([
          ["左", "A1"],
          ["右", "A0"],
        ]),
        "PIN"
      )
      .appendField("传感器值");
    this.setColour(colour_base_model);
    this.setOutput(true, Number);
    this.setInputsInline(true);
    this.setTooltip("读取循迹传感器值");
  },
};

/**
 * 灯光控制模块
 */

// led 基础控制
Blockly.Blocks["qbot_led_base"] = createQbotBlock(
  function () {
    this.appendDummyInput("")
      .appendField("LED 管脚# ")
      .appendField(createQbotPinDropdown(), "PIN")
      .appendField("设为#")
      .appendField(createQbotHighLowDropDown(), "STATUS");
  },
  colour_led_control,
  "控制指定管脚的led亮/灭"
);

// rgb 灯光控制
Blockly.Blocks["qbot_rgb_base"] = createQbotBlock(
  function () {
    this.appendDummyInput().appendField("RGB 灯光值设置");
    this.appendValueInput("R").setCheck(Number).appendField("R");
    this.appendValueInput("G").setCheck(Number).appendField("G");
    this.appendValueInput("B").setCheck(Number).appendField("B");
  },
  colour_led_control,
  "控制RGB灯光的色值"
);

/**
 * 运动控制
 */

// 小车运动
Blockly.Blocks["qbot_car_base"] = createQbotBlock(
  function () {
    this.appendDummyInput().appendField("小车以速度");
    this.appendValueInput("CAR_SPEED").setCheck(Number);
    this.appendDummyInput()
      .appendField("%")
      .appendField(createMotionDropDown(), "DIR")
      .appendField("运动");
  },
  colour_car_motion,
  "小车运动控制"
);

// 小车停止运动
Blockly.Blocks["qbot_car_pouse"] = createQbotBlock(
  function () {
    this.appendDummyInput().appendField("小车停止运动");
  },
  colour_car_motion,
  "小车停止运动"
);

/********************************************
遥控 - 红外遥控 、 PS2-手柄遥控
*********************************************/

//红外接收模块
Blockly.Blocks["qbot_ir_recv"] = {
  init: function () {
    this.setColour(colour_remote_ctl);
    this.appendDummyInput()
      .appendField(Blockly.MIXLY_YF_IR_RECEIVE)
      .appendField(" ")
      .appendField(new Blockly.FieldTextInput("ir_item"), "VAR");
    this.appendValueInput("PIN", Number)
      .appendField(Blockly.MIXLY_PIN)
      .setCheck(Number);
    this.appendStatementInput("DO").appendField(Blockly.MIXLY_IR_RECEIVE_YES);
    this.appendStatementInput("DO2").appendField(Blockly.MIXLY_IR_RECEIVE_NO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_IR_RECIEVE_TOOLTIP);
  },
  getVars: function () {
    return [this.getFieldValue("VAR")];
  },
  renameVar: function (oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue("VAR"))) {
      this.setTitleValue(newName, "VAR");
    }
  },
};

//红外mini遥控器键值
var YF_IR_VAL = [
  [
    {
      src: "../../media/qbot/yf_ir_val/yf_ir_pow.png",
      alt: "qh_ir_pow",
      width: 32,
      height: 32,
    },
    "0xFFA25D",
  ],
  [
    {
      src: "../../media/qbot/yf_ir_val/yf_ir_menu.png",
      alt: "qh_ir_menu",
      width: 32,
      height: 32,
    },
    "0xFFE21D",
  ],
  [
    {
      src: "../../media/qbot/yf_ir_val/yf_ir_test.png",
      alt: "qh_ir_test",
      width: 32,
      height: 32,
    },
    "0xFF22DD",
  ],
  [
    {
      src: "../../media/qbot/yf_ir_val/yf_ir_+.png",
      alt: "qh_ir_",
      width: 32,
      height: 32,
    },
    "0xFF02FD",
  ],
  [
    {
      src: "../../media/qbot/yf_ir_val/yf_ir_back.png",
      alt: "qh_ir_back",
      width: 32,
      height: 32,
    },
    "0xFFC23D",
  ],
  [
    {
      src: "../../media/qbot/yf_ir_val/yf_ir_rewind.png",
      alt: "qh_ir_rewind",
      width: 32,
      height: 32,
    },
    "0xFFE01F",
  ],
  [
    {
      src: "../../media/qbot/yf_ir_val/yf_ir_play.png",
      alt: "qh_ir_play",
      width: 32,
      height: 32,
    },
    "0xFFA857",
  ],
  [
    {
      src: "../../media/qbot/yf_ir_val/yf_ir_fastForward.png",
      alt: "qh_ir_fastForward",
      width: 32,
      height: 32,
    },
    "0xFF906F",
  ],
  [
    {
      src: "../../media/qbot/yf_ir_val/yf_ir_0.png",
      alt: "qh_ir_0",
      width: 32,
      height: 32,
    },
    "0xFF6897",
  ],
  [
    {
      src: "../../media/qbot/yf_ir_val/yf_ir_-.png",
      alt: "qh_ir_-",
      width: 32,
      height: 32,
    },
    "0xFF9867",
  ],
  [
    {
      src: "../../media/qbot/yf_ir_val/yf_ir_c.png",
      alt: "qh_ir_c",
      width: 32,
      height: 32,
    },
    "0xFFB04F",
  ],
  [
    {
      src: "../../media/qbot/yf_ir_val/yf_ir_1.png",
      alt: "qh_ir_1",
      width: 32,
      height: 32,
    },
    "0xFF30CF",
  ],
  [
    {
      src: "../../media/qbot/yf_ir_val/yf_ir_2.png",
      alt: "qh_ir_2",
      width: 32,
      height: 32,
    },
    "0xFF18E7",
  ],
  [
    {
      src: "../../media/qbot/yf_ir_val/yf_ir_3.png",
      alt: "qh_ir_3",
      width: 32,
      height: 32,
    },
    "0xFF7A85",
  ],
  [
    {
      src: "../../media/qbot/yf_ir_val/yf_ir_4.png",
      alt: "qh_ir_4",
      width: 32,
      height: 32,
    },
    "0xFF10EF",
  ],
  [
    {
      src: "../../media/qbot/yf_ir_val/yf_ir_5.png",
      alt: "qh_ir_5",
      width: 32,
      height: 32,
    },
    "0xFF38C7",
  ],
  [
    {
      src: "../../media/qbot/yf_ir_val/yf_ir_6.png",
      alt: "qh_ir_6",
      width: 32,
      height: 32,
    },
    "0xFF5AA5",
  ],
  [
    {
      src: "../../media/qbot/yf_ir_val/yf_ir_7.png",
      alt: "qh_ir_7",
      width: 32,
      height: 32,
    },
    "0xFF42BD",
  ],
  [
    {
      src: "../../media/qbot/yf_ir_val/yf_ir_8.png",
      alt: "qh_ir_8",
      width: 32,
      height: 32,
    },
    "0xFF4AB5",
  ],
  [
    {
      src: "../../media/qbot/yf_ir_val/yf_ir_9.png",
      alt: "qh_ir_9",
      width: 32,
      height: 32,
    },
    "0xFF52AD",
  ],
];
Blockly.Blocks["qbot_ir_val"] = {
  init: function () {
    this.setColour(colour_remote_ctl);
    this.appendDummyInput()
      .appendField(Blockly.MIXLY_YF_IR_VAL)
      .appendField(new Blockly.FieldDropdown(YF_IR_VAL), "VAL");
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_IR_RECIEVE_TOOLTIP);
  },
};

// PS2 Controller init
Blockly.Blocks["qbot_ps2_init"] = {
  init: function () {
    this.setColour(colour_remote_ctl);
    this.appendDummyInput("")
      .appendField(Blockly.MIXLY_YF_PS2)
      .appendField(
        new Blockly.FieldImage("../../media/qbot/yf_ps2x.png", 60, 37)
      )
      .appendField(Blockly.MIXLY_SETUP);
    this.appendValueInput("PIN1")
      .setCheck(Number)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("DAT");
    this.appendValueInput("PIN2")
      .setCheck(Number)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("CMD");
    this.appendValueInput("PIN3")
      .setCheck(Number)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("CS");
    this.appendValueInput("PIN4")
      .setCheck(Number)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("CLK");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
};

//PS2手柄键值 - button 数字
var MIXLY_YF_PS2_BTN = [
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_start.png",
      width: 32,
      height: 20,
      alt: "qh_ps2_start",
    },
    "PSB_START",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_select.png",
      width: 32,
      height: 21,
      alt: "qh_ps2_select",
    },
    "PSB_SELECT",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_up.png",
      width: 52,
      height: 52,
      alt: "qh_ps2_up",
    },
    "PSB_PAD_UP",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_right.png",
      width: 52,
      height: 52,
      alt: "qh_ps2_right",
    },
    "PSB_PAD_RIGHT",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_left.png",
      width: 52,
      height: 52,
      alt: "qh_ps2_left",
    },
    "PSB_PAD_LEFT",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_down.png",
      width: 52,
      height: 52,
      alt: "qh_ps2_down",
    },
    "PSB_PAD_DOWN",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_cross.png",
      width: 32,
      height: 32,
      alt: "qh_ps2_cross",
    },
    "PSB_CROSS",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_circle.png",
      width: 32,
      height: 32,
      alt: "qh_ps2_circle",
    },
    "PSB_CIRCLE",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_square.png",
      width: 32,
      height: 32,
      alt: "qh_ps2_square",
    },
    "PSB_SQUARE",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_triangle.png",
      width: 32,
      height: 32,
      alt: "qh_ps2_triangle",
    },
    "PSB_TRIANGLE",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_l1.png",
      width: 73,
      height: 32,
      alt: "qh_ps2_l1",
    },
    "PSB_L1",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_r1.png",
      width: 73,
      height: 32,
      alt: "qh_ps2_r1",
    },
    "PSB_R1",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_l2.png",
      width: 73,
      height: 37,
      alt: "qh_ps2_l2",
    },
    "PSB_L2",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_r2.png",
      width: 73,
      height: 37,
      alt: "qh_ps2_r2",
    },
    "PSB_R2",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_l3.png",
      width: 48,
      height: 48,
      alt: "qh_ps2_l3",
    },
    "PSB_L3",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_r3.png",
      width: 48,
      height: 48,
      alt: "qh_ps2_r3",
    },
    "PSB_R3",
  ],
];

const MIXLY_YF_PS2_BTN_STA = [
  [Blockly.MIXLY_YF_PSB_PRESSED, "ButtonPressed"],
  [Blockly.MIXLY_YF_PSB_RELEASED, "ButtonReleased"],
];

// PS2 Controller button
Blockly.Blocks["qbot_ps2_btn"] = {
  init: function () {
    this.setColour(colour_remote_ctl);
    this.appendDummyInput("")
      .appendField(Blockly.MIXLY_YF_PS2_BUTTON)
      .appendField(
        new Blockly.FieldImage("../../media/qbot/yf_ps2x.png", 60, 37)
      )
      .appendField(new Blockly.FieldDropdown(MIXLY_YF_PS2_BTN), "PS2_BTN")
      .appendField(Blockly.MIXLY_YF_PS2_BTN_STATUS)
      .appendField(
        new Blockly.FieldDropdown(MIXLY_YF_PS2_BTN_STA),
        "PS2_BTN_STATUS"
      );
    this.setOutput(true, Number);
    this.setInputsInline(true);
    this.setTooltip("");
  },
};

//PS2手柄摇杆
const MIXLY_YF_PS2_ROCKER_STA = [
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_lx.png",
      width: 48,
      height: 48,
      alt: "qh_ps2_lx",
    },
    "PSS_LX",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_ly.png",
      width: 48,
      height: 48,
      alt: "qh_ps2_ly",
    },
    "PSS_LY",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_rx.png",
      width: 48,
      height: 48,
      alt: "qh_ps2_rx",
    },
    "PSS_RX",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_ry.png",
      width: 48,
      height: 48,
      alt: "qh_ps2_ry",
    },
    "PSS_RY",
  ],
];

// PS2 Controller Rocker
Blockly.Blocks["qbot_ps2_rocker"] = {
  init: function () {
    this.setColour(colour_remote_ctl);
    this.appendDummyInput("")
      .appendField(Blockly.MIXLY_YF_PS2_ROCKER)
      .appendField(
        new Blockly.FieldImage("../../media/qbot/yf_ps2x.png", 60, 37)
      )
      .appendField(
        new Blockly.FieldDropdown(MIXLY_YF_PS2_ROCKER_STA),
        "PS2_ROCKER_STATUS"
      );
    this.setOutput(true, Number);
    this.setInputsInline(true);
    this.setTooltip("");
  },
};
//PS2手柄键值 - A button 模拟
const MIXLY_YF_PS2_A_BTN = [
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_up.png",
      width: 52,
      height: 52,
      alt: "qh_ps2_up",
    },
    "PSAB_PAD_UP",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_right.png",
      width: 52,
      height: 52,
      alt: "qh_ps2_right",
    },
    "PSAB_PAD_RIGHT",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_left.png",
      width: 52,
      height: 52,
      alt: "qh_ps2_left",
    },
    "PSAB_PAD_LEFT",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_down.png",
      width: 52,
      height: 52,
      alt: "qh_ps2_down",
    },
    "PSAB_PAD_DOWN",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_cross.png",
      width: 32,
      height: 32,
      alt: "qh_ps2_cross",
    },
    "PSAB_CROSS",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_circle.png",
      width: 32,
      height: 32,
      alt: "qh_ps2_circle",
    },
    "PSAB_CIRCLE",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_square.png",
      width: 32,
      height: 32,
      alt: "qh_ps2_square",
    },
    "PSAB_SQUARE",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_triangle.png",
      width: 32,
      height: 32,
      alt: "qh_ps2_triangle",
    },
    "PSAB_TRIANGLE",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_l1.png",
      width: 73,
      height: 32,
      alt: "qh_ps2_l1",
    },
    "PSB_L1",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_r1.png",
      width: 73,
      height: 32,
      alt: "qh_ps2_r1",
    },
    "PSB_R1",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_l2.png",
      width: 73,
      height: 37,
      alt: "qh_ps2_l2",
    },
    "PSB_L2",
  ],
  [
    {
      src: "../../media/qbot/yf_ps2_val/yf_ps2_r2.png",
      width: 73,
      height: 37,
      alt: "qh_ps2_r2",
    },
    "PSB_R2",
  ],
];

// PS2 Controller read analog value of the button  --- how hard you press the button
Blockly.Blocks["qbot_ps2_a_btn"] = {
  init: function () {
    this.setColour(colour_remote_ctl);
    this.appendDummyInput("")
      .appendField(Blockly.MIXLY_YF_PS2_A_BUTTON)
      .appendField(
        new Blockly.FieldImage("../../media/qbot/yf_ps2x.png", 60, 37)
      )
      .appendField(new Blockly.FieldDropdown(MIXLY_YF_PS2_A_BTN), "PS2_A_BTN");
    this.setOutput(true, Number);
    this.setInputsInline(true);
    this.setTooltip("");
  },
};

// PS2 Controller read controller and setmotor
Blockly.Blocks["qbot_ps2_readController_setMotor"] = {
  init: function () {
    this.setColour(colour_remote_ctl);
    this.appendDummyInput("")
      .appendField(Blockly.MIXLY_YF_PS2)
      .appendField(
        new Blockly.FieldImage("../../media/qbot/yf_ps2x.png", 60, 37)
      )
      .appendField(Blockly.MIXLY_YF_PS2_R_MOTOR)
      .appendField("MOTOR1")
      .appendField(
        new Blockly.FieldDropdown([
          ["true", "true"],
          ["false", "false"],
        ]),
        "MOTOR1"
      );
    this.appendValueInput("MOTOR2")
      .setCheck(Number)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("MOTOR2");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
};

// 蓝牙是否有可读数据
Blockly.Blocks["qbot_bluetooth_available"] = {
  init: function () {
    this.setColour(colour_remote_ctl);
    this.appendDummyInput().appendField(Blockly.QH_BLUETOOTH_AVAILABLE);
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.QH_BLUETOOTH_AVAILABLE);
  },
};

// 蓝牙读取字符串
Blockly.Blocks["qbot_bluetooth_readstr"] = {
  init: function () {
    this.setColour(colour_remote_ctl);
    this.appendDummyInput().appendField(Blockly.QH_BLUETOOTH_READ_STRING);
    this.setOutput(true, String);
    this.setTooltip(Blockly.QH_BLUETOOTH_READ_STRING);
  },
};

// 蓝牙读取字符串
Blockly.Blocks["qbot_bluetooth_read_data"] = {
  init: function () {
    this.setColour(colour_remote_ctl);
    this.appendDummyInput().appendField(Blockly.QH_BLUETOOTH_READ_DATA);
    this.setOutput(true, String);
    this.setTooltip(Blockly.QH_BLUETOOTH_READ_DATA);
  },
};
