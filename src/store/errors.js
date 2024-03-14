import { defineStore } from 'pinia'

export const useErrorsStore = defineStore('errors', {
  state: () => ({
    isError: false,
    errorMsg: '',
  }),
  actions: {
    pushError(msg){
      this.errorMsg = msg
      this.isError = true
    },
    popError() {
      this.isError = false
    },
  },
})
