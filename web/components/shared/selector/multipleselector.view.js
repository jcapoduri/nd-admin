import {Marionette, Handlebars, Backbone, Validation, _} from '../../../vendor/vendor';
import template from './multipleselector.tpl.html'
import Binding from '../../helpers/binding';

var MultipleSelectorItemView = Marionette.View.extend({
  ui: {
    item: 'li'
  },
  events: {
    'click @ui.item': 'onItemSelected'
  },
  onItemSelected: function() {
    console.log(this.model);
    this.trigger('item:selected', this.model);
  },
  template: Handlebars.compile('<div data-value="{{id}}">{{name}}</div>')
});

var MultipleSelectorListView = Marionette.CollectionView.extend({
  initialize: function(options) {
    this.collection.on('reset', this.render, this);
  },
  childViewTriggers: {
    'item:selected': 'item:selected'
  },
  tagName: 'ul',
  className: 'list-group',
  childView: MultipleSelectorItemView
})

var MultipleSelectorView = Marionette.View.extend({
  behaviors: [Binding],
  template: template,
  collection: new Backbone.Collection(),
  regions: {
    list: '#itemContainer'
  },
  ui: {
    'filterinput': 'input#filter',
  },
  events: {
    'keyup   @ui.filterinput': 'doFilter'
  },
  initialize: function(options) {
    this.parseFunction = options.parseFunction || this.parseFunction;
    this.matchFunction = options.matchFunction || this.matchFunction;
    this.model = new Backbone.Model({
        filter: '',
        selectedValue: '[Vacio]'
    });
    this.collection.on('sync', this.setDefaultValues, this);
    this.collection = options.collection;
    this.collection.fetch();
  },
  doFilter: function() {},
  setValues: function(selectedArray) {
    selectedArray = selectedArray || this.defaultValues;
    if (this.collection.isEmpty()) {
      this.defaultValues = selectedArray;
    } else {
      selectedArray.forEach(function(x) {  
        var resultModel = this.collection.findWhere({id: x.id});
        console.log(x.id, resultModel);    
        if (resultModel) resultModel.set('selected', true);
      }, this);
    };
  },
  setDefaultValues: function() {
    if (this.defaultValues) this.setValues();
  },
  onItemSelected: function() {
    var resultModel = this.collection.where({selected: true});
    this.trigger('item:selected', resultModel);
  },
  onRender: function() {
    var list = new MultipleSelectorListView({
        collection: this.collection,
        childView: this.options.childView || MultipleSelectorItemView
    });
    list.on('item:selected', this.onItemSelected, this);
    this.showChildView('list', list);
  }
});

export {MultipleSelectorView};
