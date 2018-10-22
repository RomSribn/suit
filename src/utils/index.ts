export const getOffset = (el: Element | null ) => {
  const rect = el!.getBoundingClientRect();
  return { top: rect.top, left: rect.left };
};