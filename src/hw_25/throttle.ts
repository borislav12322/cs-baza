function throttle(fn: (...args: never[]) => void, time: number) {
  let timer: ReturnType<typeof setTimeout> | string | number | undefined = undefined;
  let isFirst = true;

  return function (...args: never[]) {
    if (timer) {
      return;
    }

    if (isFirst) {
      isFirst = false;
      fn(...args);
      return;
    }

    timer = setTimeout(() => {
      fn(...args);

      clearTimeout(timer);

      timer = undefined;
    }, time);
  };
}

function haha() {
  console.log('Ha-ha!');
}

const throttledLaugh = throttle(haha, 400);

throttledLaugh(); // Выполнится сразу
throttledLaugh();
throttledLaugh();
throttledLaugh();
throttledLaugh();
throttledLaugh();
throttledLaugh();
throttledLaugh();
