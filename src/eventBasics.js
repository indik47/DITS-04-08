'use strict';

var parent = document.querySelector(".buttons");

for ( var i = 1; i <= 10; i++ ) {
    var btn = document.createElement('button');
    btn.classList.add("button");
    btn.value = i;
    btn.innerText = i;
    parent.appendChild(btn);
    btn.addEventListener('click', function () {
        console.log(this.value);
    });
}