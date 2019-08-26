const events = ['click', 'change', 'blur', 'focus', 'hoverChange', 'keyDown', 'select', 'ok', 'pressEnter'];

export default (obj, form) => {
  const newObj = {
    ...obj,
    on: {}
  }

  events.forEach((item) => {
    if (obj['on'] && obj['on'][item]) {
      newObj['on'][item] = (...props) => obj['on'][item](...props, form)
    }
  })

  return newObj;
}
