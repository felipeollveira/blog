const dropdown = document.getElementById('dropdown')
const content = document.getElementById('menu')
const arrow = document.getElementById('arrow')

dropdown.addEventListener('click', () => {
    content.style.display = (content.style.display === 'none') ? 'block' : 'none';
    arrow.style.transform = (content.style.display === 'block') ? 'rotate(180deg)' : 'rotate(360deg)';
});


