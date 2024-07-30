const dropdown = document.getElementById('dropdown')
const content = document.getElementById('menu')
const arrow = document.getElementById('arrow')
const autor = document.querySelectorAll(`.autor-info`)
const dropdownprofiles = document.getElementById('dropdown-acc')

dropdown.addEventListener('click', () => {
    if(dropdownprofiles.style.display === 'none'){
        dropdownprofiles.style.display ='block'
        arrow.style.display ='none'
        autor.style.display = 'none'
    }else{
        dropdownprofiles.style.display = 'none'
    }
});

const profilesModal = () => {
    dropdownprofiles.style.display = 'none'
    arrow.style.display ='inline-block'

}
