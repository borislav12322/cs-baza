function debounce(fn: (...args: never[]) => void, time: number) {
  let timer: ReturnType<typeof setTimeout>;

  return function (...args: never[]) {
    clearInterval(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, time);
  };
}

function laugh() {
  console.log('Ha-ha!');
}

const debouncedLaugh = debounce(laugh, 2000);

debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
