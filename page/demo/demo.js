import $ from'jquery'
import STRINGS from'/widget/strings/strings'
import modOne from'./modules/mod-one'
import modTwo from'./modules/mod-two'
import device from'ngfe-widget-device'

//页面模块间的交互逻辑尽量在页面中组织,以保持模块的独立性
$(function () {
    modOne.setText(STRINGS.HELLO)
    modTwo.setText('world')
    $('#device span').text(device.isWeixin())
})