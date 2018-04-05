export function reset(opts) {
    if (!opts.modal) opts.modal = {}
}

export function close() {
    console.log('close a')
    this.modal.visible = false
    this.trigger('close')
    this.update()
}
