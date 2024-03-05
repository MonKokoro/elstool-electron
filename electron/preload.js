/* eslint-disable no-undef */
const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs-extra')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    elstool: () => {
        try {
            const data = fs.readFileSync('package.json', 'utf8')
            const jsonData = JSON.parse(data)

            return jsonData.version
        } catch (err) {
            console.error('无法读取项目版本号', err)
            return
        }
    },
    ping: () => ipcRenderer.invoke('ping')
    // 除函数之外，我们也可以暴露变量
})
