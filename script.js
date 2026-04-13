/* ===== PRELOADER ===== */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
        initRevealAnimations();
        animateStats();
    }, 1200);
});

document.body.style.overflow = 'hidden';

/* ===== TYPING EFFECT ===== */
const typedElement = document.getElementById('typed-text');
const titles = [
    'Mechanical Engineer',
    'Trainee Assistant Engineer',
    'KSRM Steel Plant',
    'CUET Graduate'
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const current = titles[titleIndex];

    if (isDeleting) {
        typedElement.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedElement.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 40 : 70;

    if (!isDeleting && charIndex === current.length) {
        delay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        delay = 400;
    }

    setTimeout(typeEffect, delay);
}

setTimeout(typeEffect, 1500);

/* ===== NAVBAR ===== */
const navbar = document.getElementById('navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    updateActiveNav();
    toggleBackToTop();
});

// Mobile toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// Active nav tracking
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);

        if (link) {
            if (scrollPos >= top && scrollPos < top + height) {
                navItems.forEach(a => a.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

/* ===== SCROLL REVEAL ===== */
function initRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for sibling elements
                const siblings = entry.target.parentElement.querySelectorAll('.reveal-up');
                const siblingIndex = Array.from(siblings).indexOf(entry.target);
                const delay = siblingIndex * 100;

                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal-up').forEach(el => {
        observer.observe(el);
    });
}

/* ===== STAT COUNTER ===== */
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.dataset.target);
                const suffix = el.dataset.suffix || '';
                const isDecimal = target % 1 !== 0;
                const duration = 1500;
                const startTime = performance.now();

                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const ease = 1 - Math.pow(1 - progress, 3);
                    const current = target * ease;

                    if (isDecimal) {
                        el.textContent = current.toFixed(2) + suffix;
                    } else {
                        el.textContent = Math.round(current) + suffix;
                    }

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    }
                }

                requestAnimationFrame(update);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

/* ===== BACK TO TOP ===== */
const backToTop = document.getElementById('back-to-top');

function toggleBackToTop() {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ===== PARALLAX GEARS ===== */
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const gears = document.querySelectorAll('.gear');

    gears.forEach((gear, i) => {
        const speed = (i + 1) * 0.02;
        gear.style.transform = `rotate(${scrollY * speed}deg)`;
    });
});

/* ===== SKILL TAG HOVER RIPPLE ===== */
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.2s ease';
    });
});

/* ===== TILT EFFECT ON CARDS ===== */
document.querySelectorAll('.edu-card, .training-card, .leadership-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -3;
        const rotateY = (x - centerX) / centerX * 3;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});
