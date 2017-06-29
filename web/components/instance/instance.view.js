import {Marionette, Backbone, Validation, _} from '../../vendor/vendor';
import {LoginManager} from '../helpers/login.manager';
import Binding from '../helpers/binding';
import template from './instance.view.tpl.html';
import Decorator from '../helpers/error.decorator';

class InstanceView extends Marionette.View {
    constructor(config) {
    	_.extend(config, {
            template: template
        });
        super(config);
    }

    initialize() {

    }

    templateContext() {
    	var user = LoginManager.getUser();
    	return {
    		"isLoged": user.isLoged()
    	}
    }
}

export {InstanceView};

