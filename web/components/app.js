import {Marionette, Backbone} from '../vendor/vendor';
import AppView from './base/app.view';
import {LoginManager} from './helpers/login.manager';
import AppRouter from './routes';

export default Marionette.Application.extend({
  region: {
    el: '#app',
    replace: true
   },
  channelName: 'routing',
  initialize: function() {
    var channel = this.getChannel();
    this.listenTo(channel, 'setView', this.loadContent);
  },
  onStart: function() {
    this.logManager = LoginManager;
    this.logManager.on('login', this.onUserLogIn, this);
    this.logManager.on('logout', this.onUserLogOut, this);
    this.logManager.getLoggedUser();
  },
  onUserLogIn: function () {
    //set up ui
    this.baseLayout = new AppView()
    this.baseLayout.render();
    this.showView(this.baseLayout);
    // Start history when our application is ready
    Backbone.history.start();
  },
  onUserLogOut: function () {
      window.location = 'login/';
      this.destroy();
  },
  loadContent(view) {
    this.baseLayout.setContent(view)
  }
});
