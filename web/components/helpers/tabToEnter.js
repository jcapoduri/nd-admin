import {Marionette} from '../../vendor/vendor';

var behavior = Marionette.Behavior.extend({
  ui: {
    allInputs : ':input'
  },
  events: {
    'keyup @ui.allInputs' : 'checkEnter',
  },
  checkEnter: function(evt) {
    var el = evt.currentTarget;
    if (evt.key == "Enter") { //select first item
      var nextIdx = this.ui.allInputs.index(el) + 1;
      if (nextIdx != this.ui.allInputs.length) {
        $(this.ui.allInputs[nextIdx]).focus();
      }
    }
  },
  onRender: function() {
    if (this.ui.allInputs.length) {
      $(this.ui.allInputs[0]).focus();
    }
  }
});

module.exports = behavior;
