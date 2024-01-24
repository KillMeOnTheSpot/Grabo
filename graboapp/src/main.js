import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { fa } from "vuetify/iconsets/fa";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";

import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#FFFFFF',
    'surface-variant': '#FFFFFF',
    'on-surface-variant': '#FFFFFF',
    primary: '#FFFFFF',
    'primary-darken-1': '#FFFFFF',
    secondary: '#FFFFFF',
    'secondary-darken-1': '#FFFFFF',
    error: '#FFFFFF',
    info: '#FFFFFF',
    success: '#FFFFFF',
    warning: '#FFFFFF',
  },
  variables: {
    'border-color': '#FFFFFF',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.60,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#FFFFFF',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#FFFFFF',
    'theme-on-code': '#FFFFFF',
  }
};

const vuetify = createVuetify({
 
  theme:{
    defaultTheme : 'myCustomLightTheme',
    themes:{
      myCustomLightTheme,
    }
  },

  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
      fa,
    },
  },
  components,
  directives,  
})

createApp(App).use(vuetify).mount('#app')

