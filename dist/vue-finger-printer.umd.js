(function(r,e){typeof exports=="object"&&typeof module<"u"?e(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],e):(r=typeof globalThis<"u"?globalThis:r||self,e(r.VueFingerPrinter={},r.Vue))})(this,(function(r,e){"use strict";const m={class:"fingerprint-container"},x={key:0,class:"status"},p={__name:"VueFingerPrinter",props:{url:{type:String,default:""},autoSend:{type:Boolean,default:!1},css:{type:String,default:""}},emits:["send","error"],setup(u,{emit:b}){const s=u,d=b,i=e.ref(null);let n,a=!1;const c=e.ref("");function w(t){a=!0,h(t)}function v(){a=!1}function h(t){if(!a)return;const o=i.value.getBoundingClientRect(),l=t.clientX-o.left,f=t.clientY-o.top;n.fillStyle="rgba(0,0,0,0.8)",n.beginPath(),n.arc(l,f,3,0,Math.PI*2),n.fill()}function _(t){a=!0,g(t)}function C(){a=!1}function g(t){if(!a)return;const o=i.value.getBoundingClientRect();for(const l of t.touches){const f=l.clientX-o.left,P=l.clientY-o.top;n.fillStyle="rgba(0,0,0,0.8)",n.beginPath(),n.arc(f,P,3,0,Math.PI*2),n.fill()}}function M(){n.clearRect(0,0,i.value.width,i.value.height),c.value=""}async function T(){const t=i.value.toDataURL("image/png").split(",")[1];if(d("send",t),s.autoSend&&s.url){c.value="sending...";try{const l=await(await fetch(s.url,{method:"POST",headers:{"Content-Type":"text/plain"},body:t})).text();c.value="send ✅",d("send",l)}catch(o){c.value="error ❌",d("error",o)}}}return e.onMounted(()=>{n=i.value.getContext("2d"),n.lineWidth=2,n.lineCap="round";const t=document.createElement("style");t.textContent=s.css&&s.css.trim().length>0?s.css:`
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
    }`,document.head.appendChild(t)}),(t,o)=>(e.openBlock(),e.createElementBlock("div",m,[e.createElementVNode("canvas",{ref_key:"canvas",ref:i,width:"300",height:"300",class:"fingerprint-sensor",onMousedown:w,onMouseup:v,onMousemove:h,onTouchstart:e.withModifiers(_,["prevent"]),onTouchend:e.withModifiers(C,["prevent"]),onTouchmove:e.withModifiers(g,["prevent"])},null,544),e.createElementVNode("div",{class:"buttons"},[e.createElementVNode("button",{onClick:M},"clear"),e.createElementVNode("button",{onClick:T},"send")]),c.value?(e.openBlock(),e.createElementBlock("div",x,e.toDisplayString(c.value),1)):e.createCommentVNode("",!0)]))}},y={install(u){u.component("VueFingerPrinter",p)}};r.VueFingerPrinter=p,r.default=y,Object.defineProperties(r,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})}));
