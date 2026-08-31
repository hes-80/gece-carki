const KEY = "gece-carki-last";

export function saveLast(data: unknown) {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {}
}

export function loadLast<T>(): T | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) as T : null;
  } catch {
    return null;
  }
}