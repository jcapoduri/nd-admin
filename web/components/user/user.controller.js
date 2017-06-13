import {Radio, Marionette, _} from '../../vendor/vendor';
import {BaseController} from '../../modules/controller.base';
import UserCollection from './user.collection';
import UserModel from './user.model';
import {CRUDSimpleTableView} from '../shared/table/table.view';
import FormView from '../shared/form/form.view';
import UserView from './user.view';

var UserController = BaseController.extend({
  baseEndpoint: 'users',
  showAll: function() {
    var users = new UserCollection();
    var table = new CRUDSimpleTableView({
      title      : 'Listado de Usuarios',
      collection : users,
      headers    : {
        "name"     : "Nombre",
        "email"    : "E-Mail"
      },
      addButton  : "Agregar Usuario",
      baseUrl    : "users"
    });
    var channel = this.getChannel();
    channel.trigger('setView', table);
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

module.exports = new UserController();
