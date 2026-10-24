import { ANIM_MS, EXPAND_EASING } from './constants';

export function playFlip(panel: HTMLElement, originRect: DOMRect): Animation {
  const panelRect = panel.getBoundingClientRect();
  const scaleX = originRect.width / panelRect.width;
  const scaleY = originRect.height / panelRect.height;
  const dx = (originRect.left + originRect.width / 2) - (panelRect.left + panelRect.width / 2);
  const dy = (originRect.top + originRect.height / 2) - (panelRect.top + panelRect.height / 2);

  return panel.animate([
    { transform: `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`, transformOrigin: 'center center' },
    { transform: 'translate(0px, 0px) scale(1, 1)', transformOrigin: 'center center' },
  ], { duration: ANIM_MS, easing: EXPAND_EASING, fill: 'forwards' });
}

export function slideGhost(ghost: HTMLElement, direction: 'out' | 'in'): Animation {
  const offscreen = 'translateY(100vh)';
  const home = 'translateY(0)';
  const [from, to] = direction === 'out' ? [home, offscreen] : [offscreen, home];
  return ghost.animate(
    [{ transform: from }, { transform: to }],
    { duration: ANIM_MS, easing: EXPAND_EASING, fill: 'forwards' }
  );
}
