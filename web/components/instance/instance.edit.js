import {Marionette, Backbone, Validation, _} from '../../vendor/vendor';
import Binding from '../helpers/binding';
import template from './instance.edit.tpl.html';
import Decorator from '../helpers/error.decorator';

class InstanceEditView extends Marionette.View {
    constructor() {
        super({
            template: template,
            behaviors: [Binding, Decorator]
        })
    }
}

export {InstanceEditView};

