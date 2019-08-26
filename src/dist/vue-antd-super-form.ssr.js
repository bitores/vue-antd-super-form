'use strict';Object.defineProperty(exports,'__esModule',{value:true});var antDesignVue=require('ant-design-vue');var events = ['click', 'change', 'blur', 'focus', 'hoverChange', 'keyDown', 'select', 'ok', 'pressEnter'];

function injectEvent (obj, form) {
  var newObj = Object.assign({}, obj,
    {on: {}});

  events.forEach(function (item) {
    if (obj['on'] && obj['on'][item]) {
      newObj['on'][item] = function () {
        var ref;

        var props = [], len = arguments.length;
        while ( len-- ) props[ len ] = arguments[ len ];
        return (ref = obj['on'])[item].apply(ref, props.concat( [form] ));
      };
    }
  });

  return newObj;
}// import Func from './Func';
// import WrapperInput from './WrapperInput';
// import WrapperSwitch from './WrapperSwitch';
// import WrapperUpload from './WrapperUpload';

var AntdElements = {
  // 类一
  input: antDesignVue.Input,
  inputnumber: antDesignVue.InputNumber,
  'textarea': antDesignVue.Input.TextArea,
  'password': antDesignVue.Input.Password,
  cascader: antDesignVue.Cascader,
  autocomplete: antDesignVue.AutoComplete,
  rate: antDesignVue.Rate,
  slider: antDesignVue.Slider,
  switch: antDesignVue.Switch,
  datepicker: antDesignVue.DatePicker,
  rangepicker: antDesignVue.DatePicker.RangePicker,
  monthpicker: antDesignVue.DatePicker.MonthPicker,
  weekpicker: antDesignVue.DatePicker.WeekPicker,
  timepicker: antDesignVue.TimePicker,

  // 类二
  button: antDesignVue.Button,

  // 类三
  select: antDesignVue.Select,
  // mentions: Mentions,
  radio: antDesignVue.Radio.Group,
  radiogroup: antDesignVue.Radio.Group,
  radiobutton: antDesignVue.Radio,
  checkbox: antDesignVue.Checkbox.Group,
  checkboxgroup: antDesignVue.Checkbox.Group,

  //
  steps: antDesignVue.Steps,

  // 类四
  upload: antDesignVue.Upload,
  uploaddragger: antDesignVue.Upload.Dragger,

  // 自定义
};var toString = Object.prototype.toString;

var filter = function (fieldsValue) {
  var ret = {};
  var formValues = {};
  var values = Object.assign({}, fieldsValue);
  // 移除空的字段
  Object.keys(values).forEach(function (key) {
    var val = values[key];
    if (toString.call(val) !== "[object Undefined]" && val !== '') {
      if (toString.call(val) == "[object String]") {
        val = val.trim();
        if (val !== '') {
          formValues[key] = val;
        }

      } else {
        formValues[key] = val;
      }

    }
  });

  Object.keys(formValues).map(function (key) {
    if (!key.includes(',')) { ret[key] = formValues[key]; }
  });

  return ret;
};

var transToArray = function (obj) {
  if (toString.call(obj) === '[object Object]') {
    return Object.keys(obj).map(function (key) {
      return { label: obj[key], value: key }
    })
  } else if (toString.call(obj) === '[object Array]') {
    return obj;
  }

  throw new Error('need obj or array')
};function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }


