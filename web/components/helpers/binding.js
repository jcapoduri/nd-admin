import {Marionette, _} from '../../vendor/vendor';

var behavior = Marionette.Behavior.extend({
    ui: {
        input    : 'input[data-bind]',
        select   : 'select[data-bind]',
        textarea : 'textarea[data-bind]',
        actionable : '[data-click]'
    },
    events: {
        'change @ui.input'      : 'updateModel',
        'change @ui.select'     : 'updateModelFromSelect',
        'change @ui.textarea'   : 'updateModel',
        'click  @ui.actionable' : 'onActionableClick'
    },
    updateModel: function(evt) {
        var el = evt.currentTarget,
            bindingName = el.getAttribute('data-bind'),
            value = el.type == "checkbox" ? el.checked : el.value;
        this.view.model.set(bindingName, value);
    },
    updateModelFromSelect: function(evt) {
        var el = evt.currentTarget,
            bindingName = el.getAttribute('data-bind'),
            value = $(el).val();
        this.view.model.set(bindingName, value);
    },
    onRender: function() {
        _.each(this.ui.select, function(x) {
            $(x).change();
        }, this);
    },
    onActionableClick: function(evt) {
        var el = evt.currentTarget,
            bindingName = el.getAttribute('data-click');
        this.view[bindingName].call(this.view, evt);
    },
});

module.exports = behavior;
