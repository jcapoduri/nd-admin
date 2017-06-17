import {Radio, Marionette, _} from '../../vendor/vendor';
import {BaseController} from '../../modules/controller.base';
import {InstanceLanding} from './instance.landing';
import {InstanceEditView} from './instance.edit';
import {InstanceModel} from './instance.model';
import FormView from '../shared/form/form.view';

var InstanceController = BaseController.extend({
  baseEndpoint: 'dashboard',
  showAll: function() {
    var view = new InstanceLanding();
    var channel = this.getChannel();
    channel.trigger('setView', view);
  },
  showOne: function(id) {
    var Instance = new InstanceModel();
    if (!!id && parseInt(id)) {
        Instance.set('id', id);
        Instance.fetch();
    }
    var form = new FormView({
        title      : Instance.get('id') ? "Modificar Instancia" : "Agregar Instancia",
        model      : Instance,
        formClass  : InstanceEditView,
        doneAction : _.bind(this.goBase, this)
    });
    var channel = this.getChannel();
    channel.trigger('setView', form);
  }
});

module.exports = new InstanceController();
