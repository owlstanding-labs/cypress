export function injectHTML(html) {
    var div = document.createElement('div')
    div.innerHTML = html instanceof Array ? html.join('\n') : html
    // while (div.firstChild) {
        document.body.appendChild(div.firstChild)
    // }
}

// export default injectHTML
// export var njectHTML = injectHTML
