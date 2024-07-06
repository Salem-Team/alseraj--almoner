import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vuetify/styles";
import { ref } from "vue";
import { createPinia } from "pinia";
// Initialize Pinia
const pinia = createPinia();

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

library.add(faCoffee);

// تسجيل مكون FontAwesomeIcon
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const vuetify = createVuetify({
  components,
  directives,
});
createApp(App)
  .use(ref)
  .use(pinia)
  .use(store)
  .use(vuetify)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
