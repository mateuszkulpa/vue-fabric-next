import { defineComponent } from "vue";
import { useFabricCanvas, withCommonObjectProps } from "./FabricObject";
import fabric from "./fabric";
import { ITextboxOptions } from "fabric/fabric-impl";

export default defineComponent({
  props: {
    ...withCommonObjectProps(),
    top: {
      type: Number,
      default: 0,
    },
    left: {
      type: Number,
      default: 0,
    },
    fontFamily: {
      type: String,
      default: "Times New Roman",
    },
    fontSize: {
      type: Number,
      default: 40,
    },
    fontStyle: {
      type: String,
      default: "normal",
    },
    fontWeight: {
      type: [Number, String],
      default: "normal",
    },
    text: {
      type: String,
      default: "",
    },
    textAlign: {
      type: String,
      default: "left",
    },
    textBackgroundColor: String,
  },
  setup(props) {
    useFabricCanvas(props, () => {
      return new fabric.Textbox(props.text, {
        ...props,
      } as ITextboxOptions);
    });

    return () => null;
  },
});
