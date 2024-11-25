const dropdown = document.getElementById('dropdown')
const content = document.getElementById('menu')
const asideActions = document.querySelector('.aside-actions');


dropdown.addEventListener('focus', () => {
    content.style.display = 'block';
    asideActions.classList.add('visibility-05');
});

dropdown.addEventListener('blur', () => {
    asideActions.classList.remove('visibility-05');
});

dropdown.addEventListener('change', () => {  // Hide on selection change
    asideActions.classList.remove('visibility-05');
});
const profilesModal = () => {
    dropdownprofiles.style.display = 'none'
    arrow.style.display ='inline-block'
    asideActions.classList.remove('visibility-05');


}
