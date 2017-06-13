import _ from  'underscore';
import Backbone from 'backbone';
import Radio from 'backbone.radio';
import $ from 'jquery';
import Marionette from 'backbone.marionette';
import Bootstrap from 'bootstrap-sass';
import Validation from 'backbone.validation';
import Handlebars from 'handlebars';
import Bootbox from 'bootbox';
import Paginator from 'backbone.paginator';
import Toastr from 'toastr';
import Cookies from 'js-cookie';
Backbone.$ = $;
Bootstrap.$ = $;
window.jQuery = window.$ = $;

Toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

export {_, $, Toastr, Backbone, Marionette, Radio, Bootstrap, Validation, Paginator, Handlebars, Bootbox, Cookies};
