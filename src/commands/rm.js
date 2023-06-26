import { isAbsolute, join } from "path";
import { stat, unlink } from "fs/promises";

const rm = async (args) => {
  const currentDirectory = args[0];
  if (args.length < 2) {
    throw new Error("rm must have 1 parameter");
  }
  let fileToDelete = args[1];
  let absoluteFilePath;

  if (isAbsolute(fileToDelete)) {
    absoluteFilePath = fileToDelete;
  } else {
    absoluteFilePath = join(currentDirectory, fileToDelete);
  }

  try {
    const pathStats = await stat(absoluteFilePath);
    if (!pathStats.isFile()) {
      throw new Error("file doesn't exist");
    }
  } catch (error) {
    throw new Error("file doesn't exist");
  }

  await unlink(absoluteFilePath);
};

export { rm };
