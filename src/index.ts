import { readFileSync } from "fs";

function build(file: string) {
  try {
    const data = readFileSync(file, { encoding: "utf8" });
    const newData = dataToInteger(data);
    return { status: "ok", data: newData };
  } catch (err) {
    return {
      status: "error",
      message: "Não foi possível ler o arquivo informado!",
    };
  }
}

function dataToInteger(data: string) {
  const list = data.split(", ");
  const newList = list.map((i) => handleData(i));
  return newList;
}

function handleData(data: string) {
  return convertibleToNumber(data) ? evaluateNumbers(+data) : data;
}

function convertibleToNumber(data: string) {
  return Number.isNaN(+data) ? false : true;
}

function evaluateNumbers(num: number) {
  return num % 3 == 0 && num % 5 == 0
    ? "fizzbuzz"
    : num % 3 == 0
    ? "fizz"
    : num % 5 == 0
    ? "buzz"
    : num;
}

function start() {
  const response = build(process.argv[2]);
  response.status === "ok"
    ? console.log(response.data?.join(", "))
    : console.log(response.message);
}

start();
