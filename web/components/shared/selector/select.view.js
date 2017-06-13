import {Marionette, Handlebars, Backbone, Validation, _} from '../../../vendor/vendor';
import template from './select.tpl.html'
import Binding from '../../helpers/binding';

var SelectItemView = Marionette.View.extend({
  ui: {
    item: 'li'
  },
  events: {
    'click @ui.item': 'onItemSelected'
  },
  onItemSelected: function() {
    this.trigger('item:selected', this.model);
  },
  template: Handlebars.compile('<li data-value="{{id}}">{{name}}</li>')
});

var SelectorListView = Marionette.CollectionView.extend({
  initialize: function(options) {
      this.collection.on('reset', this.render, this);
  },
  childViewTriggers: {
    'item:selected': 'item:selected'
  },
  childView: SelectorItemView
})

var SelectView = Marionette.View.extend({
  behaviors: [Binding],
  template: template,
  collection: new Backbone.Collection(),
  buffer: new Backbone.Collection(),
  parseFunction: _.identity,
  matchFunction: _.identity,
  maxResult: 20,
  regions: {
    list: '#items'
  },
  ui: {
    'item'       : 'li[data-value]',
    'button'     : 'button',
    'searchinput': 'li input',
    'dropdown'   : '.btn-group',
    'searcher'   : 'input[data-bind]'
  },
  events: {
    'keyup   @ui.searchinput': 'updateSearch',
    'keydown @ui.searcher'   : 'onHelpNeeded'
  },
  initialize: function(options) {
    this.parseFunction = options.parseFunction || this.parseFunction;
    this.maxResult     = options.maxResult || this.maxResult;
    this.matchFunction = options.matchFunction || this.matchFunction;
    this.model = new Backbone.Model({
        search: '',
        omnisearch: '',
        buffer: this.buffer,
        selectedValue: '[Vacio]'
    });
    this.model.on('change:search', this.guessValue, this);
    this.model.on('change:omnisearch', this.doSearch, this);
    this.model.on('change:selectedValue', this.render, this);
    this.collection.on('sync', this.setDefaultValue, this);
    this.collection.fetch();
  },
  onHelpNeeded: function(evt) {
    if (evt.key == "F1") {
      evt.stopImmediatePropagation();
      evt.stopPropagation(); //don't open up the browser help
      evt.cancelBubble = true;
      evt.cancelable = true;
      evt.preventDefault();
      evt.returnValue = false;
      this.ui.button.click();
      if (this.ui.searchinput.is(':visible')) {
        this.ui.searchinput.focus();
      } else {
        this.ui.searcher.focus();
      }
    };
  },
  updateSearch: function(evt) {
    var el = evt.currentTarget,
        value = el.value;
    if (evt.key == "Enter") { //select first item
      var currentBuffer = this.model.get('buffer');
      if (currentBuffer.length) {
        this.setValue(currentBuffer[0]);
        this.ui.searcher.val('');
        this.ui.searchinput.val('');
      }
    } else {
      this.model.set('omnisearch', value);
    }
  },
  guessValue: function(evt) {
    var value = this.model.get('search'),
        searchQuery = {};
    searchQuery[this.options.searchKey] = value;
    var resultModel = this.collection.findWhere(searchQuery);
    if (!!resultModel) {
        if (this.options.model) {
            this.options.model.set(this.options.attrHolder, resultModel);
        }
        this.model.set('selectedValue', this.parseFunction(resultModel).name);
        this.trigger('item:selected', resultModel);
    } else {
        this.ui.button.click();
    };
  },
  doSearch: function() {
    var filtered = this.collection.filter(function(item) {
        var value  = item.toJSON();
        var needle = this.model.get('omnisearch');
        return this.matchFunction(needle, value);
    }, this);
    if (!!this.model.get('omnisearch')) filtered = _.head(filtered, this.maxResult);
    var parsed = _.map(filtered, this.parseFunction);
    this.buffer.reset(parsed);
    this.model.set('buffer', this.buffer.toJSON());
  },
  setValue: function(model) {
    var resultModel = this.collection.findWhere({id: model.id});
    if (this.options.model) {
        this.options.model.set(this.options.attrHolder, resultModel);
    }
    this.model.set('selectedValue', this.parseFunction(resultModel).name);
    this.trigger('item:selected', resultModel);
  },
  setDefaultValue: function() {
    if (this.options.defaultValue) {
       var resultModel = this.collection.findWhere({id: this.options.defaultValue});
       if (!!resultModel) this.model.set('selectedValue', this.parseFunction(resultModel).name);
    };
    this.doSearch();
  },
  onRender: function() {
    var list = new SelectorListView({
        collection: this.buffer
    });
    list.on('item:selected', this.setValue, this);
    this.showChildView('list', list);
  }
});

export {SelectItemView};
