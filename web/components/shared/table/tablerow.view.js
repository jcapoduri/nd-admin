import {Marionette, Backbone, _, Bootbox} from '../../../vendor/vendor';
import baseTpl from './tablerow.tpl.html';
import crudTpl from './crudtablerow.tpl.html';

var SimpleTablerowView = Marionette.View.extend({
  template: baseTpl,
  initialize: function(options) {
    this.headers = options.headers;
  },
  templateContext: function() {
    return {
      headers: this.headers
    };
  },
  tagName: 'tr'
});

var CRUDSimpleTablerowView = SimpleTablerowView.extend({
  template: crudTpl,
  baseUrl: null,
  ui: {
    'edit': '[data-edit]',
    'delete': '[data-delete]'
  },
  events: {
    'click @ui.edit': 'onEdit',
    'click @ui.delete': 'onDelete'
  },
  initialize: function(options) {
    SimpleTablerowView.prototype.initialize.call(this, options);
    this.baseUrl = options.baseUrl;
  },
  onEdit: function(evt) {
    evt.stopPropagation();
    var url = (this.baseUrl || this.model.urlRoot) + '/' + this.model.get('id');
    Backbone.history.navigate(url, {trigger: true});
  },
  onDelete: function() {
    this.trigger('item:delete', this.model);
  }
});

export {SimpleTablerowView, CRUDSimpleTablerowView};
