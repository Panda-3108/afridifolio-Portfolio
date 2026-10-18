/* Toggle Style Switcher */

const styleSwitcherToggle = document.querySelector('.style-switcher-toggler');
styleSwitcherToggle.addEventListener('click', () => { 
    document.querySelector('.style-switcher').classList.toggle('open'); 
});

window.addEventListener('scroll', () => { 
    if(document.querySelector('.style-switcher').classList.contains('open')) { 
        document.querySelector('.style-switcher').classList.remove('open'); 
    } 
});

const alternateStyles = document.querySelectorAll('.alternate-style');
function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
        if(color === style.getAttribute('title')) { 
            style.removeAttribute('disabled'); 
        } else { 
            style.setAttribute('disabled', 'true'); 
        }
    });
}

/* Dark/Light Mode */

const dayNight = document.querySelector('.day-night');
dayNight.addEventListener('click', () => {
    dayNight.querySelector('i').classList.toggle('fa-sun');
    dayNight.querySelector('i').classList.toggle('fa-moon');
    document.body.classList.toggle('dark');
});

window.addEventListener('load', () => {
    if(document.body.classList.contains('dark')) { 
        dayNight.querySelector('i').classList.add('fa-sun'); 
    } else { 
        dayNight.querySelector('i').classList.add('fa-moon'); 
    }
});

/* Typing Animation */

var typed = new Typed('.typing', { 
    strings: ["", "Web Designer", "Web Developer", "Frontend designer"], 
    typeSpeed: 100, 
    Backspeed: 60, 
    loop: true 
});

/* Changing Aside Active Link */

const nav = document.querySelector('.nav');
const navList = nav.querySelectorAll('li');
const totalNavList = navList.length;
const allSection = document.querySelectorAll('.section');
const totalSection = allSection.length;

for(let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector('a');
    a.addEventListener('click', function(e){
        e.preventDefault();
        removeBackSection();
        for(let j = 0; j < totalNavList; j++) { 
            if(navList[j].querySelector('a').classList.contains('active')) { 
                addBackSection(j);
            }
            navList[j].querySelector('a').classList.remove('active'); 
        }
        this.classList.add('active');
        showSection(this);

        if(window.innerWidth < 1200) { 
            asideSectionTogglerBtn(); 
        }
    });
}

function addBackSection(num) { 
    allSection[num].classList.add('back-section'); 
}

function removeBackSection(){
    for( let i = 0; i < totalSection; i++){ 
        allSection[i].classList.remove('back-section'); 
    }
}

function showSection(element){
    for( let i = 0; i < totalSection; i++){ 
        allSection[i].classList.remove('active'); 
    }

    const target = element.getAttribute("href").split("#")[1];
    const targetEl = document.querySelector('#' + target);
    if(targetEl) {
        targetEl.classList.add('active');
        targetEl.scrollTop = 0;
    }
}

function updateNav(element){
    for(let i = 0; i < totalNavList; i++){
        navList[i].querySelector('a').classList.remove('active');
        const target = element.getAttribute('href').split('#')[1];
        if(target === navList[i].querySelector('a').getAttribute('href').split('#')[1]) { 
            navList[i].querySelector('a').classList.add('active'); 
        }
    }
}

document.querySelector('.hire-me').addEventListener('click', function(e){
    e.preventDefault();
    const sectionIndex = this.getAttribute('data-section-index');
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
    const contactSection = document.querySelector('#contact');
    if (contactSection) contactSection.scrollTop = 0;
});

/* Activating Mobile Menu */

const navTogglerBtn = document.querySelector('.nav-toggler');
const aside = document.querySelector('.aside');

navTogglerBtn.addEventListener('click', () => { 
    asideSectionTogglerBtn(); 
});

function asideSectionTogglerBtn(){
    aside.classList.toggle('open');
    navTogglerBtn.classList.toggle('open');
    for(let i = 0; i < totalSection; i++) { 
        allSection[i].classList.toggle('open'); 
    }
    const socials = document.querySelector('.bottom-left-socials');
    if (socials) socials.classList.toggle('open');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth < 1200 && aside.classList.contains('open')) {
        if (!aside.contains(e.target) && !navTogglerBtn.contains(e.target)) {
            asideSectionTogglerBtn();
        }
    }
});
