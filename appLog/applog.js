import fs from "fs";

const logError = async (functionName, statusCode, errorMessage) => {
  const data = `| Method : ${functionName} >> Status : ${statusCode} >> Error : ${errorMessage} | \n`;
  fs.appendFile("./errorLogs.txt", data, (err) => {
    if (err) {
      console.error("Error appending file : ", err);
      return;
    }
    console.log("Data appended successfully !");
  });
};

const logSuccess = async () => {};

const logOperations = {
  logError,
  logSuccess,
};

export default logOperations;
