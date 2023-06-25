//npm run start -- --username=your_username
//parseArgumentsWithEqualSign(username) => your_username
const parseArgumentsWithEqualSign = (argument) => {
  const argumentsArray = process.argv.slice(2);

  for (let i = 0; i < argumentsArray.length; i++) {
    const argumentValueString = argumentsArray[i * 2].slice(2);
    const array = argumentValueString.split("=");
    if (array.length == 2 && array[0] === argument) {
      return array[1];
    }
  }

  return undefined;
};

export { parseArgumentsWithEqualSign };
