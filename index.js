const {screen, app, Tray, Menu, BrowserWindow, nativeImage} = require('electron');

const cfg = {
  w: 150,
  h: 100,
  slack: 300
}

let tray;
let win;

const createWindow = () => {
  const {width,height} = screen.getPrimaryDisplay().workAreaSize;
  win = new BrowserWindow({
    width: cfg.w,
    height: cfg.h,
    x: width - cfg.w,
    y: height - cfg.h + cfg.slack,
    frame: false,
    resizable: false
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  const icon = nativeImage.createFromPath('assets/HCI_LOGO.png');
  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Latin Square Helper',
      icon: 'assets/HCI_LOGO.png',
      enabled: false,
    },
    {
      type: 'separator',
    },
    {
      label: 'Minimize/Restore',
      type: 'normal',
      click: () => win.isMinimized() ? win.show() : win.minimize()
    },
    {
      label: 'Quit',
      type: 'normal',
      click: () => win.close()
    }
  ]);
  tray.setToolTip("HCIG Seesion running...");
  tray.setContextMenu(contextMenu);

  win.on('minimize', () => {
    return win.hide();
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  screen.on('display-metrics-changed', (event, display, changedMetrics) => {
    const {x, y, width, height} = display.workArea;
    win.setBounds({x: width - cfg.w, y: height - cfg.h, width: cfg.w, height: cfg.h})
  })
});
