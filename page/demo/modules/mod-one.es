import $ from'jquery'

let mod = {
    init : function () {
        var self = this
        self._$mod = $('#mod-one')
        return self
    },
    setText:function (text) {
        var self = this
        self._$mod.text(text)
        return self
    }
}
$(function () {
    mod.init()
})

export default mod