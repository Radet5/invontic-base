import fs from "fs";
import fsPromises from "fs/promises";
import electron, { ipcMain, safeStorage } from "electron";

const baseDir = electron.app.getPath("userData") + "/";

const fileHandler = {
  // require("file-handler"); i.e. move this to it's own file
  saveJSONFile: (
    { subDirectory, fileName, fileData }: any,
    reply: any,
    encrypt = false
  ) => {
    let jsonData: string | Buffer = JSON.stringify(fileData);
    if (encrypt) {
      jsonData = safeStorage.encryptString(jsonData);
    }
    const directory = `${baseDir}${subDirectory}/`;
    fs.mkdir(directory, { recursive: true }, (err) => {
      if (err) {
        reply("Error creating directory");
      } else {
        const filePath = `${directory}${fileName}.json`;
        fs.writeFile(filePath, jsonData, (err) => {
          if (err) {
            reply("Error saving file");
          } else {
            reply("saved");
          }
        });
      }
    });
  },
  getManyFiles: async (
    {
      subDirectory,
      fileNames,
    }: {
      subDirectory: string;
      fileNames: Array<string>;
    },
    encrypted = false
  ) => {
    const directory = `${baseDir}${subDirectory}/`;
    //console.log(directory);
    const reply: Array<any> = [];
    for (const fileName of fileNames) {
      const filePath = `${directory}${fileName}`;
      try {
        const file = await fsPromises.readFile(filePath);
        if (encrypted) {
          const decrypted = safeStorage.decryptString(file);
          reply.push(JSON.parse(decrypted));
        } else {
          reply.push(JSON.parse(file.toString()));
        }
      } catch (err) {
        console.log("error", err);
      }
    }
    return reply;
  },
  listFiles: async (subDirectory: string) => {
    const directory = `${baseDir}${subDirectory}/`;
    //console.log(directory);
    let reply = [{ name: "", type: "" }];
    try {
      const files = await fsPromises.readdir(directory, {
        withFileTypes: true,
      });
      //console.log(files);
      const fileList = files.map((file) => {
        return {
          name: file.name,
          type: file.isDirectory() ? "directory" : "file",
        };
      });
      reply = fileList;
    } catch (err) {
      console.log("error", err);
      reply = [{ name: "error reading directory", type: "error" }];
    }
    return reply;
  },
  getFile: (subDirectory: string, fileName: string, reply: any) => {
    const directory = `${baseDir}${subDirectory}/`;
    const filePath = `${directory}${fileName}.json`;
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reply({ error: "error reading file", data: [] });
      } else {
        reply(JSON.parse(data));
      }
    });
  },
};

ipcMain.on("save-json-file", (event, fileData) => {
  const reply = (data: any) => {
    event.reply("save-json-file-reply", data);
  };
  fileHandler.saveJSONFile(fileData, reply);
});

ipcMain.on("save-secure-json-file", (event, fileData) => {
  const reply = (data: any) => {
    event.reply("save-json-file-reply", data);
  };
  if (safeStorage.isEncryptionAvailable()) {
    fileHandler.saveJSONFile(fileData, reply, true);
  } else {
    reply("encryption not available");
  }
});

ipcMain.handle("list-files", async (event, subDirectory) => {
  const reply = await fileHandler.listFiles(subDirectory);
  return reply;
});

ipcMain.handle("get-many-files", async (event, { subDirectory, fileNames }) => {
  const reply = await fileHandler.getManyFiles({ subDirectory, fileNames });
  return reply;
});

ipcMain.handle(
  "get-many-files-secure",
  async (event, { subDirectory, fileNames }) => {
    const reply = await fileHandler.getManyFiles(
      { subDirectory, fileNames },
      true
    );
    return reply;
  }
);

ipcMain.on("load-json-file", (event, { subDirectory, fileName }) => {
  const reply = (data: any) => {
    event.reply("load-json-file-reply", data);
  };
  console.log(subDirectory, fileName);
  fileHandler.getFile(subDirectory, fileName, reply);
});
