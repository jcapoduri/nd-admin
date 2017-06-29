import {Marionette, Backbone} from '../../vendor/vendor';
import template from './app.tpl.html';
import {LoginManager} from '../helpers/login.manager';
import Binding from '../helpers/binding';

var mainAppView = Marionette.View.extend({
  regions: {
    content: '.container'
  },
  behaviors : [Binding],
  template: template,
  currentContent: null,
  initialize: function() {
    this.model = LoginManager.getUser();
  },
  setContent: function(view) {
    //should properly dispose the current view before change it
    this.currentContent = view;
    this.showChildView('content', view);
  },
  logout: function() {
    LoginManager.logout();
  },
  templateContext: function() {
    console.log(this.model.isNew(), this.model)
    return {
      "isLoged": !this.model.isNew()
    };
  },
  tagName: 'body'
});

module.exports = mainAppView;
