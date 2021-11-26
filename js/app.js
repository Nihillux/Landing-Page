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

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll('section');
const navlist = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

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

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

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

function handleScroll() {
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
    let totop = document.querySelector('.totop');
    if(window.scrollY > 0){        
        totop.classList.add('visible');
    }
    else{
        totop.classList.remove('visible');
    }
}
// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 * 
*/

document.addEventListener('scroll', handleScroll);
document.querySelector('.totop').addEventListener('click', () => {window.scrollTo({ top: 0, behavior: 'smooth' })});