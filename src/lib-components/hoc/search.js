import { toString, filter } from '../utils';

export default (Component) => {
  return {

    props: {
      ...Component.props,
    },

    beforeMount() {
      // this.hoc = null;
      this.form = null;
    },

    render(h) {
      const props = {
        // 继承了配置
        ...this.$props,
        // 新增了 两个函数, 一个是获取参数数据, 一个是进行请求
        params: () => this._getSearchParams(),
        // 每次点击, 都是重置数据
        autoSearchEvent: () => this.reset(),
        // 获取 form 实例
        _bindForm: (form) => { this.form = form }
      }

      return h(Component, {
        ref: "hoc",
        props
      })
    },

    methods: {
      reset(needLoad = true) {
        this.$refs.hoc.reset(needLoad)
      },

      // 由子类进行实现或重写
      refresh() {
        this.$refs.hoc.refresh()
      },


      _getSearchParams() {
        return filter(this.form.getFieldsValue())
      }
    }
  }
}