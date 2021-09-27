import { Callable } from '@custom-types/index';

export function capitalizeFirstLetter(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

export function groupIt(
  key: string,
  fn: Callable,
  { collapsed }: { collapsed?: boolean } = {}
): void {
  if (collapsed) console.groupCollapsed(key);
  else console.group(key);
  try {
    fn();
  } finally {
    console.groupEnd();
  }
}

export function isBlank(str: string | null): boolean {
  return !str || /^\s*$/.test(str);
}
