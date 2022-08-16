import { useState, useEffect } from "react";

const getOrientation = () => {
  return window.screen.orientation.angle;
};

export default function useUpdateEffect() {
  const [orientation, setOrientation] = useState(getOrientation());
  useEffect(() => {
    window.addEventListener("orientationchange", () =>
      setOrientation(getOrientation()),
    );

    return () => {
      window.removeEventListener("orientationchange", () =>
        setOrientation(getOrientation()),
      );
    };
  }, []);
  return orientation;
}
