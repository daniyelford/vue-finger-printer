import { ref as h, onMounted as T, createElementBlock as m, openBlock as v, createElementVNode as c, createCommentVNode as k, withModifiers as p, toDisplayString as D } from "vue";
const M = { class: "fingerprint-container" }, B = {
  key: 0,
  class: "status"
}, V = {
  __name: "VueFingerPrinter",
  props: {
    url: { type: String, default: "" },
    autoSend: { type: Boolean, default: !1 },
    css: { type: String, default: "" }
  },
  emits: ["send", "error"],
  setup(l, { emit: x }) {
    const r = l, u = x, o = h(null);
    let t, a = !1;
    const s = h("");
    function b(e) {
      a = !0, f(e);
    }
    function y() {
      a = !1;
    }
    function f(e) {
      if (!a) return;
      const n = o.value.getBoundingClientRect(), i = e.clientX - n.left, d = e.clientY - n.top;
      t.fillStyle = "rgba(0,0,0,0.8)", t.beginPath(), t.arc(i, d, 3, 0, Math.PI * 2), t.fill();
    }
    function w(e) {
      a = !0, g(e);
    }
    function C() {
      a = !1;
    }
    function g(e) {
      if (!a) return;
      const n = o.value.getBoundingClientRect();
      for (const i of e.touches) {
        const d = i.clientX - n.left, S = i.clientY - n.top;
        t.fillStyle = "rgba(0,0,0,0.8)", t.beginPath(), t.arc(d, S, 3, 0, Math.PI * 2), t.fill();
      }
    }
    function _() {
      t.clearRect(0, 0, o.value.width, o.value.height), s.value = "";
    }
    async function P() {
      const e = o.value.toDataURL("image/png").split(",")[1];
      if (u("send", e), r.autoSend && r.url) {
        s.value = "sending...";
        try {
          const i = await (await fetch(r.url, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: e
          })).text();
          s.value = "send ✅", u("send", i);
        } catch (n) {
          s.value = "error ❌", u("error", n);
        }
      }
    }
    return T(() => {
      t = o.value.getContext("2d"), t.lineWidth = 2, t.lineCap = "round";
      const e = document.createElement("style");
      e.textContent = r.css && r.css.trim().length > 0 ? r.css : `
    .fingerprint-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin-top: 3rem;
    }
    .fingerprint-sensor {
      border: 3px solid #333;
      border-radius: 50%;
      cursor: crosshair;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
      touch-action: none;
    }
    .buttons button {
      margin: 0 5px;
      padding: 8px 15px;
      border: none;
      border-radius: 10px;
      background: #333;
      color: white;
      cursor: pointer;
    }
    .status {
      font-size: 1.1rem;
      color: #2a2;
    }`, document.head.appendChild(e);
    }), (e, n) => (v(), m("div", M, [
      c("canvas", {
        ref_key: "canvas",
        ref: o,
        width: "300",
        height: "300",
        class: "fingerprint-sensor",
        onMousedown: b,
        onMouseup: y,
        onMousemove: f,
        onTouchstart: p(w, ["prevent"]),
        onTouchend: p(C, ["prevent"]),
        onTouchmove: p(g, ["prevent"])
      }, null, 544),
      c("div", { class: "buttons" }, [
        c("button", { onClick: _ }, "clear"),
        c("button", { onClick: P }, "send")
      ]),
      s.value ? (v(), m("div", B, D(s.value), 1)) : k("", !0)
    ]));
  }
}, R = {
  install(l) {
    l.component("VueFingerPrinter", V);
  }
};
export {
  V as VueFingerPrinter,
  R as default
};
