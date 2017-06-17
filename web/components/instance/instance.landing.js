import {Marionette, Backbone, Validation, _} from '../../vendor/vendor';
import {InstanceCollection} from './instance.collection';
import {InstanceView} from './instance.view';
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
}

export {InstanceLanding};

