'use strict';

Object.defineProperty(exports, "__esModule", {
     value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (newVal, oldVal) {

     if (this.isIdenticalValue(oldVal, newVal)) return;

     var form = this.getForm();

     var data = { name: this.Name, value: newVal, oldValue: oldVal };

     if (_typeof(this.flatItems) === 'object') {
          var val = this.multiple ? newVal : [newVal];
          var selected = this.flatItems.filter(function (item) {
               return val.indexOf(item.id) > -1;
          });
          data = (0, _merge2.default)(data, { selected: selected });
     }

     form.dispatch('change::' + this.Name, data);
     form.dispatch('change', data);
     this.$emit('changed', data);

     if (typeof this.foreignFields != 'undefined') {
          this.foreignFields.forEach(function (field) {
               if (field) field.validate();
          });
     }

     this.handleTriggeredFields();
     this.dirty = this.wasReset ? false : !_isEqual2.default.apply(this, [this.value, this.initialValue]);

     this.pristine = this.wasReset;

     this.wasReset = false;

     if (this.inForm() && !form.opts.disableValidation) {
          this.validate();
     }
};

var _isEqual = require('../../helpers/is-equal');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }