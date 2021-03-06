import { Dictionary, ScopedElementConstructor } from "./types";

export function defineGlobalElements(
  elements: Dictionary<ScopedElementConstructor | typeof HTMLElement>
) {
  for (const tag of Object.keys(elements)) {
    const element = elements[tag];
    if ((element as ScopedElementConstructor).scopedElements) {
      defineGlobalElements(
        (element as ScopedElementConstructor).scopedElements
      );
    }

    const existingElement = window.customElements.get(tag);
    if (existingElement) {
      /*    
      if (existingElement !== elements[tag])
     throw new Error(
          "Trying to redefine already existing element with a different class: try scoping the elements"
        );
 */
    } else {
      window.customElements.define(tag, elements[tag]);
    }
  }
}