function createFormItem (obj, form, createElement) {
  var type = obj.type; if ( type === void 0 ) type = 'defaultType';
  var rest = objectWithoutProperties( obj, ["type"] );
  var other = rest;
  // 事件参数注入
  var props = injectEvent(other, form);

  var t = type.toLocaleLowerCase();
  var Component = AntdElements[t];

  var formElement = null;
  switch (t) {
    case 'button': {
      var autoSearchEvent = props.autoSearchEvent;
      var on = props.on; if ( on === void 0 ) on = {};
      var buttonType = props.buttonType;
      var text = props.text;
      var style = props.style;
      var rest = objectWithoutProperties( props, ["autoSearchEvent", "on", "buttonType", "text", "style"] );
      var pr = rest;
      if (autoSearchEvent) {
        if (on.click) {
          var old = on.click;
          on.click = function (e) {
            old(e, form);
            autoSearchEvent(form);
          };
        } else {
          on.click = function (e) {
            autoSearchEvent(form);
          };
        }
      }

      formElement = createElement(Component, {
        style: style,
        props: Object.assign({}, {type: buttonType},
          pr),
        on: on,
      }, [
          text
        ]);
    }

      break;
    case 'input':
    case 'inputnumber': // InputNumber
    case 'password': // Input.Number
    case 'textarea': // Input.TextArea
    case 'switch':
    case 'slider':
    case 'datepicker':
    case 'rangepicker':
    case 'monthpicker':
    case 'weekpicker':
    case 'timepicker':
    case 'cascader':
    case 'autocomplete':
    case 'rate': {
      var style$1 = props.style;
      var on$1 = props.on; if ( on$1 === void 0 ) on$1 = {};
      var rest = objectWithoutProperties( props, ["style", "on"] );
      var pr$1 = rest;
      formElement = createElement(Component, {
        style: style$1,
        on: on$1,
        props: pr$1
      });
    }
      break;

    case 'checkbox':
    case 'radio':
    case 'checkboxgroup':
    case 'radiogroup': {
      var options = props.options; if ( options === void 0 ) options = [];
      var style$2 = props.style;
      var on$2 = props.on; if ( on$2 === void 0 ) on$2 = {};
      var rest = objectWithoutProperties( props, ["options", "style", "on"] );
      var pr$2 = rest;
      formElement = createElement(Component, {
        style: style$2,
        on: on$2,
        props: Object.assign({}, {options: transToArray(options)},
          pr$2)
      });
    }
      break;

    case 'select':
    case 'mentions': {
      var options$1 = props.options; if ( options$1 === void 0 ) options$1 = [];
      var style$3 = props.style;
      var on$3 = props.on; if ( on$3 === void 0 ) on$3 = {};
      var rest = objectWithoutProperties( props, ["options", "style", "on"] );
      var pr$3 = rest;

      formElement = createElement(Component, {
        style: style$3,
        on: on$3,
        props: Object.assign({}, pr$3)
      }, transToArray(options$1).map(function (item) { return createElement(Component.Option, {
        props: {
          key: item.key || item.value,
          value: item.value,
        }
      }, [
          item.label
        ]); }
      ));
    }
      break;

    case 'uploaddragger':
    case 'upload': {
      var innerHTML = props.innerHTML;
      var style$4 = props.style;
      var on$4 = props.on; if ( on$4 === void 0 ) on$4 = {};
      var rest = objectWithoutProperties( props, ["innerHTML", "style", "on"] );
      var pr$4 = rest;

      formElement = createElement(Component, {
        style: style$4,
        on: on$4,
        props: Object.assign({}, pr$4)
      }, [
          innerHTML && innerHTML()
        ]);
    }
      break;


    case 'radiobutton': {
      var options$2 = props.options; if ( options$2 === void 0 ) options$2 = [];
      var style$5 = props.style;
      var on$5 = props.on; if ( on$5 === void 0 ) on$5 = {};
      var rest = objectWithoutProperties( props, ["options", "style", "on"] );
      var pr$5 = rest;

      formElement = createElement(Component.Group, {
        style: style$5,
        on: on$5,
        props: Object.assign({}, pr$5)
      }, transToArray(options$2).map(function (item) { return createElement(Component.Button, {
        props: {
          key: item.key || item.value,
          value: item.value,
        }
      }, [
          item.label
        ]); }
      ));
    }
      break;

    case 'steps': {
      var options$3 = props.options; if ( options$3 === void 0 ) options$3 = [];
      var style$6 = props.style;
      var on$6 = props.on; if ( on$6 === void 0 ) on$6 = {};
      var rest = objectWithoutProperties( props, ["options", "style", "on"] );
      var pr$6 = rest;

      formElement = createElement(Component, {
        style: style$6,
        on: on$6,
        props: Object.assign({}, pr$6)
      }, transToArray(options$3).map(function (item) { return createElement(Component.Step, {
        props: Object.assign({}, {key: item.key || item.title},
          item)
      }); }
      ));
    }
      break;


    default: {
      formElement = createElement('input', {
        props: {
          placeholder: 'default element'
        }
      });
    }
  }

  return formElement;

}function objectWithoutProperties$1 (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }


