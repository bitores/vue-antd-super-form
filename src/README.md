# vue-antd-super-form

[在线案例](https://codesandbox.io/s/vue-antd-super-form-6ey0l)


### install
> npm i -S vue-antd-super-form


```jsx
<vue-antd-super-form 
  formStyle:{}
  tableStyle:{}
  :search={}
  :table={}
/>
```


### search 字段配置
```jsx
data = [
  {
    visible: true, // 默认 true,  组件是否渲染
    label: 'xxx', // FormItem label 标签, 非必填
    type: 'select', // ['br','span', 'group', 'button', 'input','inputnumber','select','radio','radiobutton','slider','textarea','checkbox','datepicker','rangepicker', 'monthpicker', 'timepicker', 'switch','upload','cascader','steps']

    unbind: false, // 非输入组件 建议必填, 
    key: 'xxx', // 输入组件必填, 非输入组件可不填, 建议必填: key 值中 如果包含有逗号则此参数在提交时会被过滤
    config: { // for 
      initialValue: 1
    },

    render: (form)=>{},
    renderFix: (item)=> item,

    style: {
      width: 100
    },
    placeholder: '请选择',
    // for select | radio | radiobutton | slider | checkbox
    options: [
      {label: '订单号', value: 1}
      {label: '手机号', value: 2}
    ]

  
    // For button
    text: '', // 按钮文案
    tp: 'primary',
    bindSearch: true|false, // 自动绑定搜索事件
    onClick(event, form),

    // for upload
    children:()=>{
      return <div>点我上传</div>
    }

    // for form item
    formItemLayout:{
      labelCol: { span: 2 },
      wrapperCol: { span: 14 },
    }
    // other
    ...
  },
]
```

### table 字段配置
```jsx
table = {
type:"list|table",
columns:columns,
rowKey={"id"},
pagination={
// 配置同 antd
},
// 扩展属性
// 是否开始时进行 action 进行调用
isInit:true|false,
// 数据请求的处理函数
action:func,
// 接口数据 返回值 res 与 组件内字段完成 映射, list 为数据数组, total 为 数据量, status 为接口是否正常
valueMap:(res) => {
  return {
    status: res.status,
    dataSource: res.entry||[],
    total: res.totalRecordSize
  }
},
// 分页请求字段重命名[可选]
pageName:"",
pageSizeName:"",
// 附加参数
extraParams: ()=>{},
// 初始化数据量[可选]
total:0,
// 初始化数据[可选]
dataSource={[]},
// antd Table 固有属性
{...prop}
}


```

[更多配置参考 react 版本的](https://www.npmjs.com/package/react-antd-super-form)

## License

MIT © [bitores](https://github.com/bitores)