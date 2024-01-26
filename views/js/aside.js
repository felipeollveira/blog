const dropdown = document.getElementById('dropdown')
const content = document.getElementById('menu')
const arrow = document.getElementById('arrow')

dropdown.addEventListener('click', () => {
    console.log('Dropdown clicado!');

    content.style.display = (content.style.display === 'none') ? 'block' : 'none';
    arrow.style.transform = (content.style.display === 'block') ? 'rotate(180deg)' : 'rotate(360deg)';
});
