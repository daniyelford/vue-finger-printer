# 🖐️ Vue Finger Printer

A simple and elegant Vue 3 component that lets users **draw and send fingerprints** via a Canvas element.  
Ideal for experiments, signature pads, or creative user authentication flows.

---

## 🚀 Installation

With **npm**:
```bash
npm install vue-finger-printer
```
## 🧩 Usage

In your main.js or main.ts file:

```js
import { createApp } from 'vue'
import App from './App.vue'
import VueFingerPrinter from 'vue-finger-printer'

const app = createApp(App)
app.use(VueFingerPrinter)
app.mount('#app')

```
--- 
Then use the component anywhere in your Vue app:
```vue
<template>
  <VueFingerPrinter
    :url="'https://example.com/upload'"
    :autoSend="true"
    :css="customCss"
    @send="handleSend"
    @error="handleError"
  />
</template>

<script setup>
    const customCss = `
    .fingerprint-container {}
    .fingerprint-sensor {} 
    .status {}
    .buttons {}`
    function handleSend(data) {
        console.log('Fingerprint sent or data received:', data)
    }
    function handleError(err) {
        console.error('Error sending fingerprint:', err)
    }
</script>
```
### ⚙️ Props

| Prop	| Type | Default | Description |
|:-----:|:----:|:-------:|:-----------:|
| `url` | String | "" | The API endpoint to send the fingerprint image (Base64 PNG)|
| `autoSend` | Boolean | false | If true, automatically sends the fingerprint to the given url|
| `css` | String | "" | custom style with css code |
### 🎯 Events
| Event | Payload |	Description |
|:-----:|:-------:|:-----------:|
| `@send` | (imageData or serverResponse) | Triggered when the fingerprint is captured or successfully sent |
| `@error` | (Error) | Triggered if there’s an error sending the fingerprint|
### 🧠 Features

✅ Draw using mouse or touch
✅ Clear the canvas easily
✅ Optional auto-send to your API
✅ Fully compatible with Vue 3
✅ Ready for npm publishing

### 🖼️ Example Preview

#### ⚡ Development

To develop or modify this package locally:
```bash
git clone https://github.com/daniyelford/vue-fingerPrint.git
cd vue-finger-printer
npm install
npm run build
```

and To test locally inside another Vue project:
```bash
npm link
# then inside your Vue app
npm link vue-finger-printer
```
### 📄 License

Released under the ISC License.

Built with ❤️ by @daniyelford
---
