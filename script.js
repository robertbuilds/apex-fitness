    const sections = document.querySelectorAll('div[id]');
    const navLinks = document.querySelectorAll('.nav-links ul li a');
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
    let isClickScrolling = false;

    allAnchorLinks.forEach(link => {
        link.addEventListener('click', function() {
            isClickScrolling = true;
            const targetId = this.getAttribute('href');
            
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
                if(navLink.getAttribute('href') === targetId) {
                    navLink.classList.add('active');
                }
            });

            setTimeout(() => {
                isClickScrolling = false;
            }, 1000);
        });
    });

    window.addEventListener('scroll', () => {
        if (isClickScrolling) return;

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        scrollObserver.observe(el);
    });

    const buttons = document.querySelectorAll('.show-details');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const passContainer = this.closest('.membership-pass');
            const extraInfo = passContainer.querySelector('.membership-extra-informations');
            extraInfo.classList.toggle('active');
        });
    });

    document.querySelectorAll('.faq-button').forEach(button => {
        button.addEventListener('click', () => {
            const parent = button.closest('.faq-box');
            document.querySelectorAll('.faq-box').forEach(box => {
                if (box !== parent) box.classList.remove('active');
            });
            parent.classList.toggle('active');
        });
    });

    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

        // --- Hamburger Menu Logic ---
    const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");
const body = document.body; // Selectăm body-ul

// 1. Când apeși pe cele 3 liniuțe (deschizi/închizi meniul)
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    
    // Aici e magia: blochează sau deblochează scroll-ul
    body.classList.toggle("no-scroll");
});

// 2. Când apeși pe oricare link din meniu (ca să te ducă la secțiune)
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        // Închide meniul
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        
        // DEBLOCHează scroll-ul ca să poată coborî pagina la secțiunea dorită
        body.classList.remove("no-scroll");
    });
});