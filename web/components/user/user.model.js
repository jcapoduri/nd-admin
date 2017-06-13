import {Backbone} from '../../vendor/vendor';
import config from '../config'

var userModel = Backbone.Model.extend({
  urlRoot: config.baseApiUri + '/user',
  defaults: {
    name: '',
    email: '',
    password: ''
  },
  validation: {
    name: [{
        required: true,
        msg: "Por favor, inserte un nombre"
    },{
        rangeLength: [3, 255],
        msg: "Por favor, inserte un nombre"
    }],
    email: [{
      required: true,
      msg: 'Por favor, inserte un email'
    },{
      pattern: 'email',
      msg: 'Por favor, inserte un email valido'
    }],
    password: [{
        required: true,
        msg: "Por favor, inserte un passsword"
    },{
        rangeLength: [3, 255],
        msg: "Por favor, inserte un password"
    }]
  }
});

module.exports = userModel;
