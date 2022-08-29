function navScrollingToggle() {
    const nav = document.getElementById('nav');

    if(window.scrollY >= 100)
        nav.classList.add('nav__black');
    else
        nav.classList.remove('nav__black');
}

window.onscroll = navScrollingToggle;