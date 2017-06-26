import {Marionette, Backbone, Validation, _} from '../../vendor/vendor';
import Binding from '../helpers/binding';
import template from './instance.view.tpl.html';
import Decorator from '../helpers/error.decorator';

class InstanceView extends Marionette.View {
    constructor(config) {
    	_.extend(config, {
            template: template
        });
        console.log(config);
        super(config);
    }

    initialize() {

    }
}

export {InstanceView};

