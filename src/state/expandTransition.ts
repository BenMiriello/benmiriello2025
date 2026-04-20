let originRect: DOMRect | null = null;
let consumed = false;

export const setOriginRect = (rect: DOMRect) => {
  originRect = rect;
  consumed = false;
};

// Returns the rect exactly once — safe against StrictMode double-invoke
export const consumeOriginRect = (): DOMRect | null => {
  if (consumed) return null;
  consumed = true;
  return originRect;
};
