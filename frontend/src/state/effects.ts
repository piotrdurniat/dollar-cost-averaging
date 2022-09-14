import { AtomEffect } from "recoil";

export const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const mediaQueryEffect =
  (queryString: string): AtomEffect<boolean> =>
  ({ setSelf, trigger }) => {
    if (trigger === "get") {
      setSelf(window.matchMedia(queryString).matches);
    }

    const listener = (e: MediaQueryListEvent) => {
      setSelf(e.matches);
    };

    window.matchMedia(queryString).addEventListener("change", listener);

    return () => {
      window.matchMedia(queryString).removeEventListener("change", listener);
    };
  };
