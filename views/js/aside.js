const dropdown = document.getElementById('dropdown')
const content = document.getElementById('menu')
const arrow = document.getElementById('arrow')
const autor = document.getElementById('autor')
const dropdownprofiles = document.getElementById('dropdown-acc')
const asideActions = document.querySelector('.aside-actions');

dropdown.addEventListener('click', () => {
    if(dropdownprofiles){
        dropdownprofiles.style.display ='block'
        //arrow.style.display ='none'

        asideActions.classList.add('visibility-05');
    }else{
        dropdownprofiles.style.display = 'none'


    }
});

const profilesModal = () => {
    dropdownprofiles.style.display = 'none'
    arrow.style.display ='inline-block'
    asideActions.classList.remove('visibility-05');


}
