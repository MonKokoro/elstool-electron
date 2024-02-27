/* eslint-disable no-undef */
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    // elstool: () => {
    //     try {
    //         const data = fs.readFileSync('package.json', 'utf8')
    //         const jsonData = JSON.parse(data)

    //         console.log('当前项目版本号：' + jsonData.version)
    //         return jsonData.version
    //     } catch (err) {
    //         console.error('无法读取 package.json 文件：', err)
    //         return
    //     }
    // },
    ping: () => ipcRenderer.invoke('ping')
    // 除函数之外，我们也可以暴露变量
})
