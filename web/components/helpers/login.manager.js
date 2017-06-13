import {Marionette, Backbone, _} from '../../vendor/vendor';
import config from '../config'

var LoggedUser = Backbone.Model.extend({
  urlRoot: config.baseApiUri + '/login',
  parse: function(response) {
    var result = {},
        data = response;
    console.log(response);
    result.name = data.name;
    result.email = data.email;
    result.canAudit = _.find(data.permissions, (x) => x.id == 3);
    result.canEditMainEntities = _.find(data.permissions, (x) => x.id == 4);
    result.canEditAuxiliaries = _.find(data.permissions, (x) => x.id == 5);
    result.canReport = _.find(data.permissions, (x) => x.id == 6);
    result.canAccessSysConfig = _.find(data.permissions, (x) => x.id == 8);
    return result;
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
        error   : _.bind(this.onUserLogError, this)
    });
  },
  onUserLogIn: function(model, result) {
    if (!result) {
        this.onUserLogError();
    } else {
        this.trigger('login');
    }
  },
  onUserLogError: function() {
    window.location = 'login/';
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
