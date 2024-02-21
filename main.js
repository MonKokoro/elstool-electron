const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile('index.html')
}

// 在 Electron 中，只有在 app 模块的 ready 事件触发后才能创建 BrowserWindows 实例
// 因此通过whenReady() API来监听此事件
app.whenReady().then(() => {
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