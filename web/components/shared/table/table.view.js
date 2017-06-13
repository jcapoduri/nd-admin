import {Marionette, Backbone, _, Bootbox, Toastr} from '../../../vendor/vendor';
import simpleTpl from './simpletable.tpl.html';
import crudTpl from './crudtable.tpl.html'
import {SimpleTablerowView, CRUDSimpleTablerowView} from './tablerow.view';

var loadingView = Marionette.View.extend({
  template: _.template('<h4><span class="fa fa-spin fa-spinner"></span> Cargando...</h4>')
})

var SimpleTableBodyView = Marionette.CollectionView.extend({
  childView : SimpleTablerowView,
  initialize: function(options) {
    this.headers = options.headers;
  },
  childViewOptions: function(model, index) {
    return {
        headers: this.headers
    };
  },
  tagName: 'tbody'
});

var SimpleTableViewRO = Marionette.View.extend({
  template: simpleTpl,
  bodyViewClass : SimpleTableBodyView,
  regions: {
    body: {
      el: 'tbody',
      replaceElement: true
    }
  },
  initialize: function(options) {
    this.model = new Backbone.Model(options);
  },
  onRender: function() {
    var collection = this.model.get('collection');
    this.bodyView = new this.bodyViewClass(this.model.attributes);
    this.showChildView('body', this.bodyView);
  }
});


var SimpleTableView = Marionette.View.extend({
  template: simpleTpl,
  bodyViewClass : SimpleTableBodyView,
  regions: {
    body: {
      el: 'tbody',
      replaceElement: true
    }
  },
  initialize: function(options) {
    this.model = new Backbone.Model(options);
  },
  onRender: function() {
    var collection = this.model.get('collection');
    //this.listenTo(collection, 'change', this.render);
    this.bodyView = new this.bodyViewClass(this.model.attributes);
    this.showChildView('body', new loadingView());
    var handler = _.bind(this.onFetchResolve, this);
    collection.fetch({
        success : handler,
        error   : handler
    })
  },
  onFetchResolve: function(model, response) {
    this.model.set('loading', false);
    this.showChildView('body', this.bodyView);
  }
});

var CRUDTableBodyView = SimpleTableBodyView.extend({
  childView : CRUDSimpleTablerowView,
  initialize: function(options) {
    SimpleTableBodyView.prototype.initialize.call(this, options);
    this.baseUrl = options.baseUrl;
  },
  childViewOptions: function(model, index) {
    return {
        headers: this.headers,
        baseUrl: this.options.baseUrl
    };
  },
  childViewTriggers: {
    'item:delete' : 'item:delete'
  }
});

var CRUDSimpleTableView = SimpleTableView.extend({
  template: crudTpl,
  bodyViewClass : CRUDTableBodyView,
  ui: {
    'add': 'button'
  },
  events: {
    'click @ui.add': 'onAddNew'
  },
  onRender: function() {
    SimpleTableView.prototype.onRender.apply(this, arguments);
    this.bodyView.on('item:delete', this.onItemDelete, this);
  },
  onAddNew: function() {
    Backbone.history.navigate(this.options.baseUrl + '/add', {trigger: true});
  },
  onItemDelete: function(model) {
    Bootbox.confirm({
      buttons: {
        cancel: {
          label: 'No'
        },
        confirm: {
          label: 'Si, borrar',
          className: 'btn-danger'
        }

      },
      message: "Esta seguro de borrar este elemento?",
      callback:  _.bind(this.deleteElement, this, model)
    });
  },
  deleteElement: function(model, response) {
    if (response) {
      var handler = _.bind(this.onDeleteComplete, this);
      model.destroy({
        wait    : true,
        success : handler,
        error   : handler
      });
    }
  },
  onDeleteComplete: function(model, response) {
    if (response.status > 299) {
        Toastr.error("No se pudo eliminar el elemento seleccionado: Esta siendo referenciado por otros objetos");
    } else {
        Toastr.success("Elemento eliminado correctamente");
    }
  }
});

export {SimpleTableView, SimpleTableViewRO, CRUDSimpleTableView};
