import { config } from '../shared'

export class AppHero {
    constructor(tag) {
        tag.config = config
    }
}
