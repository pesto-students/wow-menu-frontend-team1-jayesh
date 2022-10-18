export default function useDebounce(func, delay) {
  const time = delay || 500;
  let timer;

  return (event) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(func, time, event);
  };
}
