import {Marionette, Backbone, Validation, _} from '../../vendor/vendor';
import Binding from '../helpers/binding';
import template from './instance.edit.tpl.html';
import Decorator from '../helpers/error.decorator';

var InstanceEditView = Marionette.View.extend({
    template  : template,
    behaviors : [Binding, Decorator]
})

export {InstanceEditView};

