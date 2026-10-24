import { CHILD_IN_MS, CHILD_OUT_MS } from './constants';

function childTargets(panel: HTMLElement) {
  return {
    header: panel.querySelector<HTMLElement>('[data-header]'),
    content: panel.querySelector<HTMLElement>('[data-content]'),
  };
}

export function animateChildrenOpen(panel: HTMLElement): Animation[] {
  const { header, content } = childTargets(panel);
  const anims: Animation[] = [];
  if (header) anims.push(header.animate(
    [{ transform: 'translateY(-100%)' }, { transform: 'translateY(0%)' }],
    { duration: CHILD_IN_MS, easing: 'ease-out', fill: 'both' }
  ));
  if (content) anims.push(content.animate(
    [{ opacity: '0', transform: 'translateY(10px)' }, { opacity: '1', transform: 'translateY(0)' }],
    { duration: CHILD_IN_MS, delay: 80, easing: 'ease-out', fill: 'both' }
  ));
  return anims;
}

export function animateChildrenClose(panel: HTMLElement): void {
  const { header, content } = childTargets(panel);
  header?.animate(
    [{ transform: 'translateY(0%)' }, { transform: 'translateY(-100%)' }],
    { duration: CHILD_OUT_MS, easing: 'ease-in', fill: 'forwards' }
  );
  content?.animate(
    [{ opacity: '1', transform: 'translateY(0)' }, { opacity: '0', transform: 'translateY(10px)' }],
    { duration: CHILD_OUT_MS, easing: 'ease-in', fill: 'forwards' }
  );
}
