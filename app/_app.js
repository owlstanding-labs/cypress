import Web3 from 'web3'
import { givenProvider } from 'web3'

export var w3cli = new Web3(givenProvider || 'ws://localhost:8546')

export function cool(w) {
    return () => {
        console.log(w)
    }
}

export var items = [{
    name: 'a',
    url: './assets/artworks/art1.png',
    views: 123
}, {
    name: 'b',
    url: './assets/artworks/art2.png',
    views: 456
}, {
    name: 'c',
    url: './assets/artworks/art3.png',
    views: 789
}]