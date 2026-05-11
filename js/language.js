
const objects = {
    'en-us' : () => fetch('assets/lang/en-us.json').then(r=>r.json()),
    'pt-br' : () => fetch('assets/lang/pt-br.json').then(r=>r.json())
}

const lang = navigator.language.toLowerCase()

if(localStorage.getItem("language") == null) {
    localStorage.setItem("language", lang=="en-us"||lang=="pt-br"?lang:"en-us")
}

document.addEventListener("DOMContentLoaded", () => {
    set_lang(localStorage.getItem("language")) 
});

function dropdown_on_click() {
    const menu = document.querySelector('.dropdown .content'); 
    menu.classList.toggle('active');
}

function dropdown_close(e) {
    const btn = document.querySelector('.dropdown #btn');
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('active');
    }
}

async function set_lang(name) {
    let loader = await objects[name]
    if(!loader) {
        return 
    }
    let obj = await loader()
    
    const elements = document.querySelectorAll('[data-l]')
    for(let element of elements) {
        element.innerHTML = obj[element.dataset.l] 
    }
    localStorage.setItem("language", name)
}

function lang_refresh() {
    set_lang(localStorage.getItem("language"))
}

function lang_pt() {
    dropdown_on_click()
    set_lang('pt-br')
}

function lang_en() {
    dropdown_on_click()
    set_lang('en-us')
}
document.addEventListener('click', dropdown_close);

