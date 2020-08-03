const buttonModal = document.querySelector('#modalBtn');
const modal = document.querySelector('#modal')

buttonModal.addEventListener('click', () => {
    modal.classList.toggle('hide');
});