function zipStr(str: string) {
  let newString = str;

  while (true) {
    const prevString = newString;

    newString = newString.replace(/(.+)\1+/g, (_, $1) => {
      return $1;
    });

    if (prevString === newString) {
      break;
    }
  }

  return newString;
}

console.log(zipStr('abbaabbafffbezza')); // abafbeza
