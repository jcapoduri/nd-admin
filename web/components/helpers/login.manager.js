import {Marionette, Backbone, _} from '../../vendor/vendor';
import config from '../config'

var LoggedUser = Backbone.Model.extend({
  urlRoot: config.baseApiUri + '/login',
  parse: function(response) {
    var result = {},
        data = response;
    result.name  = data.name;
    result.email = data.email;
    result.id    = 1;
    return result;
  },
  isLoged() {
    return !this.isNew();
  }
})

var LoginManagerObject = Marionette.Object.extend({
  loggedUser : new LoggedUser(),
  isLoaded   : false,
  initialize : function() {
    this.loggedUser.on('change', this.onUserLoad, this);
  },
  getUser: function() {
    return this.loggedUser;
  },
  getLoggedUser: function() {
    this.loggedUser.fetch({
        success : _.bind(this.onUserLogIn, this),
        error   : _.bind(this.onUserLogIn, this)
    });
  },
  onUserLogIn: function(model, result) {
    this.trigger('login');
  },
  logout: function() {
    console.log("ponele que te deslogeo ;)");
    Backbone.sync("delete", {url: config.baseApiUri + '/login'}, {
      success: _.bind(function() { this.trigger('logout'); }, this)
    });
  }
})

var LoginManager = new LoginManagerObject();

export {LoginManager}
