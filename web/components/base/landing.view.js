import {Marionette, Backbone} from '../../vendor/vendor';
import template from './landing.tpl.html';

var LandingPage = Marionette.View.extend({
  template: template
});

module.exports = LandingPage;
