import { Component } from '../types/component';
import updateNode from './diff';

export default function render(component: Component) {
  const instance = component();

  const $oldElementContainer = document.createElement('div');
  $oldElementContainer.innerHTML = instance.getCurrentDom();

  const $newElementContainer = document.createElement('div');
  $newElementContainer.innerHTML = instance.render();

  // TODO: 재귀처리가 diff랑 동일함. 하나의 함수로 묶는 방법 없을까?
  const oldElementChildNodes = [
    ...$oldElementContainer.childNodes,
  ] as Element[];
  const newElementChildNodes = [
    ...$newElementContainer.childNodes,
  ] as Element[];

  const totalChildNodesLength = Math.max(
    oldElementChildNodes.length,
    newElementChildNodes.length
  );

  for (let i = 0; i < totalChildNodesLength; i++) {
    updateNode(
      $oldElementContainer,
      newElementChildNodes[i] || null,
      oldElementChildNodes[i] || null
    );
  }

  return instance.setCurrentDom($oldElementContainer.innerHTML);
}