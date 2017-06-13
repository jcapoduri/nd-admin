import {Marionette, _} from '../../vendor/vendor';

var behavior = Marionette.Behavior.extend({
    ui: {
        input    : 'input[data-bind]',
        select   : 'select[data-bind]',
        textarea : 'textarea[data-bind]'
    },
    events: {
        'change @ui.input'   : 'updateModel',
        'change @ui.select'  : 'updateModelFromSelect',
        'change @ui.textarea': 'updateModel'
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
    }
});

module.exports = behavior;
