import {Radio, Marionette, _} from '../../vendor/vendor';
import {BaseController} from '../../modules/controller.base';
import {InstanceLanding} from './instance.landing';

var InstanceController = BaseController.extend({
  baseEndpoint: 'dashboard',
  showAll: function() {
    var view = new InstanceLanding();
    var channel = this.getChannel();
    channel.trigger('setView', view);
  },
  showOne: function(id) {
    var User = new UserModel();
    if (!!id && parseInt(id)) {
        User.set('id', id);
        User.fetch();
    }
    var form = new FormView({
        title      : User.get('id') ? "Modificar Usuario" : "Agregar Usuario",
        model      : User,
        formClass  : UserView,
        doneAction : _.bind(this.goBase, this)
    });
    var channel = this.getChannel();
    channel.trigger('setView', form);
  }
});

module.exports = new InstanceController();
