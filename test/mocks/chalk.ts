type ChalkMethod = (text: string) => string;

const passthrough: ChalkMethod = (text) => text;

const chalk = new Proxy(
  {},
  {
    get: (): ChalkMethod => passthrough,
  },
);

export default chalk;
