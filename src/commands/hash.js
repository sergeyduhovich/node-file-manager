import { isAbsolute, join } from "path";
import { stat, readFile } from "fs/promises";
import { createHash } from "crypto";

const hash = async (args) => {
  const currentDirectory = args[0];
  if (args.length < 2) {
    throw new Error("hash must have 1 parameter");
  }
  let fileToNavigate = args[1];
  let absoluteFilePath;

  if (isAbsolute(fileToNavigate)) {
    absoluteFilePath = fileToNavigate;
  } else {
    absoluteFilePath = join(currentDirectory, fileToNavigate);
  }

  try {
    const pathStats = await stat(absoluteFilePath);
    if (!pathStats.isFile()) {
      throw new Error("hash parameter must be a file");
    }

    const content = await readFile(absoluteFilePath);
    const hash = createHash("sha256").update(content).digest("hex");
    console.log(hash);
  } catch (error) {
    throw new Error("file doesn't exist");
  }
};

export { hash };
