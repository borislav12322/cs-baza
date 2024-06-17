function unique(str: string) {
  const repeatedChars = str.match(/(.)(?=.*?\1)/g);

  let newStr = str;

  if (repeatedChars) {
    for (const char of repeatedChars) {
      newStr = newStr.replaceAll(char, '');
    }
  }

  return newStr;
}

// console.log(unique('abaceffgwkl;kl;kl;kl;kl;kl;')); // bcegw
