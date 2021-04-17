import { defineComponent, PropType, watch } from "vue";
import { useFabricCanvas, withCommonObjectProps } from "./FabricObject";
import fabric from "./fabric";
import { IBaseFilter, IImageOptions } from "fabric/fabric-impl";

export default defineComponent({
  props: {
    ...withCommonObjectProps(),
    image: {
      type: [String, Object] as PropType<
        string | HTMLImageElement | HTMLVideoElement
      >,
      required: true,
    },
    filters: {
      type: Array as PropType<IBaseFilter[]>,
      required: false,
      default: () => [],
    },
  },
  setup(props) {
    const filters = [...props.filters];

    useFabricCanvas(props, (canvas) => {
      const image = new fabric.Image(props.image, {
        ...props,
        filters: [],
      } as IImageOptions);

      const applyFilters = () => {
        image.applyFilters(filters);
        canvas.renderAll();
      };
      watch(() => props.filters, applyFilters, { deep: true });

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
