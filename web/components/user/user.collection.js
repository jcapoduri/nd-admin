import {Marionette, Backbone} from '../../vendor/vendor';
import user from './user.model';
import {QueryableCollection} from '../../modules/queryable.collection'
import config from '../config'

var userCollection = QueryableCollection.extend({
  model: user,
  url: config.baseApiUri + '/user'
});

module.exports = userCollection;
