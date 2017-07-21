class DefaultStatus {
  constructor() {
    this.isReady = true
    this.isInitialLoad = true
    this.isLoading = false
    this.isUpdating = false
    this.error = null
  }
}

export class DefaultState {
  constructor({ data = null }) {
    this.status = new DefaultStatus()
    this.data = data
    this.meta = {}
    this.prevStateData = null
  }
}
