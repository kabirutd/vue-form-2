'use strict';

var merge = require('merge');
var clone = require('clone');
var Field = require('./field');

module.exports = function (globalOptions) {
  return merge.recursive(Field(), {
    data: function data() {
      return {
        fieldType: 'file'
      };
    },
    props: {
      options: {
        type: Object,
        required: false,
        default: function _default() {
          return {};
        }
      },
      ajax: {
        type: Boolean
      },
      dest: {
        type: String,
        default: '/'
      },
      done: {
        type: Function
      },
      url: {
        type: String
      },
      error: {
        type: Function
      },
      valueKey: {
        type: String
      },
      onSubmit: {
        type: Function,
        required: false
      }
    },
    mounted: function mounted() {

      if (!this.ajax) return;

      if (typeof $ == 'undefined') {
        console.error('vue-form-2: missing global dependency: vf-file with ajax depends on JQuery');
        return;
      }

      if (typeof $(this.$el).fileupload == 'undefined') {
        console.error('vue-form-2: missing global dependency: vf-file with ajax depends on the jQuery-File-Upload plugin');
        return;
      }

      var self = this;
      var parentOptions = this.inForm() ? clone(this.getForm().options.fileOptions) : {};

      var options = merge.recursive(globalOptions, parentOptions, this.options);

      if (this.url) options.url = this.url;
      if (!options.hasOwnProperty("formData")) options.formData = {};

      options.formData.rules = JSON.stringify(this.Rules);

      if (!options.formData.hasOwnProperty('dest')) {
        options.formData.dest = this.dest;
      }

      options.done = function (e, _ref) {
        var result = _ref.result;

        var value = self.valueKey ? result[self.valueKey] : result;
        // update the model
        self.$emit('input', value);
        // send event with response data for the consumer's use
        self.$emit('upload', result);
      };

      if (!options.hasOwnProperty('add')) {
        options.add = this.onSubmit;
      }

      if (!options.hasOwnProperty('error')) {
        options.error = this.error ? this.error : function (e, data) {
          console.error("Upload failed. See full error data below");
          console.error(e);
        };
      }

      $(this.$el).find("input[type=file]").fileupload(options);
    }
  });
};