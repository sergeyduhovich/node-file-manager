const greeting = (username) => `Welcome to the File Manager, ${username}!\n`;

const goodbye = (username) => `Thank you for using File Manager, ${username}, goodbye!`;

const youAreInPath = (path) => `You are currently in ${path}`;

const invalidInput = "Invalid input";

const operationFailed = "Operation failed";

export { greeting, goodbye, youAreInPath, invalidInput, operationFailed };
