import {Backbone, Validation, Marionette, _} from '../../vendor/vendor';
import config from '../config';

class InstanceModel extends Backbone.Model {
    constructor() {
        super({
            urlRoot : config.baseApiUri + '/instance',
            validation : {
                name: [{
                    required: true,
                    msg: "Por favor, inserte un nombre"
                },{
                    rangeLength: [2, 255],
                    msg: "Por favor, inserte un nombre"
                }],
                socialName: [{
                    required: true,
                    msg: "Por favor, inserte un apellido"
                },{
                    rangeLength: [2, 255],
                    msg: "Por favor, inserte un nombre"
                }]
            }
        })
    }
}

export {InstanceModel}
