import { config } from '../../shared'
import Web3 from 'web3'
import { givenProvider } from 'web3'

const w3 = new Web3(givenProvider || 'ws://localhost:8546')
const eth = w3.eth

function initEth() {
    return eth.getAccounts().then(accs => {
        eth.defaultAccount = accs[0]
    })
}

function getEth() {
    return new Promise((ok, rej) => {
        eth.getBalance(eth.defaultAccount).then(bal => {
            ok(bal / Math.pow(10, 18))
        }).catch(rej)
    })
}

function close() {
    this.visible = false
    this.trigger('close')
    this.update()
}

function ok() {
    console.log('ok', eth, eth.defaultAccount)
    const { price } = this.info
    eth.sendTransaction({
        from: eth.defaultAccount,
        to: config.cashierAddress,
        value: price * Math.pow(10, 18)
    }).then(function(receipt){
        console.log('validation passed', receipt)
        window.open('http://google.com', '_blank')
    }).catch(err => {
        console.log('transaction error', err)
    })
}

function show(info) {
    this.visible = true
    this.info = info
    const { price = 0 } = info
    getEth().then(bal => {
        this.canEnter = bal > price + 2
        console.log(this.canEnter)
        this.update()
    })
}

export class Modal {
    constructor(tag, opts = {}) {
        initEth().then(() => {
            tag.canEnter = false
            tag.modal = opts.modal || {}
            tag.ok = ok.bind(tag)
            tag.close = close.bind(tag)
            tag.show = show.bind(tag)
        })
        // tag.on('mount', reset.bind(tag, opts))
    }
}
