/* eslint-disable no-undef */
const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')

const isPackaged = app.isPackaged;

Menu.setApplicationMenu(null)

const createWindow = () => {
    const win = new BrowserWindow({
        title: "艾尔工具箱",
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        // icon: path.join(__dirname, './preload.ico'),
        // titleBarStyle: 'hidden',
        // titleBarOverlay: {
        //     color: 'rgba(0,0,0,0)',
        //     height: 35,
        //     symbolColor: 'white'
        // },
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, './preload.js')
        }
    })

    // 开发环境下：打开开发者工具
    if(!isPackaged){
        win.webContents.openDevTools()
    }

    // win.loadFile(path.join(__dirname, './index.html'))
    // win.webContents.openDevTools();
    win.loadURL('http://localhost:8000')
}

// 在 Electron 中，只有在 app 模块的 ready 事件触发后才能创建 BrowserWindows 实例
// 因此通过whenReady() API来监听此事件
app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()

    // macOS下，即使没有打开任何窗口，macOS应用通常也会继续运行。因此需要在没有窗口可用时调用app打开一个新窗口
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow()
    })
})

// 关闭所有窗口时退出应用(仅在Windows & Linux可用)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit()
})

// 如果开发需要使用nginx代理为线上地址，则loadURL为线上地址，并加入下面的代码，作用是在证书链接验证失败时触发该事件
// if(!isPackaged){
//     app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
//         event.preventDefault()
//         callback(true)
//     })
// }

