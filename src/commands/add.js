import { isAbsolute, join } from "path";
import { writeFile } from "fs/promises";

const add = async (args) => {
  const currentDirectory = args[0];
  if (args.length < 2) {
    throw new Error("add must have 1 parameter");
  }
  let fileToCreate = args[1];
  let absoluteFilePath;

  if (isAbsolute(fileToCreate)) {
    absoluteFilePath = fileToCreate;
  } else {
    absoluteFilePath = join(currentDirectory, fileToCreate);
  }

  try {
    await writeFile(absoluteFilePath, "", { flag: "wx" });
  } catch (error) {
    throw new Error("file doesn't exist");
  }
};

export { add };
