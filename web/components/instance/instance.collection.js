import {Marionette, Backbone} from '../../vendor/vendor';
import {InstanceModel} from './instance.model';
import {QueryableCollection} from '../../modules/queryable.collection'
import config from '../config'

var InstanceCollection = QueryableCollection.extend({
  model: InstanceModel,
  url: config.baseApiUri + '/instance'
});

export {InstanceCollection};
