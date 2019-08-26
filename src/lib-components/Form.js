
import createFormItem from './builder';
import { filter } from './utils';


export default () => {

  return {
    props: {
      layout: String,
      formLayout: Object,
      data: [Array, Function],
      _bindForm: Function,
      autoSearchEvent: Function,
    },
    data() {
      return {
        form: this.$form.createForm(this)
      }
    },
    beforeMount() {
      const { _bindForm = () => { } } = this.$props;
      _bindForm(this.form)
    },

    render(h) {
      const { formLayout, layout = "horizontal", data = [], autoSearchEvent } = this.$props;
      const form = this.form;
      const { getFieldDecorator } = form;

      let _formLayout = formLayout || (layout === 'horizontal' ? {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      } : {})

      return h('a-form', {
        props: {
          form: this.form,
          layout,
          // ..._formLayout, // vue 版本Form是没有 labelCol, WrapperCol, FormItem 有
          form: this.form,
        }
      }, [
          this._renderElement(h, _formLayout, form, getFieldDecorator, autoSearchEvent, this._transFuncToObj(data, form))
        ])
    },

    methods: {
      _getFieldsValue() {
        const { form } = this.props;
        let fieldsValue = form.getFieldsValue();

        let formValues = filter(fieldsValue);

        return formValues;
      },

      _transFuncToObj(func = {}, form) {
        if (Object.prototype.toString.call(func) === '[object Function]') {
          return func(form, this)
        } else {
          return func;
        }
      },

      _renderElement(createElement, formLayout, form, getFieldDecorator, autoSearchEvent, data = []) {
        return data.map((item, index) => {
          const {
            // 组件是否渲染
            visible = true,

            // Form.Item 属性
            label,
            extra = null,
            hasFeedback = false,
            formItemLayout = {},

            // getFieldDecorator 参数
            unbind,
            key = `random_key_${Math.random()}`,
            config = {},

            // 自定义组件渲染(即不包含在已有组件列表中)
            render,
            // 在一些特殊布局中使用
            renderFix,

            // button 是否绑定 搜索事件
            bindSearch = false,

            // 组件类型
            type,
            // 组件固有属性
            ...props
          } = item;
          let ret = null;
          if (visible === false) {
            return;
          } else if (type === 'br') {
            return createElement('br', {
              key: index
            })
          } else if (type === 'span') {
            return createElement('span', {
              key: index,
              props,
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
                getFieldDecorator(key, this._transFuncToObj(config, form))(createFormItem({
                  type: 'input',
                  hidden: true,
                }, form, createElement))
              ])
          } else if (type === 'group') {
            ret = this._renderElement(createElement, formLayout, form, getFieldDecorator, autoSearchEvent, item.children)
          } else if (render) {
            let renderItem = render(form, Form.Item) || createElement('input', {
              attrs: {
                placeholder: "default: render need return"
              }
            })
            ret = unbind === true ? renderItem : getFieldDecorator(key, this._transFuncToObj(config, form))(renderItem)
          } else {

            let _item = {
              type,
              ...props
            }
            if (bindSearch) {
              _item.autoSearchEvent = autoSearchEvent;
            }
            let renderItem = createFormItem(_item, form, createElement);
            ret = type === 'button' ? renderItem : getFieldDecorator(key, this._transFuncToObj(config, form, this))(renderItem)
          }

          return createElement('a-form-item', {
            props: {
              label,
              key: index,
              extra,
              hasFeedback,
              ...formLayout,
              ...formItemLayout,
            }
          }, [
              renderFix ? renderFix(ret) : ret
            ])
        })
      }
    }
  }
}