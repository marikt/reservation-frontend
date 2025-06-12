import { fromEvent, EMPTY } from 'rxjs';

export function customFromEvent(target: any, eventName: string) {
  return fromEvent(target, eventName);
}

export { EMPTY };
