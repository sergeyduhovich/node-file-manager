import { isAbsolute, join } from "path";
import { stat } from "fs/promises";
import { createReadStream } from "fs";
import { promisify } from "util";

const cat = async (args) => {
  const currentDirectory = args[0];
  if (args.length < 2) {
    throw new Error("cat must have 1 parameter");
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
      throw new Error("cat parameter must be a file");
    }

    readFile(absoluteFilePath);
  } catch (error) {
    throw new Error("file doesn't exist");
  }
};

const readFile = async (pathToFile) => {
  const stream = createReadStream(pathToFile);
  const streamOnEnd = promisify(stream.on).bind(stream, "end");
  stream.on("data", (data) => {
    process.stdout.write(data);
  });
  await streamOnEnd();
  process.stdout.write("\n");
};

export { cat };
