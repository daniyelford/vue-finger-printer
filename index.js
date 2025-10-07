import VueFingerPrinter from './src/VueFingerPrinter.vue'
export default {
  install(app) {
    app.component('VueFingerPrinter', VueFingerPrinter)
  }
}
export { VueFingerPrinter }