import { artworks } from './shared'

export function showMod(item) {
    return () => {
        this.refs.mod.show(item)
        // this.update()
    }
}

export class App {
    constructor(tag) {
        tag.mod = {}
        tag.items = artworks
        tag.showMod = showMod.bind(tag)
    }
}