function Form$1 () {

  return {
    props: {
      layout: String,
      formLayout: Object,
      data: [Array, Function],
      _bindForm: Function,
      autoSearchEvent: Function,
    },
    data: function data() {
      return {
        form: this.$form.createForm(this)
      }
    },
    beforeMount: function beforeMount() {
      var ref = this.$props;
      var _bindForm = ref._bindForm; if ( _bindForm === void 0 ) _bindForm = function () { };
      _bindForm(this.form);
    },

    render: function render(h) {
      var ref = this.$props;
      var formLayout = ref.formLayout;
      var layout = ref.layout; if ( layout === void 0 ) layout = "horizontal";
      var data = ref.data; if ( data === void 0 ) data = [];
      var autoSearchEvent = ref.autoSearchEvent;
      var form = this.form;
      var getFieldDecorator = form.getFieldDecorator;

      var _formLayout = formLayout || (layout === 'horizontal' ? {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      } : {});

      return h('a-form', {
        props: {
          form: this.form,
          layout: layout,
          // ..._formLayout, // vue 版本Form是没有 labelCol, WrapperCol, FormItem 有
          form: this.form,
        }
      }, [
          this._renderElement(h, _formLayout, form, getFieldDecorator, autoSearchEvent, this._transFuncToObj(data, form))
        ])
    },

    methods: {
      _getFieldsValue: function _getFieldsValue() {
        var ref = this.props;
        var form = ref.form;
        var fieldsValue = form.getFieldsValue();

        var formValues = filter(fieldsValue);

        return formValues;
      },

      _transFuncToObj: function _transFuncToObj(func, form) {
        if ( func === void 0 ) func = {};

        if (Object.prototype.toString.call(func) === '[object Function]') {
          return func(form, this)
        } else {
          return func;
        }
      },

      _renderElement: function _renderElement(createElement, formLayout, form, getFieldDecorator, autoSearchEvent, data) {
        var this$1 = this;
        if ( data === void 0 ) data = [];

        return data.map(function (item, index) {
          var visible = item.visible; if ( visible === void 0 ) visible = true;
          var label = item.label;
          var extra = item.extra; if ( extra === void 0 ) extra = null;
          var hasFeedback = item.hasFeedback; if ( hasFeedback === void 0 ) hasFeedback = false;
          var formItemLayout = item.formItemLayout; if ( formItemLayout === void 0 ) formItemLayout = {};
          var unbind = item.unbind;
          var key = item.key; if ( key === void 0 ) key = "random_key_" + (Math.random());
          var config = item.config; if ( config === void 0 ) config = {};
          var render = item.render;
          var renderFix = item.renderFix;
          var bindSearch = item.bindSearch; if ( bindSearch === void 0 ) bindSearch = false;
          var type = item.type;
          var rest = objectWithoutProperties$1( item, ["visible", "label", "extra", "hasFeedback", "formItemLayout", "unbind", "key", "config", "render", "renderFix", "bindSearch", "type"] );
          var props = rest;
          var ret = null;
          if (visible === false) {
            return;
          } else if (type === 'br') {
            return createElement('br', {
              key: index
            })
          } else if (type === 'span') {
            return createElement('span', {
              key: index,
              props: props,
            }, [
                label
              ])
          } else if (type === 'hidden') {
            return createElement('a-form-item', {
              style: {
                display: 'none'
              },
              props: {
                key: index,
              }
            }, [
                getFieldDecorator(key, this$1._transFuncToObj(config, form))(createFormItem({
                  type: 'input',
                  hidden: true,
                }, form, createElement))
              ])
          } else if (type === 'group') {
            ret = this$1._renderElement(createElement, formLayout, form, getFieldDecorator, autoSearchEvent, item.children);
          } else if (render) {
            var renderItem = render(form, Form.Item) || createElement('input', {
              attrs: {
                placeholder: "default: render need return"
              }
            });
            ret = unbind === true ? renderItem : getFieldDecorator(key, this$1._transFuncToObj(config, form))(renderItem);
          } else {

            var _item = Object.assign({}, {type: type},
              props);
            if (bindSearch) {
              _item.autoSearchEvent = autoSearchEvent;
            }
            var renderItem$1 = createFormItem(_item, form, createElement);
            ret = type === 'button' ? renderItem$1 : getFieldDecorator(key, this$1._transFuncToObj(config, form, this$1))(renderItem$1);
          }

          return createElement('a-form-item', {
            props: Object.assign({}, {label: label,
              key: index,
              extra: extra,
              hasFeedback: hasFeedback},
              formLayout,
              formItemLayout)
          }, [
              renderFix ? renderFix(ret) : ret
            ])
        })
      }
    }
  }
}function objectWithoutProperties$2 (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }

