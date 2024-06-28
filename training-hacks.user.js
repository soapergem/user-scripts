// ==UserScript==
// @name        Training Hacks
// @description Adds some accessibility shortcuts to corporate trainings
// @namespace   https://github.com/soapergem
// @author      soapergem
// @update      https://github.com/soapergem/user-scripts/raw/main/training-hacks.user.js
// @version     1.00
// @grant       none
// @include     *://amfamins.sabacloud.com/*
// ==/UserScript==
function skip_tutorial() {
    let buttons = document.getElementsByTagName("button");
    let matched = false;
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        if (!!~button.className.indexOf("btn-primary") && !~button.className.indexOf("hidden")) {
            matched = true;
            button.click();
            break;
        }
    }
    if (matched) {
        window.setTimeout(skip_tutorial, 10);
    }
}
function skip_toggles(toggle_key) {
    let toggles = document.getElementsByClassName(toggle_key);
    for (let i = 0; i < toggles.length; i++) {
        toggles[i].click();
        let buttons = document.getElementsByClassName("return_btn");
        if (buttons && buttons[0]) {
            if (buttons[0].disabled) {
                break;
            } else {
                buttons[0].click();
            }
        }
    }
}
function guess_best_action() {
    const toggle_keys = ["inner-spot", "img-con", "quad-btn", "hot-spot"];
    let made_guess = false;
    toggle_keys.forEach((class_name) => {
        if (made_guess) {
            return;
        }
        let elements = document.getElementsByClassName(class_name);
        if (elements.length > 0) {
            made_guess = true;
            skip_toggles(class_name);
            return;
        }
    });
    if (!made_guess) {
        skip_tutorial();
    }
}
function key_handler(event) {
    let key_code = event.key || event.keyCode || event.which;
    if (key_code == 'a' || key_code == 'A' || key_code == 65) {
        guess_best_action();
    } else {
        console.log(key_code);
    }
}
document.addEventListener("keydown", key_handler);
let frames = document.getElementsByTagName("iframe");
for (let i = 0; i < frames.length; i++) {
    frames[i].contentDocument.addEventListener("keydown", key_handler);
}
