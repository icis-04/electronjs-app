const { app, BrowserWindow, Menu, shell, ipcMain } = require("electron");
const path = require("path");

const menuItems = [
  {
    label: "Menu",
    submenu: [
      {
        label: "About",
      },
    ],
  },
  {
    label: "File",
    submenu: [
      {
        label: "Exit",
        click: () => app.quit(),
      },
      {
        type: "separator",
      },
      {
        label: "selfie",
        click: () => {
          //shell.openExternal("https://o2tvseries.com");
          const win2 = new BrowserWindow({
            height: 300,
            width: 400,
            show: false,
            backgroundColor: "white",
            webPreferences: {
              preload: path.join(__dirname, "cameraPreload.js"),
            },
          });

          //win2.webContents.openDevTools();
          win2.loadFile("camera.html");
          win2.once("ready-to-show", () => win2.show());
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const createWindow = () => {
  const win = new BrowserWindow({
    height: 500,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  /*ipcMain.on("set-image", (event, data) => {
    win.webContents.send("get-image", data);
  });*/

  //win.webContents.openDevTools();
  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
