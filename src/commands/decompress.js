import { isAbsolute, join } from "path";
import { stat } from "fs/promises";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createBrotliDecompress } from "zlib";

const decompress = async (args) => {
  const currentDirectory = args[0];
  if (args.length < 3) {
    throw new Error("decompress must have 2 parameters");
  }

  let sourceFilePath = args[1];
  let destinationFilePath = args[2];

  let sourceAbsoluteFilePath;
  let destinationAbsoluteFilePath;

  if (isAbsolute(sourceFilePath)) {
    sourceAbsoluteFilePath = sourceFilePath;
  } else {
    sourceAbsoluteFilePath = join(currentDirectory, sourceFilePath);
  }

  if (isAbsolute(destinationFilePath)) {
    destinationAbsoluteFilePath = destinationFilePath;
  } else {
    destinationAbsoluteFilePath = join(currentDirectory, destinationFilePath);
  }

  try {
    const pathStats = await stat(sourceAbsoluteFilePath);
    if (!pathStats.isFile()) {
      throw new Error("file doesn't exist");
    }
  } catch (error) {
    throw new Error("file doesn't exist");
  }

  try {
    const brotliDecompress = createBrotliDecompress();
    const source = createReadStream(sourceAbsoluteFilePath);
    const destination = createWriteStream(destinationAbsoluteFilePath);
    await pipeline(source, brotliDecompress, destination);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

export { decompress };
