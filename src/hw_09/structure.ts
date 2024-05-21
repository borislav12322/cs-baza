type TTextFormat = 'ASCII';

class Structure {
  constructor() {}

  public static String(format: TTextFormat) {
    return format;
  }
}

Structure.String('ASCII');

// const struct = new Structure();
// const win1251decoder = new TextDecoder('ascii');
// const bytes = new Uint8Array([104, 240, 232, 226, 229, 242, 44, 32, 236, 232, 240, 33]);
// console.log(win1251decoder.decode(bytes)); // Привет, мир!
