export const EXPAND_MS = 380;

let originRect: DOMRect | null = null;
let consumed = false;
let originOverlayRect: DOMRect | null = null;

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

export const setOriginOverlayRect = (rect: DOMRect) => {
  originOverlayRect = rect;
};

export const consumeOriginOverlayRect = (): DOMRect | null => {
  const r = originOverlayRect;
  originOverlayRect = null;
  return r;
};
