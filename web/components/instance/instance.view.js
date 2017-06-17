import {Marionette, Backbone, Validation, _} from '../../vendor/vendor';
import Binding from '../helpers/binding';
import template from './instance.view.tpl.html';
import Decorator from '../helpers/error.decorator';

class InstanceView extends Marionette.View {
    constructor() {
        super({
            template: template
        })
    }
}

export {InstanceView};

