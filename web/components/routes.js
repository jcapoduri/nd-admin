import {Marionette, Backbone, _, Radio} from '../vendor/vendor';
import UserController from './user/user.controller';
import InstanceController from './instance/instance.controller';

var AppRouter = Marionette.AppRouter.extend({
  channelName: 'routing',
  routes : {
    "*notFound" : "notFound"
  },
  getChannel: function() {
    return new Radio.channel(this.channelName);
  },
  notFound: function() {
    Backbone.history.navigate('#dashboard', {trigger: true});
  }
});

var router = new AppRouter();

router.processAppRoutes(UserController, {
    'users': "showAll",
    "users/:id": "showOne"
});

router.processAppRoutes(InstanceController, {
    'dashboard': "showAll",
    'dashboard/:id': "showOne"
})

module.exports = router;
