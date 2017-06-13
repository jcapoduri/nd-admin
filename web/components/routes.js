import {Marionette, Backbone, _, Radio} from '../vendor/vendor';
import UserController from './user/user.controller';

var AppRouter = Marionette.AppRouter.extend({
  channelName: 'routing',
  routes : {
    "dashboard" : "landing",
    "*notFound" : "notFound"
  },
  getChannel: function() {
    return new Radio.channel(this.channelName);
  },
  notFound: function() {
    Backbone.history.navigate('#dashboard', {trigger: true});
  },
  landing: function() {
    var landing = new LandingPage();
    var channel = this.getChannel();
    channel.trigger('setView', landing);
  }
});

var router = new AppRouter();

router.processAppRoutes(UserController, {
    'users': "showAll",
    "users/:id": "showOne"
});

module.exports = router;
