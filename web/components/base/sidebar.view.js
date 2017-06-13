import {Marionette, Backbone} from '../../vendor/vendor';
import template from './sidebar.tpl.html';
import {LoginManager} from '../helpers/login.manager';

var mainSidebar = Marionette.View.extend({
  template: template,
  ui :{
    'logout'   : 'header span',
    'listItem' : 'li[data-link]'
  },
  events: {
    'click @ui.logout'   : 'logout',
    'click @ui.listItem' : 'setActivate'
  },
  initialize: function() {
    this.model = LoginManager.getUser();
  },
  setActivate: function(evt) {
    evt.stopPropagation();
    var activeWidget = evt.currentTarget,
        $activeWidget = $(activeWidget);
    this.ui.listItem.removeClass('active');
    $activeWidget.addClass('active');
  },
  logout: function() {
    LoginManager.logout();
  }
});

module.exports = mainSidebar;