function hoc (Component) {
  return {
    props: Object.assign({}, Component.props,
      {pagination: {
        type: [Object, Boolean],
        default: true,
      },
      action: Function,
      params: Function,
      extraParams: [Function, Object],
      pageName: String,
      pageSizeName: String,
      valueMap: Function,
      actionError: Function,
      isInit: Boolean}),
    data: function data() {
      return {
        list: [],
        totalData: 0,
        currentPage: 1,
        pageSizeData: 10
      }

    },
    beforeMount: function beforeMount() {
      this._vueinit(this.$props, this.$props.isInit);
    },
    render: function render(h) {
      var this$1 = this;

      // const { list, totalData, currentPage, pageSizeData } = this.$data;
      var ref = this.$props;
      var pagination = ref.pagination; if ( pagination === void 0 ) pagination = true;
      var action = ref.action;
      var params = ref.params;
      var extraParams = ref.extraParams;
      var pageName = ref.pageName;
      var pageSizeName = ref.pageSizeName;
      var valueMap = ref.valueMap;
      var actionError = ref.actionError;
      var isInit = ref.isInit;
      var rest = objectWithoutProperties$2( ref, ["pagination", "action", "params", "extraParams", "pageName", "pageSizeName", "valueMap", "actionError", "isInit"] );
      var props = rest;

      // 追加 pagination 配置
      var _pagination = null;
      if (pagination === false) {
        _pagination = false;
      } else {
        var total = pagination.total;
        var current = pagination.current;
        var pageSize = pagination.pageSize;
        var showSizeChanger = pagination.showSizeChanger; if ( showSizeChanger === void 0 ) showSizeChanger = true;
        var onChange = pagination.onChange; if ( onChange === void 0 ) onChange = function () { return null; };
        var showTotal = pagination.showTotal; if ( showTotal === void 0 ) showTotal = function (total, range) { return ((range[0]) + "-" + (range[1]) + " 条, 共 " + total + " 条"); };
        var onShowSizeChange = pagination.onShowSizeChange; if ( onShowSizeChange === void 0 ) onShowSizeChange = function () { return null; };
        var rest = objectWithoutProperties$2( pagination, ["total", "current", "pageSize", "showSizeChanger", "onChange", "showTotal", "onShowSizeChange"] );
        var config = rest;
        _pagination = Object.assign({}, {total: this.totalData || this.$props.total || 0, // vue 自动处理 total
          current: this.currentPage,
          pageSize: this.pageSizeData,
          onChange: function () {
            var ref;

            var pr = [], len = arguments.length;
            while ( len-- ) pr[ len ] = arguments[ len ];
            (ref = this$1)._pageChange.apply(ref, pr);
            onChange.apply(void 0, pr);
          },
          showTotal: showTotal,
          showSizeChanger: showSizeChanger,
          onShowSizeChange: function (current, pageSize) {
            this$1._pageChange(current, pageSize);
            onShowSizeChange(current, pageSize);
          }},
          config);
      }

      return h(Component, {
        props: Object.assign({}, props,
          {dataSource: this.list || [],
          pagination: _pagination})
      })
    },
    methods: {
      // 在生命周期中 使用 props 时要注意其有效性
      _vueinit: function _vueinit(props, isInit) {
        var ref;

        if ( isInit === void 0 ) isInit = false;
        var pagination = props.pagination; if ( pagination === void 0 ) pagination = true;
        var dataSource = props.dataSource;
        var total = props.total; if ( total === void 0 ) total = 0;
        var current = pagination.current; if ( current === void 0 ) current = 1;
        var pageSize = pagination.pageSize; if ( pageSize === void 0 ) pageSize = 10;
        this.list.splice(0)
        (ref = this.list).push.apply(ref, dataSource);
        this.totalData = total;
        this.currentPage = current;
        this.pageSizeData = pageSize;

        // 初始化 是否要求加载数据
        isInit && this._loadData();
      },

      // 同步初始化数据
      // componentWillMount() {
      // },

      // 处理异步传入的props, 只设置状态不进行数据加载
      // 避免由于父组件状态更新引起 数据重新获取
      // 不能要, 父组件更新, 状态回到初始值, 也不好
      // 但要解决异步 props 问题
      // componentWillReceiveProps(nextProps) {
      //   this._vueinit(nextProps, false);
      // }

      // 重新触发按钮搜索时
      // 重置 状态回到初始并加载数据
      // 有时只是要求重置状态, 并不要求进行数据加载
      // 可以在异步 props 时进行手动调用, 不在 WillReceiveProps 中进行处理
      reset: function reset(needLoad) {
        if ( needLoad === void 0 ) needLoad = true;

        this._vueinit(this.$props, needLoad);
      },

      // 刷新 当前状态下进行数据加载
      refresh: function refresh() {
        this._loadData();
      },

      // 换页 改变状态下进行数据加载
      _pageChange: function _pageChange(currentPage, pageSizeData) {
        if ( currentPage === void 0 ) currentPage = 1;
        if ( pageSizeData === void 0 ) pageSizeData = 10;

        this.currentPage = currentPage;
        this.pageSizeData = pageSizeData;
        this._loadData();
      },

      _loadData: function _loadData() {
        var this$1 = this;
        var obj;

        var ref = this.$data;
        var currentPage = ref.currentPage;
        var pageSizeData = ref.pageSizeData;
        var ref$1 = this.$props;
        var action = ref$1.action;
        var pageName = ref$1.pageName; if ( pageName === void 0 ) pageName = "page";
        var pageSizeName = ref$1.pageSizeName; if ( pageSizeName === void 0 ) pageSizeName = "pageSize";
        var valueMap = ref$1.valueMap; if ( valueMap === void 0 ) valueMap = function (res) {
            return {
              status: res.status,
              dataSource: res.entry,
              total: res.totalRecordSize
            }
          };
        var actionError = ref$1.actionError; if ( actionError === void 0 ) actionError = function (msg) { return console.error(msg); };
        var params = ref$1.params; if ( params === void 0 ) params = function () { return ({}); };
        var extraParams = ref$1.extraParams; if ( extraParams === void 0 ) extraParams = function () { return ({}); };

        var _val = toString.call(extraParams) === "[object Function]" ? extraParams() : extraParams;
        var values = Object.assign({}, _val,
          // 获取内部搜索参数,
          params(),
          ( obj = {}, obj[pageName] = this.currentPage, obj[pageSizeName] = this.pageSizeData, obj ));

        var request = null;
        if (action) {
          request = action(values);
        } else {
          throw new Error('need action filed')
        }

        request.then(function (res) {
          var ref$1;

          var ref = valueMap(res);
          var dataSource = ref.dataSource;
          var total = ref.total;
          var status = ref.status;


          if (status) {
            this$1.list.splice(0)
            (ref$1 = this$1.list).push.apply(ref$1, dataSource);
            this$1.totalData = total;

          } else {
            actionError(res.message);
          }
        });
      }
    }
  }
}var Table = hoc(antDesignVue.Table);var List = hoc(antDesignVue.List);function withSearch (Component) {
  return {

    props: Object.assign({}, Component.props),

    beforeMount: function beforeMount() {
      // this.hoc = null;
      this.form = null;
    },

    render: function render(h) {
      var this$1 = this;

      var props = Object.assign({}, this.$props,
        // 新增了 两个函数, 一个是获取参数数据, 一个是进行请求
        {params: function () { return this$1._getSearchParams(); },
        // 每次点击, 都是重置数据
        autoSearchEvent: function () { return this$1.reset(); },
        // 获取 form 实例
        _bindForm: function (form) { this$1.form = form; }});

      return h(Component, {
        ref: "hoc",
        props: props
      })
    },

    methods: {
      reset: function reset(needLoad) {
        if ( needLoad === void 0 ) needLoad = true;

        this.$refs.hoc.reset(needLoad);
      },

      // 由子类进行实现或重写
      refresh: function refresh() {
        this.$refs.hoc.refresh();
      },


      _getSearchParams: function _getSearchParams() {
        return filter(this.form.getFieldsValue())
      }
    }
  }
}function objectWithoutProperties$3 (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }


