import { Modal, message } from 'ant-design-vue';
import Form from './Form';
import { toString, filter } from './utils';

export default {
  props: {
    ...Modal.props,
    footer: [Array, Function],
    search: [Object, Function],
    action: Function,
    extraParams: [Object, Function],
    actionError: Function,
    actionSuccess: Function
  },
  data() {
    return {
      isVisible: this.$props.visible || false,
      form: null,
    }
  },
  mounted() {
    console.log(this.form)
  },
  render(h) {
    const {
      children,
      visible,
      cancel = () => { },
      afterClose = () => { },
      ok = (e, form, show) => { },
      footer = (cancel, ok) => { },
      search, form = {},
      //
      action = false, extraParams, actionError, actionSuccess,
      //
      ...pr
    } = this.$props;

    let _onCancel = () => this._onCancel(cancel),
      _onOk = action !== false ? this.autoHandleSubmit : (e) => { ok(e, this.form, (f) => this.show(f)) };

    return h(Modal, {
      props: {
        visible: this.isVisible,
        afterClose: () => this._afterClose(afterClose),
        footer: toString.call(footer) === "[object Array]" ? footer : footer(_onCancel, _onOk),
        ...pr,
      },
      on: {
        cancel: _onCancel,
        ok: _onOk,
      }
    }, [
        h(Form, {
          props: {
            _bindForm: (form) => { this.form = form },
            ...search,
          }
        })
      ])
  },
  methods: {
    show(isShow = true, callback) {
      this.isVisible = isShow;
      callback && callback()
    },

    _onCancel(callback) {
      this.show(false, callback)
    },

    _afterClose(callback) {
      this.form.resetFields()
      callback && callback()
    },

    _getSearchParams() {
      return filter(this.form.getFieldsValue())
    },

    // 处理 自动 action start
    autoHandleSubmit() {
      const { action, extraParams = {}, actionError = (res) => { console.log(res) }, actionSuccess = (res) => { console.log(res) }, valueMap = (res) => {
        return {
          status: res.status
        }
      }, } = this.props;
      let _val = toString.call(extraParams) === "[object Function]" ? extraParams() : extraParams;
      let values = {
        ..._val,
        ...this._getSearchParams()
      }
      action(values).then(res => {
        const { status } = valueMap(res)
        if (status) {
          this.show(false, () => actionSuccess('操作成功'))
        } else {
          actionError(res.message)
        }
      }).catch(err => {
        actionError(err.message)
      })
    }
  }
}
