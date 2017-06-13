import {Marionette, Backbone} from '../../vendor/vendor';
import template from './app.tpl.html';
import Sidebar from './sidebar.view'

var mainAppView = Marionette.View.extend({
  regions: {
    sidebar: '#sidebar',
    content: '#content'
  },
  template: template,
  currentContent: null,
  onRender: function() {
    this.showChildView('sidebar', new Sidebar());
  },
  setContent: function(view) {
    //should properly dispose the current view before change it
    this.currentContent = view;
    this.showChildView('content', view);
  },
  tagName: 'body'
});

module.exports = mainAppView;
