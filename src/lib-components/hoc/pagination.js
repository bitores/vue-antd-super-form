import { toString } from '../utils';

export default (Component) => {
  return {
    props: {
      ...Component.props,
      pagination: {
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
      isInit: Boolean
    },
    data() {
      return {
        list: [],
        totalData: 0,
        currentPage: 1,
        pageSizeData: 10
      }

    },
    beforeMount() {
      this._vueinit(this.$props, this.$props.isInit)
    },
    render(h) {
      // const { list, totalData, currentPage, pageSizeData } = this.$data;
      const { pagination = true, action, params, extraParams, pageName, pageSizeName, valueMap, actionError, isInit,
        // dataSource,
        ...props } = this.$props;

      // 追加 pagination 配置
      let _pagination = null;
      if (pagination === false) {
        _pagination = false
      } else {
        const {
          total, current, pageSize,
          showSizeChanger = true,
          onChange = () => null,
          showTotal = (total, range) => `${range[0]}-${range[1]} 条, 共 ${total} 条`,
          onShowSizeChange = () => null,
          ...config
        } = pagination;
        _pagination = {
          total: this.totalData || this.$props.total || 0, // vue 自动处理 total
          current: this.currentPage,
          pageSize: this.pageSizeData,
          onChange: (...pr) => {
            this._pageChange(...pr);
            onChange(...pr);
          },
          showTotal,
          showSizeChanger,
          onShowSizeChange: (current, pageSize) => {
            this._pageChange(current, pageSize);
            onShowSizeChange(current, pageSize)
          },
          ...config
        }
      }

      return h(Component, {
        props: {
          ...props,
          dataSource: this.list || [],
          pagination: _pagination
        }
      })
    },
    methods: {
      // 在生命周期中 使用 props 时要注意其有效性
      _vueinit(props, isInit = false) {
        const { pagination = true, dataSource, total = 0 } = props;
        const { current = 1, pageSize = 10 } = pagination;
        this.list.splice(0)
        this.list.push(...dataSource);
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
      reset(needLoad = true) {
        this._vueinit(this.$props, needLoad)
      },

      // 刷新 当前状态下进行数据加载
      refresh() {
        this._loadData();
      },

      // 换页 改变状态下进行数据加载
      _pageChange(currentPage = 1, pageSizeData = 10) {
        this.currentPage = currentPage;
        this.pageSizeData = pageSizeData;
        this._loadData();
      },

      _loadData() {
        const { currentPage, pageSizeData } = this.$data;
        const { action, pageName = "page", pageSizeName = "pageSize",
          valueMap = (res) => {
            return {
              status: res.status,
              dataSource: res.entry,
              total: res.totalRecordSize
            }
          },
          actionError = (msg) => console.error(msg),
          params = () => ({}),
          extraParams = () => ({})
        } = this.$props;

        let _val = toString.call(extraParams) === "[object Function]" ? extraParams() : extraParams;
        const values = {
          // 获取外部搜索参数
          ..._val,
          // 获取内部搜索参数,
          ...params(),
          [pageName]: this.currentPage,
          [pageSizeName]: this.pageSizeData
        }

        let request = null;
        if (action) {
          request = action(values);
        } else {
          throw new Error('need action filed')
        }

        request.then(res => {
          const { dataSource, total, status } = valueMap(res);


          if (status) {
            this.list.splice(0)
            this.list.push(...dataSource);
            this.totalData = total;

          } else {
            actionError(res.message)
          }
        })
      }
    }
  }
}