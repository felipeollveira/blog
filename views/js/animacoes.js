const dropdown = document.getElementById('dropdown');
const menu = document.getElementById('menu');
const grids = document.getElementById('grid');

dropdown.onclick = function() {
    if (menu.style.display === 'block') {
        menu.style.display = 'none'
    }else{

        menu.style.display = 'block'
    }

    grids.classList.toggle('home-grid-mobile');
};
