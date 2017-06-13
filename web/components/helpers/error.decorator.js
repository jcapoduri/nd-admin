import {Marionette, Backbone, Validation} from '../../vendor/vendor';

var behavior = Marionette.Behavior.extend({
  ui: {
    inputs          : 'input[data-bind]',
    errorContainers : 'select'
  },
  onRender: function() {
    Backbone.Validation.bind(this.view, {
      valid: function(view, attr) {
        var container = view.$el.find('[data-container='+attr+']'),
            helpBox = container.find('.help-block');
        helpBox.text('');
        container.removeClass('has-error');
      },
      invalid: function(view, attr, error) {
        var container = view.$el.find('[data-container='+attr+']'),
            helpBox = container.find('.help-block');
        helpBox.text(error);
        container.addClass('has-error');
      }
    });
  }
});

module.exports = behavior;
