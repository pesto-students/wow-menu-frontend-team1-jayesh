import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import useMedia from "./useMedia";

function usePrefersDarkMode() {
  return useMedia(["(prefers-color-scheme: dark)"], [true], false);
}

const useDarkMode = () => {
  const [enabledState, setEnabledState] = useLocalStorage("dark-mode-enabled");
  const prefersDarkMode = usePrefersDarkMode();
  const enabled =
    typeof enabledState !== "undefined" ? enabledState : prefersDarkMode;
  // Fire off effect that add/removes dark mode class
  useEffect(
    () => {
      const className = "dark";
      const element = window.document.body;
      if (enabled) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    },
    [enabled], // Only re-call effect when value changes
  );
  // Return enabled state and setter
  return [enabled, setEnabledState];
};

export default useDarkMode;
