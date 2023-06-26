import { isAbsolute, join, basename, dirname } from "path";
import { createReadStream, createWriteStream } from "fs";
import { stat, mkdir } from "fs/promises";

const cp = async (args) => {
  const currentDirectory = args[0];
  if (args.length < 3) {
    throw new Error("cp must have 2 parameters");
  }

  let oldFilePath = args[1];
  const oldFileBaseName = basename(oldFilePath);
  let newDirectoryPath = args[2];

  let oldAbsoluteFilePath;
  let newAbsoluteFilePath;

  if (isAbsolute(oldFilePath)) {
    oldAbsoluteFilePath = oldFilePath;
  } else {
    oldAbsoluteFilePath = join(currentDirectory, oldFilePath);
  }

  if (isAbsolute(newDirectoryPath)) {
    newAbsoluteFilePath = join(newDirectoryPath, oldFileBaseName);
  } else {
    newAbsoluteFilePath = join(currentDirectory, newDirectoryPath, oldFileBaseName);
  }

  //   console.log("oldAbsoluteFilePath", oldAbsoluteFilePath);
  //   console.log("newAbsoluteFilePath", newAbsoluteFilePath);

  const newAbsoluteDirPath = dirname(newAbsoluteFilePath);

  try {
    const pathStats = await stat(newAbsoluteDirPath);
    // console.log("isDirectory", pathStats.isDirectory());
  } catch (error) {
    try {
      await mkdir(newAbsoluteDirPath);
    } catch (error) {}
  }

  try {
    await copy(oldAbsoluteFilePath, newAbsoluteFilePath);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

const copy = async (sourceFile, destinationFile) => {
  const readable = createReadStream(sourceFile);
  const writable = createWriteStream(destinationFile);

  return new Promise((resolve, reject) => {
    readable.on("error", (error) => {
      reject(error);
    });
    writable.on("error", (error) => {
      reject(error);
    });
    writable.on("finish", () => {
      resolve();
    });
    readable.pipe(writable);
  });
};

export { cp };
