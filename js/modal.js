'use strict';

/*
 *  Quintana Alex
 */

// Modal Producto

const mostrarModal = document.querySelectorAll('.show-modal');
const cerrarModal = document.getElementById('close-modal');
const modal = document.getElementById('modal');
const body = document.body;

mostrarModal.forEach(showModal => {
    showModal.addEventListener('click', function(){
        modal.classList.add('active')
        body.classList.add('active');
    });
});

cerrarModal.addEventListener('click', function(){
    modal.classList.remove('active');
    body.classList.remove('active');
});