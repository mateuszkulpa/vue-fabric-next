<script lang="ts">
import { defineComponent } from "vue";
import { useFabricCanvas, withCommonObjectProps } from "./FabricObject";
import fabric from "./fabric";
import { ICircleOptions } from "fabric/fabric-impl";

export default defineComponent({
  props: {
    ...withCommonObjectProps(),
    radius: {
      type: Number,
      required: true,
    },
    startAngle: {
      type: Number,
      default: 0,
    },
    endAngle: {
      type: Number,
      default: 2 * Math.PI,
    },
  },
  setup(props) {
    useFabricCanvas(props, () => {
      return new fabric.Circle({
        ...props,
      } as ICircleOptions);
    });

    return () => null;
  },
});
</script>
