<template>
    <div class="fingerprint-container">
        <canvas 
        ref="canvas" 
        width="300" 
        height="300"
        class="fingerprint-sensor"
        @mousedown="startDraw"
        @mouseup="stopDraw"
        @mousemove="draw"
        @touchstart.prevent="startDrawTouch"
        @touchend.prevent="stopDrawTouch"
        @touchmove.prevent="drawTouch">
        </canvas>
        <div class="buttons">
            <button @click="clearCanvas">پاک‌سازی</button>
            <button @click="sendFingerprint">ارسال به سرور</button>
        </div>
        <div v-if="status" class="status">
            {{ status }}
        </div>
  </div>
</template>

<script setup>
    import { sendApi } from '@/plugins/api'
    import { ref,onMounted } from 'vue'
    const canvas = ref(null)
    let ctx
    let drawing = false
    const status = ref("")
    function startDraw(e) {
    drawing = true
    draw(e)
    }
    function stopDraw() {
        drawing = false
    }
    function draw(e) {
        if (!drawing) return
        const rect = canvas.value.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        ctx.fillStyle = "rgba(0,0,0,0.8)"
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fill()
    }
    function startDrawTouch(e) {
        drawing = true
        drawTouch(e)
    }
    function stopDrawTouch() {
        drawing = false
    }
    function drawTouch(e) {
        if (!drawing) return
        const rect = canvas.value.getBoundingClientRect()
        for (const touch of e.touches) {
            const x = touch.clientX - rect.left
            const y = touch.clientY - rect.top
            ctx.fillStyle = "rgba(0,0,0,0.8)"
            ctx.beginPath()
            ctx.arc(x, y, 3, 0, Math.PI * 2)
            ctx.fill()
        }
    }
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
        status.value = ""
    }
    async function sendFingerprint() {
        const imageData = canvas.value.toDataURL("image/png").split(',')[1]
        status.value = "در حال ارسال..."
        try {
            const res = await sendApi({
                url:'/user/fingerPrint',
                method: "POST",
                headers: { "Content-Type": "text/plain" },
                data: imageData,
                autoCheckToken:false
            })
            status.value = "اثر انگشت ارسال شد ✅ کد: " + res
        } catch (err) {
            status.value = "خطا در ارتباط با سرور ❌"
            console.error(err)
        }
    }
    onMounted(() => {
        ctx = canvas.value.getContext('2d')
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
    })
</script>

<style scoped>
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
    }
</style>
