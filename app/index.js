import riot from 'riot'
/* global DEV */
if (DEV) {
    /* global require */
    require('riot-hot-reload')
}
import './app.pug'

riot.mount('app')