var SuperPage = function () {
  return {
    props: {
      type: String,
      search: Object,
      params: Function,
      autoSearchEvent: Function,
      _bindForm: Function,
      table: Object,
      formStyle: Object,
      tableStyle: Object
    },
    render: function render(h) {
      var ref = this.$props;
      var type = ref.type; if ( type === void 0 ) type = 'table';
      var search = ref.search;
      var autoSearchEvent = ref.autoSearchEvent;
      var _bindForm = ref._bindForm;
      var table = ref.table;
      var formStyle = ref.formStyle; if ( formStyle === void 0 ) formStyle = {};
      var tableStyle = ref.tableStyle; if ( tableStyle === void 0 ) tableStyle = {};
      var rest = objectWithoutProperties$3( ref, ["type", "search", "autoSearchEvent", "_bindForm", "table", "formStyle", "tableStyle"] );
      var props = rest;


      return h('div', null, [
        h('div', {
          style: Object.assign({}, {"background": "#fff",
            "padding": "20px",
            "border-radius": "5px",
            "margin-bottom": "10px"},
            formStyle),
        }, [
            h(Form$1(), {
              props: Object.assign({}, search,
                {autoSearchEvent: autoSearchEvent,
                _bindForm: _bindForm})
            })
          ]),
        h('div', {
          style: Object.assign({}, {"background": "#fff",
            "padding": "20px",
            "border-radius": "5px",
            "margin-bottom": "10px"},
            tableStyle),
        }, [
            h(type === "table" ? Table : List, {
              ref: "list",
              props: Object.assign({}, table,
                props)
            })
          ])
      ])
    },
    methods: {
      reset: function reset(needLoad) {
        if ( needLoad === void 0 ) needLoad = true;

        this.$refs.list.reset(needLoad);
      },

      refresh: function refresh() {
        this.$refs.list.refresh();
      }
    }
  }
};

var VueAntdSuperForm = withSearch(SuperPage());// Import vue components

var components = {
  VueAntdSuperForm: VueAntdSuperForm,
  Form: Form$1(),
  List: List,
  Table: Table
};


// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Object.keys(components).forEach(function (componentName) {
    Vue.component(componentName, components[componentName]);
  });
}

// Create module definition for Vue.use()
var plugin = {
  install: install,
};

// To auto-install when vue is found
/* global window global */
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

// To allow individual component use, export components
// each can be registered via Vue.component()
// export const f = components;
exports.components=components;exports.default=plugin;