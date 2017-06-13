import {Backbone} from '../vendor/vendor';

var QueryableCollection = Backbone.Collection.extend({
  currQuery: {
    search: '*',
    column: '',
    init:  0,
    limit: 100
  },
  query: function() {
    debugger;
    Backbone.sync("create", this, {
      url: this.url + '/query',
      attrs: this.currQuery,
      success: function(data) {
        debugger;
        this.parse(data);
      }
    });

  }
});

export {QueryableCollection};
