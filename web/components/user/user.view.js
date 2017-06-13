import {Marionette, Backbone, Validation, _} from '../../vendor/vendor';
import Binding from '../helpers/binding';
import template from './user.tpl.html';
import Decorator from '../helpers/error.decorator';
import {SelectorView} from '../shared/selector/selector.view';

var userView = Marionette.View.extend({
  behaviors: [Binding, Decorator],
  template: template,
  regions: {
    role : '#roleContainer'
  },
  onRender: function() {
    // var rolesController = new SelectorView({
    //   collection    : new RolesCollection(),
    //   defaultValue  : this.model.get('id_userrole'),
    //   searchKey     : 'id',
    //   matchFunction : function(needle, model) {
    //     var regex = new RegExp('.*' + needle + '.*', 'gi');
    //     return regex.test(model.id) || regex.test(model.name);
    //   },
    //   parseFunction : function(model) {
    //     return {
    //       id:   model.get('id'),
    //       name: model.get('id') + ' - ' + model.get('name')
    //     }
    //   }
    // });

    // rolesController.on('item:selected', this.setRole, this);
    // this.showChildView('role', rolesController);
  },
  setRole: function(role) {
    this.model.set('role', role.toJSON());
  }
});

module.exports = userView;

