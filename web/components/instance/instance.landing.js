import {Marionette, Backbone, Validation, _} from '../../vendor/vendor';
import {InstanceCollection} from './instance.collection';
import {InstanceView} from './instance.view';
import {LoginManager} from '../helpers/login.manager';
import template from './instance.landing.tpl.html';
import Binding from '../helpers/binding';
import Decorator from '../helpers/error.decorator';

class InstanceCollectionView extends Marionette.CollectionView {
    constructor() {
        super({
            childView: InstanceView
        })
    }

    initialize() {
        this.collection = new InstanceCollection();
        this.collection.on('sync', this.render, this);
        this.collection.fetch();
    }
}

class InstanceLanding extends Marionette.View {
    constructor() {
        super({
            template: template,
            regions: {
                'instances' : 'div[data-replace]'
            }
        })
    }

    onRender() {
        this.showChildView('instances', new InstanceCollectionView());
    }

    templateContext() {
        this.user = this.user || LoginManager.getUser();
        return {
            isLoged: this.user.isLoged()
        }
    }
}

export {InstanceLanding};

