import { RefObject, useEffect } from "react";

const focusableElements = `
a[href]:not([tabindex='-1']),
area[href]:not([tabindex='-1']),
input:not([disabled]):not([tabindex='-1']),
select:not([disabled]):not([tabindex='-1']),
textarea:not([disabled]):not([tabindex='-1']),
button:not([disabled]):not([tabindex='-1']),
iframe:not([tabindex='-1']),
[tabindex]:not([tabindex='-1']),
[contentEditable=true]:not([tabindex='-1'])
`.trim();

export const useTrapFocus = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return () => {};
    }

    const firstFocusableElement = element.querySelector(focusableElements);

    const trapElement = document.createElement("button");

    // visually-hidden
    trapElement.style.position = "absolute";
    trapElement.style.width = "1px";
    trapElement.style.height = "1px";
    trapElement.style.margin = "-1px";
    trapElement.style.padding = "0";
    trapElement.style.border = "0";
    trapElement.style.overflow = "hidden";

    trapElement.addEventListener("focus", () => {
      if (firstFocusableElement instanceof HTMLElement) {
        firstFocusableElement.focus();
      } else {
        element.focus();
      }
    });

    element.appendChild(trapElement);

    return () => {
      element.removeChild(trapElement);
    };
  }, [ref]);
};
