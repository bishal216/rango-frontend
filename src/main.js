import "./assets/styles/main.css";
import { loadAndApplyThemeConfig } from "@/composables/useLayout";
import Aura from "@primeuix/themes/aura";
import PrimeVue from "primevue/config";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".p-dark",
    },
  },
});
loadAndApplyThemeConfig();

import { Button } from "primevue";

app.component("Button", Button);
app.mount("#app");
