import {Backbone, _, Marionette} from '../vendor/vendor.js';

var BaseController = Marionette.Object.extend({
  channelName: 'routing',
  baseEndpoint: '',
  showAll: _.noop(),
  showOne: _.noop(),
  goBase: function() {
    Backbone.history.navigate(this.baseEndpoint, {trigger: true})
  }
});

export {BaseController};
