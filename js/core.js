const buttons = {}

class Page {
    html = null 
    css = null 
    path = ""
    constructor(path) {
        this.path = path
        this.load()
    }
    load() { 
        this.html = fetch(`pages/${this.path}/content.html`).then(r => r.text())
        this.css = fetch(`pages/${this.path}/style.css`).then(r => r.text()) 
    }
}

const pages = {}
const css_stack = [] 

if(sessionStorage.getItem('page') == null) {
    sessionStorage.setItem('page', 'about-me')
}

async function loadHTML(path, target) { 
    if(!(path in pages)) {
        pages[path] = new Page(path)
    }
    let html = await pages[path].html;
    let css = await pages[path].css;
    let js = await pages[path].js;
    if(html == null || css == null) {
        return 
    } 

    // remove old
    for(let i = 0; i < css_stack.length; i++) {
        let element = css_stack.pop()
        element.remove()
    }

    // add a new 
    const style = document.createElement('style')
    //const link = document.createElement('link')
    //link.rel = 'stylesheet'
    //link.href = `pages/${path}/style.css`
    style.textContent = css 
    document.head.appendChild(style)
    //document.head.appendChild(link)

    //css_stack.push(link) 
    css_stack.push(style) 
    
    document.querySelector(target).innerHTML = html;
    sessionStorage.setItem('page', path) 
    lang_refresh()
}

document.addEventListener("DOMContentLoaded", () => {
    buttons['btn-about-me'] = document.querySelector('#btn-about-me')
    buttons['btn-education'] = document.querySelector('#btn-education')
    buttons['btn-portfolio'] = document.querySelector('#btn-portfolio')
    buttons['btn-contact'] = document.querySelector('#btn-contact') 

    let page = sessionStorage.getItem('page')

    set_page(page) 
});

function set_page_on_click(element) {
    if(element == null) {
        return 
    }

    console.log(element.dataset.d)

    set_page(element.dataset.d)
}

function set_page(page) {

    for(let key in buttons) {
        let element = buttons[key]
        element.classList.remove("page-selected")
        if(element.dataset.d == page) {
            element.classList.add("page-selected")
        }
    }

    const wrapper = document.querySelector("main")
    wrapper.innerHTML = ""; 

    loadHTML(`${page}`, "main")
}
