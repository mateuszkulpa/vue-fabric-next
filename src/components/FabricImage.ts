import { defineComponent, Prop } from "vue";
import { useFabricCanvas, withCommonObjectProps } from "./FabricObject";
import fabric from "./fabric";
import { IImageOptions } from "fabric/fabric-impl";

export default defineComponent({
  props: {
    ...withCommonObjectProps(),
    image: {
      type: [String, Object],
      required: true,
    } as Prop<string | HTMLImageElement | HTMLVideoElement>,
  },
  async setup(props) {
    useFabricCanvas(props, (canvas) => {
      const image = new fabric.Image(props.image, {
        ...props,
      } as IImageOptions);

      if (props.image instanceof HTMLImageElement) {
        // eslint-disable-next-line vue/no-mutating-props
        props.image.onload = () => {
          canvas.renderAll();
        };
      }

      return image;
    });

    return () => null;
  },
});
