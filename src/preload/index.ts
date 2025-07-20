import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  // 为将来的 IPC 通信预留接口
})
