import {
  defineComponent,
  h,
  markRaw,
  onMounted,
  provide,
  ref,
  watch,
} from "@vue/runtime-core";
import { fabric } from "fabric";

export default defineComponent({
  props: {
    altActionKey: { type: String, required: false, default: "shiftKey" },
    centeredKey: { type: String, required: false, default: "altKey" },
    centeredRotation: { type: Boolean, required: false, default: false },
    centeredScaling: { type: Boolean, required: false, default: false },
    containerClass: {
      type: String,
      required: false,
      default: "canvas-container",
    },
    defaultCursor: { type: String, required: false, default: "default" },
    fireMiddleClick: { type: Boolean, required: false, default: false },
    fireRightClick: { type: Boolean, required: false, default: false },
    freeDrawingCursor: { type: String, required: false, default: "crosshair" },
    hoverCursor: { type: String, required: false, default: "move" },
    isDrawingMode: { type: Boolean, required: false, default: false },
    moveCursor: { type: String, required: false, default: "move" },
    notAllowedCursor: { type: String, required: false, default: "not-allowed" },
    perPixelTargetFind: { type: Boolean, required: false, default: false },
    preserveObjectStacking: { type: Boolean, required: false, default: false },
    rotationCursor: { type: String, required: false, default: "crosshair" },
    selection: { type: Boolean, required: false, default: true },
    selectionBorderColor: {
      type: String,
      required: false,
      default: "rgba(255, 255, 255, 0.3)",
    },
    selectionColor: {
      type: String,
      required: false,
      default: "rgba(100, 100, 255, 0.3)",
    },
    selectionFullyContained: { type: Boolean, required: false, default: false },
    selectionKey: { type: String, required: false, default: "shiftKey" },
    selectionLineWidth: { type: Number, required: false, default: 1 },
    skipTargetFind: { type: Boolean, required: false, default: false },
    snapAngle: { type: Number, required: false, default: 0 },
    stopContextMenu: { type: Boolean, required: false, default: false },
    targetFindTolerance: { type: Number, required: false, default: 0 },
    uniScaleKey: { type: String, required: false, default: "shiftKey" },
    uniScaleTransform: { type: Boolean, required: false, default: false },
    backgroundColor: { type: String, required: false, default: "" },
    width: { type: Number, required: false, default: 600 },
    height: { type: Number, required: false, default: 400 },
  },
  setup(props, { slots }) {
    const canvasRef = ref<HTMLCanvasElement | null>(null);
    const canvas = ref<fabric.Canvas | null>(null);
    provide("fabricCanvas", canvas);

    onMounted(() => {
      canvas.value = markRaw(
        new fabric.Canvas(canvasRef.value, {
          ...props,
        })
      );
    });

    watch(
      () => props.height,
      (newValue) => {
        canvas.value?.setHeight(newValue);
        canvas.value?.renderAll();
        canvas.value?.calcOffset();
      }
    );

    watch(
      () => props.width,
      (newValue) => {
        canvas.value?.setWidth(newValue);
        canvas.value?.renderAll();
        canvas.value?.calcOffset();
      }
    );

    watch(
      () => props.backgroundColor,
      (newValue) => {
        canvas.value?.setBackgroundColor(newValue, () => {
          canvas.value?.renderAll();
        });
      }
    );

    return () =>
      h("div", [
        h("canvas", { ref: canvasRef }),
        canvas.value && slots.default ? slots.default() : null,
      ]);
  },
});
