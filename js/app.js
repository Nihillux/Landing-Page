/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

//GLOBAL VARIABLES

const sections = document.querySelectorAll('section');
const navlist = document.getElementById('navbar__list');
let timeout;
const navmenu = document.querySelector('.navbar__menu');

//SECONDARY FUNCTIONS

//inserting double span for each navigation item to display one or the other depending on the device (responsive)
const generateli = (section)=> {
    const navelement = `<a class="menu__link"><span class="normal">${section.dataset.nav}</span><span class="responsive">${section.dataset.nav.slice(-1)}</span></a>`;
    return navelement;
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

function noscroll(){
    navmenu.classList.add('barhidden');
}

//nav bar starts hidden as web loads. class hidden removed and timeout is reset everytime you scroll.
function hideNavbar(){
    navmenu.classList.remove('barhidden');
    if(timeout)clearTimeout(timeout);
    timeout = setTimeout(noscroll, 5000);
}

function activeSection(){
    sections.forEach(element => {
        isInViewport(element);
        let li = document.querySelector('.' + element.id);
        if (isInViewport(element)){            
            li.classList.add('your-active-class');
            element.classList.add('your-active-class');
        }
        else{
            li.classList.remove('your-active-class');
            element.classList.remove('your-active-class');
        }
    })
}

function hideTotop(){
    let totop = document.querySelector('.totop');
    if(window.scrollY > 0){        
        totop.classList.add('visible');
    }
    else{
        totop.classList.remove('visible');
    }
}

//MAIN FUNCTIONS

// The nav bar is built with the sections present in html
sections.forEach(element => {
    const li = document.createElement('li');
    li.insertAdjacentHTML('beforeend', generateli(element));
    li.addEventListener('click', (event) => {
        event.preventDefault();
        element.scrollIntoView({behavior: "smooth"});
    })
    li.classList.add(element.id);
    navlist.appendChild(li);
});

/*
Scroll will:
- hide the navigation bar while you scroll and show it again after a 5 second timeout
- detect and apply the appropiate class to the active section
- hide the to top botton when you are at the top of the page
*/
function handleScroll() {
    hideNavbar();
    activeSection();
    hideTotop();
}

//EVENTS

//event listener for scroll
document.addEventListener('scroll', handleScroll);

//event listener for the to top botton
document.querySelector('.totop').addEventListener('click', () => {window.scrollTo({ top: 0, behavior: 'smooth' })});