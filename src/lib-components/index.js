import Form from './Form';
import Table from './Table';
import List from './List';

import withSearch from './hoc/search';


const SuperPage = () => {
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
    render(h) {
      const {
        type = 'table',   // 类型
        search, autoSearchEvent, _bindForm, // search form 配置, onSearch 为自动传入事件
        table,  // table or list 配置
        // 样式
        formStyle = {},
        tableStyle = {},
        ...props // 后面就放弃这个参数, table 参数放在 table 中就ok了
      } = this.$props;


      return h('div', null, [
        h('div', {
          style: {
            "background": "#fff",
            "padding": "20px",
            "border-radius": "5px",
            "margin-bottom": "10px",
            ...formStyle
          },
        }, [
            h(Form(), {
              props: {
                ...search,
                autoSearchEvent,
                _bindForm
              }
            })
          ]),
        h('div', {
          style: {
            "background": "#fff",
            "padding": "20px",
            "border-radius": "5px",
            "margin-bottom": "10px",
            ...tableStyle
          },
        }, [
            h(type === "table" ? Table : List, {
              ref: "list",
              props: {
                ...table,
                ...props
              }
            })
          ])
      ])
    },
    methods: {
      reset(needLoad = true) {
        this.$refs.list.reset(needLoad);
      },

      refresh() {
        this.$refs.list.refresh();
      }
    }
  }
}

export default withSearch(SuperPage())