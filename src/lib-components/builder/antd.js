import {
  Input,
  InputNumber,
  Select,
  // Mentions,

  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Cascader,
  // Icon,
  Rate,
  Checkbox,
  DatePicker,
  TimePicker,
  AutoComplete,
  Steps,
  Divider
} from 'ant-design-vue';

import SFUpload from 'vue-antd-super-upload';

export default {
  // 类一
  input: Input,
  inputnumber: InputNumber,
  'textarea': Input.TextArea,
  'password': Input.Password,
  cascader: Cascader,
  autocomplete: AutoComplete,
  rate: Rate,
  slider: Slider,
  switch: Switch,
  datepicker: DatePicker,
  rangepicker: DatePicker.RangePicker,
  monthpicker: DatePicker.MonthPicker,
  weekpicker: DatePicker.WeekPicker,
  timepicker: TimePicker,

  // 类二
  button: Button,

  // 类三
  select: Select,
  // mentions: Mentions,
  radio: Radio.Group,
  radiogroup: Radio.Group,
  radiobutton: Radio,
  checkbox: Checkbox.Group,
  checkboxgroup: Checkbox.Group,

  //
  divider: Divider,
  //
  steps: Steps,

  // 类四
  upload: Upload,
  uploaddragger: Upload.Dragger,
  sfupload: SFUpload,

  // 自定义
}
