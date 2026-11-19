/**
 * Wraps every word of an element (including words nested in <em>) in a
 * clipped mask so it can rise into place. Returns the inner spans to animate
 * and a revert() that restores the original markup. The element keeps its
 * full text as an aria-label; the split pieces are hidden from screen readers.
 */
export function splitWords(el: HTMLElement) {
  const original = el.innerHTML;
  const label = (el.textContent ?? "").replace(/\s+/g, " ").trim();
  const words: HTMLElement[] = [];

  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        (child.textContent ?? "").split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(" "));
            return;
          }
          const outer = document.createElement("span");
          outer.setAttribute("aria-hidden", "true");
          // Padding gives descenders and italic overhang room inside the mask.
          outer.style.cssText = "display:inline-block;overflow:hidden;vertical-align:top;padding:0 .08em .14em 0;margin:0 -.08em -.14em 0";
          const inner = document.createElement("span");
          inner.style.display = "inline-block";
          inner.style.willChange = "transform";
          inner.textContent = part;
          outer.appendChild(inner);
          frag.appendChild(outer);
          words.push(inner);
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    });
  };

  walk(el);
  el.setAttribute("aria-label", label);
  return {
    words,
    revert() {
      el.innerHTML = original;
      el.removeAttribute("aria-label");
    },
  };
}
