import { isAbsolute, join } from "path";
import { rename } from "fs/promises";

const rn = async (args) => {
  const currentDirectory = args[0];
  if (args.length < 3) {
    throw new Error("rn must have 2 parameters");
  }

  let oldFilePath = args[1];
  let newFilePath = args[2];

  let oldAbsoluteFilePath;
  let newAbsoluteFilePath;

  if (isAbsolute(oldFilePath)) {
    oldAbsoluteFilePath = oldFilePath;
  } else {
    oldAbsoluteFilePath = join(currentDirectory, oldFilePath);
  }

  if (isAbsolute(newFilePath)) {
    newAbsoluteFilePath = newFilePath;
  } else {
    newAbsoluteFilePath = join(currentDirectory, newFilePath);
  }

  try {
    await rename(oldAbsoluteFilePath, newAbsoluteFilePath);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

export { rn };
