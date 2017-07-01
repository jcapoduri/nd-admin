import {Marionette, Backbone, _, Toastr} from '../../../vendor/vendor';
import template from './form.tpl.html';

var formView = Marionette.View.extend({
  template: template,
  regions: {
    'form': '#form'
  },
  ui: {
    button: '#button-row button'
  },
  events: {
    'click @ui.button': 'onButtonClicked'
  },
  defaults: {
    buttons: [
        {
            name: 'Salvar',
            id: 'save',
            action: 'onSave'
        },
        {
            name: 'Cancelar',
            id: 'cancel',
            action: 'onCancel'
        }
    ]
  },
  initialize: function(options) {
    this.buttons = options.buttons || this.defaults.buttons;
    this.model.on('sync', this.updateUI, this);
  },
  updateUI: function() {
    this.render();
  },
  onRender: function() {
    this.showChildView('form', new this.options.formClass({
        model : this.model
    }));
  },
  onButtonClicked: function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var btn = evt.currentTarget,
        btnOptions = _.find(this.buttons, x => x.id === btn.id);
    this[btnOptions.action].call(this);
  },
  onSave: function() {
    this.model.save(this.model.attributes, {
        success: _.bind(function() {
            Toastr.success("Datos guardados correctamente");
            this.onCancel();
        }, this),
        error: function() {
            Toastr.error("Los datos no han sido guardados correctamente");
        }
    });
  },
  onCancel: function() {
    this.options.doneAction();
  },
  templateContext: function() {
    return {
      buttons: this.buttons,
      title  : this.options.title
    };
  }
});

module.exports = formView;
