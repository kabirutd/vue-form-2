'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {
  var _this = this;

  var toggler = '';
  var items = [];

  if (this.disabled) {
    toggler = '';
  } else if (this.multiple) {
    toggler = h(
      'span',
      { 'class': 'pull-right btn btn-link',
        on: {
          'click': this.toggle.bind(this)
        }
      },
      [this.toggleText]
    );
  } else {
    toggler = this.value ? h(
      'span',
      { 'class': 'pull-right btn btn-link',
        on: {
          'click': this.clear.bind(this)
        }
      },
      [this.clearText]
    ) : '';
  }

  this.items.map(function (item) {
    if (_this.passesFilter(item)) items.push(h(
      'div',
      { 'class': _this.itemClass },
      [h(
        'label',
        { 'class': 'form-check-label' },
        [h('input', {
          'class': 'form-check-input',
          attrs: { disabled: _this.disabled,
            name: _this.Name + _this.arraySymbol,
            type: _this.type
          },
          domProps: {
            'value': item.id,
            'checked': _this.isChecked(item.id)
          },
          on: {
            'change': function change(e) {
              _this.$emit('input', e.target.value);
            }
          }
        }), h(
          'span',
          { 'class': 'form-check-label-text' },
          [item.text]
        )]
      )]
    ));
  });

  var content = items.length ? [toggler, items] : [this.getForm().opts.texts.noItems];

  return h(
    'div',
    { 'class': 'VF-Buttons__wrapper' },
    [content]
  );
};