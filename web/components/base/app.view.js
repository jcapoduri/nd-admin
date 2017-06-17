import {Marionette, Backbone} from '../../vendor/vendor';
import template from './app.tpl.html';

var mainAppView = Marionette.View.extend({
  regions: {
    content: '.container'
  },
  template: template,
  currentContent: null,
  setContent: function(view) {
    //should properly dispose the current view before change it
    this.currentContent = view;
    this.showChildView('content', view);
  },
  tagName: 'body'
});

module.exports = mainAppView;
