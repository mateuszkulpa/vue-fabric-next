import {
  inject,
  onUnmounted,
  ref,
  Ref,
  watch,
  getCurrentInstance,
  onMounted,
  onBeforeUnmount,
} from "vue";
import fabric from "./fabric";

export const withCommonObjectProps = () => {
  return {
    angle: Number,
    backgroundColor: String,
    borderColor: String,
    borderDashArray: Array,
    borderOpacityWhenMoving: Number,
    borderScaleFactor: Number,
    cacheProperties: Array,
    centeredRotation: { type: Boolean, default: true },
    centeredScaling: { type: Boolean, default: false },
    cornerColor: String,
    cornerDashArray: Array,
    cornerSize: Number,
    cornerStrokeColor: String,
    cornerStyle: String,
    dirty: { type: Boolean, default: true },
    evented: { type: Boolean, default: true },
    excludeFromExport: { type: Boolean, default: false },
    fill: String,
    fillRule: String,
    flipX: Boolean,
    flipY: Boolean,
    globalCompositeOperation: String,
    hasBorders: { type: Boolean, default: true },
    hasControls: { type: Boolean, default: true },
    hasRotatingPoint: { type: Boolean, default: true },
    height: Number,
    hoverCursor: String,
    includeDefaultValues: { type: Boolean, default: true },
    inverted: { type: Boolean, default: false },
    left: Number,
    lockMovementX: { type: Boolean, default: false },
    lockMovementY: { type: Boolean, default: false },
    lockRotation: { type: Boolean, default: false },
    lockScalingFlip: { type: Boolean, default: false },
    lockScalingX: { type: Boolean, default: false },
    lockScalingY: { type: Boolean, default: false },
    lockSkewingX: { type: Boolean, default: false },
    lockSkewingY: { type: Boolean, default: false },
    lockUniScaling: { type: Boolean, default: false },
    minScaleLimit: Number,
    moveCursor: String,
    noScaleCache: { type: Boolean, default: true },
    objectCaching: { type: Boolean, default: true },
    opacity: Number,
    originX: String,
    originY: String,
    padding: Number,
    paintFirst: String,
    perPixelTargetFind: { type: Boolean, default: false },
    rotatingPointOffset: Number,
    scaleX: Number,
    scaleY: Number,
    selectable: { type: Boolean, default: true },
    selectionBackgroundColor: String,
    skewX: Number,
    skewY: Number,
    stateProperties: Array,
    stroke: String,
    strokeDashArray: Array,
    strokeDashOffset: Number,
    strokeLineCap: String,
    strokeLineJoin: String,
    strokeMiterLimit: Number,
    strokeUniform: { type: Boolean, default: false },
    strokeWidth: Number,
    top: Number,
    transparentCorners: { type: Boolean, default: true },
    visible: { type: Boolean, default: true },
    width: Number,
  };
};

export const useFabricCanvas = async (
  props: Record<string, unknown>,
  renderFn: (canvas: fabric.Canvas) => fabric.Object
) => {
  const currentInstance = getCurrentInstance();
  const canvasRef = inject<Ref<fabric.Canvas | null>>(
    "fabricCanvas",
    ref(null)
  );
  if (canvasRef.value === null)
    throw new Error(`Cannot render object - no parent canvas`);

  const canvas = canvasRef.value;
  const renderedObject = renderFn(canvas);
  canvas.add(renderedObject);

  const onObjectModified = () => {
    const stateProperties = renderedObject.stateProperties;
    if (!stateProperties) return;

    Object.values(stateProperties).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      currentInstance?.emit(`update:${key}`, renderedObject.get(key as any));
    });
  };

  const registerEvents = () => {
    renderedObject.on("changed", onObjectModified);
    renderedObject.on("moved", onObjectModified);
    renderedObject.on("scaled", onObjectModified);
  };

  const unregisterEvents = () => {
    renderedObject.off("changed", onObjectModified);
    renderedObject.off("moved", onObjectModified);
    renderedObject.off("scaled", onObjectModified);
  };

  Object.keys(props).forEach((key) => {
    watch(
      () => props[key],
      (propValue) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        renderedObject.set(key as any, propValue);
        canvas.renderAll();
      }
    );
  });

  onMounted(() => {
    registerEvents();
  });

  onBeforeUnmount(() => {
    unregisterEvents();
  });

  onUnmounted(() => {
    canvas.remove(renderedObject);
  });
};
