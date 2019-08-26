// Import vue components
import VueAntdSuperForm from './lib-components/index';
import Table from './lib-components/Table';
import List from './lib-components/List';
import Form from './lib-components/Form';
import Modal from './lib-components/Modal';

export const components = {
  VueAntdSuperForm,
  Form,
  List,
  Table,
  Modal
}


// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.keys(components).forEach((componentName) => {
    Vue.component(componentName, components[componentName]);
  });
}

// Create module definition for Vue.use()
const plugin = {
  install,
};

// To auto-install when vue is found
/* global window global */
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

// Default export is library as a whole, registered via Vue.use()
export default plugin;
