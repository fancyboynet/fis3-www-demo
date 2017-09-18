import $ from'jquery'
import STRINGS from'/widget/strings/strings'
import modOne from'./modules/mod-one'
import modTwo from'./modules/mod-two'

$(function () {
    modOne.setText(STRINGS.HELLO)
    modTwo.setText('world')
})