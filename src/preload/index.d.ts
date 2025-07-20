export interface IElectronAPI {
  // 为将来的 IPC 通信预留类型定义
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
