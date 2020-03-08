# Mixly extension

Mixly图形化编程软件, 主要使用 google 的 Blockly 通过搭积木的形式生成指定语言的代码。该文档主要介绍如何通过Mixly自定义积木块, 生成自己需要的Arduino代码, 控制自己的Arduino扩展板。

## 导入及文件配置介绍

打开Mixly软件后 点击导入->本地文件->选择自定义的xml文件即可

- xml文件需要在开头的注释中添加如下配置(该注释是必须的, 不能删除), Mixly会找到当前xml文件中注释指定的文件,复制到Mixly的资源文件中**(这些文件需要放在xml文件的同级目录下, 使用相对路径的写法放在其他目录并不会生效...)**

  ``` xml
  <!--
    type="company"
    block="block/qhMixlyExtension.js"
    generator="generator/qhMixlyExtension.js"
    color="color/qhMixlyExtension.js"
    lib="qheduino"
    media="media/qheduino"
    language="language/qheduino"
  -->
  ```

- 配置文件中的 ``type="company"`` 标识当前导入的是Mixly指定的库文件(该值必须是 *company*)

- ``block="block/xx.js"`` 指定积木块定义所在文件

- ``generator="generator/xx.js"`` 指定积木块对应的代码生成器文件

- ``color="color/xx.js"`` 积木块需要的所有颜色常量定义,也可以直接在块定义文件中声明

- ``lib="xx"`` c库文件存放在xx文件夹下,积木块代码过于复杂时, **尽量将代码封装至c语言的库文件中,减少generator中的代码字符串拼接**

- ``media="media/xx"`` 积木块上可以展示图片资源,所以图片资源放在该文件夹下

- ``language="language/xx"`` 积木块中的文字显示通常使用常量,在不同的语言资源中定义相同常量名的字符串常量,以实现多语言切换

- 正式使用该xml文件前,还需要两行特殊的导入

  ``` xml
    <script type = "text/javascript" src = "../../blocks/company/xx.js"></script>
    <script type = "text/javascript" src = "../../generators/arduino/company/xx.js"></script>
  ```

xml文件会被载入到主界面中的,对应的文件会被复制到软件对应的资源目录下,所以需要添加这两行导入块定义的文件,由于资源文件的存放目录和我们当前xml文件下的目录结构不同,所以引入的路径需要定为软件的资源目录，而不是本地文件所在目录

- xml 文件主体主要定义需要显示的块、块分类、块嵌入块、块与块的连接, 可参考 [Blockly 官方文档](https://developers.google.cn/blockly/guides/configure/web/toolbox)
