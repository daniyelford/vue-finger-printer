import FingerprintCanvas from './src/FingerprintCanvas.vue'
export default {
  install(app) {
    app.component('FingerprintCanvas', FingerprintCanvas)
  }
}
export { FingerprintCanvas }