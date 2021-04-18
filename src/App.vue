<template>
  <fabric-canvas
    :width="1000"
    :height="700"
    background-color="rgba(0,0,0,0.05)"
  >
    <fabric-textbox
      v-model:text="textboxOptions.text"
      v-model:fontSize="textboxOptions.fontSize"
      v-model:left="textboxOptions.left"
      v-model:top="textboxOptions.top"
    />

    <fabric-circle :radius="50" :left="200" :top="200" />

    <fabric-rectangle :height="100" :width="100" :left="300" :top="100" />

    <fabric-image
      v-if="imgRef"
      v-model:image="imgRef"
      v-model:width="imageOptions.width"
      v-model:height="imageOptions.height"
      v-model:left="imageOptions.left"
      v-model:top="imageOptions.top"
      v-model:scaleX="imageOptions.scaleX"
      v-model:filters="imageOptions.filters"
    />
  </fabric-canvas>

  <img src="@/assets/photo.jpg" alt="" ref="imgRef" style="display: none" />

  <input type="number" v-model.number="textboxOptions.fontSize" />
  <input type="text" v-model="textboxOptions.text" />
  <br />
  <pre>{{ textboxOptions }}</pre>
  <br />
  <pre>{{ imageOptions }}</pre>
  {{ brightness }}
  <br />
  <input type="range" step="0.01" min="0" max="1" v-model.number="brightness" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import fabric from "./components/fabric";

export default defineComponent({
  setup() {
    const textboxOptions = ref({
      text: "Sample text...",
      fontSize: 48,
      left: 100,
      top: 100,
    });

    var brightness = ref(0.75);
    const imageOptions = ref({
      left: 200,
      top: 300,
      width: 400,
      height: 200,
      scaleX: 1.5,
      filters: computed(() => [
        new fabric.Image.filters.Brightness({
          brightness: brightness.value,
        }),
      ]),
    });

    const imgRef = ref<HTMLImageElement | null>(null);

    return { textboxOptions, imageOptions, brightness, imgRef };
  },
});
</script>
