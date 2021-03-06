'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (newVal, oldVal) {

  var form = this.getForm();

  if (this.inForm() && !form.opts.disableValidation) {
    this.validate();
  }

  if (this.isIdenticalValue(oldVal, newVal)) return;

  var data = { name: this.Name, value: newVal, oldValue: oldVal };

  if (_typeof(this.flatItems) === 'object') {
    var val = this.multiple ? newVal : [newVal];
    var selected = this.flatItems.filter(function (item) {
      return val.indexOf(item.id) > -1;
    });
    data = (0, _merge2.default)(data, { selected: selected });
  }

  if (typeof oldVal === 'undefined' ? 'undefined' : _typeof(oldVal)) form.dispatch('change::' + this.Name, data);
  form.dispatch('change', data);
  this.$emit('changed', data);

  if (typeof this.foreignFields != 'undefined') {
    this.foreignFields.forEach(function (field) {
      if (field) field.validate();
    });
  }

  this.handleTriggeredFields();

  this.pristine = this.wasReset;

  this.wasReset = false;
};

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }