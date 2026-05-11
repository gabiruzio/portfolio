const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if(localStorage.getItem("theme") == null) {
    localStorage.setItem("theme", prefersDark? "dark" : "white")
}

document.addEventListener("DOMContentLoaded", () => {
    let is_dark = localStorage.getItem("theme") == "dark"
    set_theme(is_dark)
});

function getCSSVariables(selector) {
    const vars = {};
    for (const sheet of document.styleSheets) {
        for (const rule of sheet.cssRules) {
            if (rule.selectorText === selector) {
                for (const prop of rule.style) {
                    if (prop.startsWith("--")) {
                        vars[prop] = rule.style
                            .getPropertyValue(prop)
                            .trim();
                    }
                }
            }
        }
    }
    return vars;
}


function set_theme(is_dark=false) {
    const white = getCSSVariables(".theme-white")
    const dark = getCSSVariables(".theme-dark")
    
    let theme = is_dark? dark : white;

    for(let [key, value] of Object.entries(theme)) {
        document.documentElement.style.setProperty(key, value);
    } 

    set_icon_theme(is_dark) 
}

function set_icon_theme(is_dark=false) {
    const icon_white = document.getElementById("icon-white")
    const icon_dark = document.getElementById("icon-dark")
    if(!is_dark) {
        icon_white.classList.add("hidden")
        icon_dark.classList.remove("hidden")
    } else {
        icon_white.classList.remove("hidden")
        icon_dark.classList.add("hidden")
    }
}

function theme_on_click() {
    const svg = document.querySelector('#btn-theme svg')
    const svg_use = svg.querySelectorAll('use')
    for(let use of svg_use) { 
       use.classList.toggle('hidden')
    }  
    let is_dark = (localStorage.getItem("theme") == "white")
    localStorage.setItem("theme", is_dark? "dark" : "white")

    set_theme(is_dark)
}  




