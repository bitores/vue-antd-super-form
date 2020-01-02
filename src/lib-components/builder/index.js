import injectEvent from './inject-event';
import AntdElements from './antd';
import { transToArray } from '../utils';


export default (obj, form, createElement) => {
  const { type = 'defaultType', ...other } = obj;
  // 事件参数注入
  const props = injectEvent(other, form);

  const t = type.toLocaleLowerCase();
  const Component = AntdElements[t];

  let formElement = null;
  switch (t) {
    case 'button': {
      let { autoSearchEvent, on = {}, buttonType, text, style, ...pr } = props;
      if (autoSearchEvent) {
        if (on.click) {
          let old = on.click;
          on.click = (e) => {
            old(e, form)
            autoSearchEvent(form);
          }
        } else {
          on.click = (e) => {
            autoSearchEvent(form);
          }
        }
      }

      formElement = createElement(Component, {
        style,
        props: {
          type: buttonType,
          ...pr,
        },
        on,
      }, [
        text
      ])
    }

      break;
    case 'divider': {
      let { sfType, text, style, on = {}, ...pr } = props;

      formElement = createElement(Component, {
        style,
        on,
        props: {
          type: sfType,
          ...pr,
        },
      })
    } break;

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
      const { style, on = {}, ...pr } = props;
      formElement = createElement(Component, {
        style,
        on,
        props: pr
      })
    }
      break;

    case 'checkbox':
    case 'radio':
    case 'checkboxgroup':
    case 'radiogroup': {
      const { options = [], style, on = {}, ...pr } = props;
      formElement = createElement(Component, {
        style,
        on,
        props: {
          options: transToArray(options),
          ...pr
        }
      })
    }
      break;

    case 'select':
    case 'mentions': {
      const { options = [], style, on = {}, ...pr } = props;

      formElement = createElement(Component, {
        style,
        on,
        props: {
          ...pr
        }
      }, transToArray(options).map(item => createElement(Component.Option, {
        props: {
          key: item.key || item.value,
          value: item.value,
        }
      }, [
        item.label
      ])
      ));
    }
      break;

    case 'uploaddragger':
    case 'sfupload':
    case 'upload': {
      const { innerHTML, style, on = {}, ...pr } = props;

      formElement = createElement(Component, {
        style,
        on,
        props: {
          ...pr
        }
      }, [
        innerHTML && innerHTML()
      ])
    }
      break;


    case 'radiobutton': {
      const { options = [], style, on = {}, ...pr } = props;

      formElement = createElement(Component.Group, {
        style,
        on,
        props: {
          ...pr
        }
      }, transToArray(options).map(item => createElement(Component.Button, {
        props: {
          key: item.key || item.value,
          value: item.value,
        }
      }, [
        item.label
      ])
      ));
    }
      break;

    case 'steps': {
      const { options = [], style, on = {}, ...pr } = props;

      formElement = createElement(Component, {
        style,
        on,
        props: {
          ...pr
        }
      }, transToArray(options).map(item => createElement(Component.Step, {
        props: {
          key: item.key || item.title,
          ...item,
        }
      })
      ));
    }
      break;


    default: {
      formElement = createElement('input', {
        props: {
          placeholder: 'default element'
        }
      })
    }
  }

  return formElement;

}