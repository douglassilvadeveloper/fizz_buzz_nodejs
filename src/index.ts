import { readFileSync } from "fs";

function build(file: string) {
  try {
    const data = readFileSync(file, { encoding: "utf8" });
    const newData = parserDataToInteger(data);
    return { status: "ok", data: newData };
  } catch (err) {
    return {
      status: "error",
      message: "Não foi possível ler o arquivo informado!",
    };
  }
}

function parserDataToInteger(data: string) {
  const list = data.split(", ");
  const newList = list.map((i) =>
    convertibleToNumber(i) ? evaluateNumbers(+i) : i
  );
  return newList;
}

function convertibleToNumber(data: string) {
  return +data === NaN ? false : true;
}

function evaluateNumbers(num: number) {
  if (num % 3 == 0 && num % 5 == 0) {
    return "fizzbuzz";
  }
  if (num % 3 == 0) {
    return "fizz";
  }
  if (num % 5 == 0) {
    return "buzz";
  } else {
    return num;
  }
}

console.log(build(process.argv[2]));
