<script lang="ts">
import { defineComponent } from "vue";
import { useFabricCanvas, withCommonObjectProps } from "./FabricObject";
import fabric from "./fabric";
import { IRectOptions } from "fabric/fabric-impl";

export default defineComponent({
  props: {
    ...withCommonObjectProps(),
  },
  setup(props) {
    useFabricCanvas(props, () => {
      return new fabric.Rect({
        ...props,
      } as IRectOptions);
    });

    return () => null;
  },
});
</script>
