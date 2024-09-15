let but = document.getElementById("act");
let operations = document.getElementsByClassName("operaciones")[0];
let cyphers = document.getElementsByClassName("cifras-container")[0];

let cifras = document.getElementsByClassName("cifra");

let operaciones = document.getElementsByClassName("operation");
/*
let cifrasUp = cifras.slice(0, 6);
console.log(cifrasUp);
*/
/*
but.onclick = () => {
    cyphers.style.transform = "translateY(-20vh)";
    operations.style.transform = "translateY(20vh)";
    operations.style.opacity = "1";
}
*/

function disableBottomButtons() {
    for (let i = 6; i < cifras.length; i++) {
        cifras[i].disabled = true;
        cifras[i].style.opacity = "0.5";
        cifras[i].style.cursor = "not-allowed";
    }
}

function disableOperationButtons() {
    for (let i = 0; i < operaciones.length; i++) {
        operaciones[i].disabled = true;
        operaciones[i].style.opacity = "0.5";
        operaciones[i].style.cursor = "not-allowed";
    }
}

function disableButton(i) {
    cifras[i].disabled = true;
    cifras[i].style.opacity = "0.5";
    cifras[i].style.cursor = "not-allowed";
}

function disableOperation(i) {
    operaciones[i].disabled = true;
    operaciones[i].style.opacity = "0.5";
    operaciones[i].style.cursor = "not-allowed";
}

function selectButtonStyle(pos, type, color) {
    if (type == "operation") {        
        operaciones[pos].style.border = `1px solid ${color}`;
        operaciones[pos].style.backgroundColor = `${color}`;
    } else {
        cifras[pos].style.border = `1px solid ${color}`;
        cifras[pos].style.color = `${color}`;
    }
}

function disableButtons(type) {
    if (type == "operation") {
        for (let i = 0; i < operaciones.length; i++) {
            disableOperation(i);
        }
    } else {
        for (let i = 0; i < cifras.length; i++) {
            disableButton(i);
        }
    }
}

function enableOperations() {
    for (let i = 0; i < operaciones.length; i++) {
        operaciones[i].disabled = false;
        operaciones[i].style.opacity = "1";
        operaciones[i].style.cursor = "pointer";
    }
}

function enableBottomButtons() {
    for (let i = 6; i < cifras.length; i++) {
        cifras[i].disabled = false;
        cifras[i].style.opacity = "1";
        cifras[i].style.cursor = "pointer";
    }
}

function operation() {

    let cifra1 = 0;
    let op = '';
    let cifra2 = 0;

    disableBottomButtons();
    disableOperationButtons();
    for (let i = 0; i < cifras.length/2; i++) {
        cifras[i].addEventListener("click", () => {
            cifra1 = parseInt(cifras[i].innerHTML);
            selectButtonStyle(i, "cypher","#ff2957");
            enableOperations();
            disableButtons("cypher");
        })
    }
    console.log(cifra1);
    
    for (let i = 0; i < operaciones.length; i++) {
        operaciones[i].addEventListener("click", () => {
            op = operaciones[i].innerHTML;
            selectButtonStyle(i, "operation", "#0073ff");
            disableButtons("operation");
            enableBottomButtons();
        })
    }
    
    
    for (let i = 6; i < cifras.length; i++) {
        cifras[i].addEventListener("click", () => {
            cifra2 = parseInt(cifras[i].innerHTML);
            selectButtonStyle(i, "cypher","#ff2957");
            disableButtons("cypher");
            console.log(op);
            op = op.trim();
            let res = () => {
                if (op == "<i class=\"fa-solid fa-plus\"></i>") {
                    return [cifra1, "+", cifra2, cifra1 + cifra2];
                } else if (op == "<i class=\"fa-solid fa-minus\"></i>") {
                    return [cifra1, "-", cifra2, cifra1 - cifra2];
                } else if (op == "<i class=\"fa-solid fa-xmark\"></i>") {
                    return [cifra1, "x", cifra2, cifra1 * cifra2];
                } else if (op == "<i class=\"fa-solid fa-divide\"></i>"){        
                    return [cifra1, "/", cifra2, cifra1 / cifra2];
                }
            }
            if (typeof res() == "array") {
                return res();
            }
        })
    }
}

window.onload = () => {
    if (operation()[3] != undefined) {
        console.log(operation()[3]);
    }
}