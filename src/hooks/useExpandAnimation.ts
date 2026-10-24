import { useLayoutEffect, useRef, useState } from 'react';
import { animateChildrenOpen, animateChildrenClose } from '../animation/childAnimations';
import { CHILD_OUT_MS } from '../animation/constants';
import { playFlip, slideGhost } from '../animation/flip';
import {
  consumeOriginRect, setOriginRect,
  consumeOriginOverlayRect, setOriginOverlayRect,
} from '../state/expandTransition';

export function useExpandAnimation(onClosed: () => void) {
  const panelRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const originRectRef = useRef<DOMRect | null>(null);
  const overlayRectRef = useRef<DOMRect | null>(null);
  const flipAnimRef = useRef<Animation | null>(null);
  const ghostAnimRef = useRef<Animation | null>(null);
  const childAnimsRef = useRef<Animation[]>([]);
  const [overlayVisible, setOverlayVisible] = useState(false);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const ghost = ghostRef.current;
    if (!panel) return;

    const originRect = consumeOriginRect();
    if (originRect) originRectRef.current = originRect;

    const overlayRect = consumeOriginOverlayRect();
    overlayRectRef.current = overlayRect;

    if (ghost && overlayRect) {
      ghost.style.top = overlayRect.top + 'px';
      ghost.style.left = overlayRect.left + 'px';
      ghost.style.width = overlayRect.width + 'px';
      ghost.style.display = 'block';
      ghostAnimRef.current = slideGhost(ghost, 'out');
    }

    const childAnims = animateChildrenOpen(panel);
    childAnimsRef.current = childAnims;
    setOverlayVisible(true);

    if (!originRect) {
      return () => {
        childAnims.forEach(a => a.cancel());
        childAnimsRef.current = [];
      };
    }

    const flipAnim = playFlip(panel, originRect);
    flipAnimRef.current = flipAnim;

    // StrictMode cleanup: cancel animations and restore state for second invocation
    return () => {
      flipAnim.cancel();
      childAnims.forEach(a => a.cancel());
      childAnimsRef.current = [];
      ghostAnimRef.current?.cancel();
      ghostAnimRef.current = null;
      if (originRectRef.current) setOriginRect(originRectRef.current);
      if (overlayRectRef.current) setOriginOverlayRect(overlayRectRef.current);
    };
  }, []);

  const close = () => {
    const panel = panelRef.current;
    const ghost = ghostRef.current;

    childAnimsRef.current.forEach(a => a.cancel());
    childAnimsRef.current = [];
    setOverlayVisible(false);

    if (!panel) { onClosed(); return; }

    animateChildrenClose(panel);

    if (ghost && overlayRectRef.current) {
      ghost.style.display = 'block';
      ghostAnimRef.current?.cancel();
      ghostAnimRef.current = slideGhost(ghost, 'in');
    }

    const flipAnim = flipAnimRef.current;
    if (!flipAnim) {
      setTimeout(onClosed, CHILD_OUT_MS);
      return;
    }

    flipAnim.onfinish = null;
    flipAnim.reverse();
    flipAnim.onfinish = () => {
      panel.style.visibility = 'hidden';
      onClosed();
    };
  };

  return { panelRef, ghostRef, overlayVisible, close };
}
