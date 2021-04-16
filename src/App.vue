<template>
  <fabric-canvas
    :width="1000"
    :height="500"
    background-color="rgba(0,0,0,0.05)"
  >
    <fabric-textbox
      v-if="textRendered"
      v-model:text="textboxOptions.text"
      v-model:fontSize="textboxOptions.fontSize"
      v-model:left="textboxOptions.left"
      v-model:top="textboxOptions.top"
    />

    <fabric-circle :radius="50" :left="200" :top="200" />

    <fabric-rectangle :height="100" :width="100" :left="300" :top="100" />
  </fabric-canvas>

  <input type="checkbox" v-model="textRendered" />
  <input type="number" v-model.number="textboxOptions.fontSize" />
  <input type="text" v-model="textboxOptions.text" />
  <pre>{{ textboxOptions }}</pre>
</template>

<script lang="ts">
import { ITextboxOptions } from "fabric/fabric-impl";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  setup() {
    const textboxOptions = reactive<ITextboxOptions>({
      text: "Sample text...",
      fontSize: 48,
      left: 100,
      top: 100,
    });
    const textRendered = ref(true);

    return { textboxOptions, textRendered };
  },
});
</script>
