/**
 * Digital Observatory - Portfolio JavaScript
 * Handles language toggle, navigation, animations, and interactions
 */

class Portfolio {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setLanguage(this.currentLang);
            this.setupLanguageToggle();
            this.setupNavbarScroll();
            this.setupMobileMenu();
            this.setupEducationCards();
            this.setupModal();
            this.setupSmoothScroll();
            this.setupScrollAnimations();
            this.setupNavigationHighlight();
        });
    }

    // Language Toggle
    setupLanguageToggle() {
        const langToggle = document.getElementById('langToggle');
        if (!langToggle) return;

        langToggle.addEventListener('click', () => {
            this.currentLang = this.currentLang === 'en' ? 'zh' : 'en';
            this.setLanguage(this.currentLang);
            localStorage.setItem('language', this.currentLang);
        });
    }

    setLanguage(lang) {
        this.currentLang = lang;
        document.documentElement.lang = lang;

        // Update all elements with data-en and data-zh attributes
        document.querySelectorAll('[data-en][data-zh]').forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });

        // Toggle language button display
        document.querySelectorAll('.lang-en').forEach(el => {
            el.style.display = lang === 'en' ? 'inline' : 'none';
        });
        document.querySelectorAll('.lang-zh').forEach(el => {
            el.style.display = lang === 'zh' ? 'inline' : 'none';
        });
    }

    // Navbar Scroll Effect
    setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu
    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (!menuToggle || !navMenu) return;

        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    // Education Cards Expansion
    setupEducationCards() {
        document.querySelectorAll('.education-card.clickable').forEach(card => {
            card.addEventListener('click', () => {
                const courseList = card.querySelector('.course-list');
                if (!courseList) return;

                const isExpanded = card.classList.contains('expanded');

                // Close all other cards
                document.querySelectorAll('.education-card.expanded').forEach(openCard => {
                    if (openCard !== card) {
                        openCard.classList.remove('expanded');
                        const openList = openCard.querySelector('.course-list');
                        if (openList) openList.style.display = 'none';
                    }
                });

                // Toggle current card
                card.classList.toggle('expanded');
                courseList.style.display = isExpanded ? 'none' : 'grid';
            });
        });
    }

    // Modal
    setupModal() {
        const modal = document.getElementById('sports-career-modal');
        const modalTriggers = document.querySelectorAll('.modal-trigger');
        const sportsCard = document.getElementById('sports-career-card');
        const modalClose = modal?.querySelector('.modal-close');
        const modalBackdrop = modal?.querySelector('.modal-backdrop');

        if (!modal) return;

        // Open modal from trigger buttons
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.openModal(modal);
            });
        });

        // Open modal from card click
        if (sportsCard) {
            sportsCard.addEventListener('click', (e) => {
                // Don't open if clicking on a link or button
                if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                    return;
                }
                this.openModal(modal);
            });
        }

        // Close modal
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', closeModal);
        }

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Smooth Scroll
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;

                e.preventDefault();

                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    // Navigation Highlight
    setupNavigationHighlight() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });

        // Add active link style
        const style = document.createElement('style');
        style.textContent = `
            .nav-link.active {
                color: var(--text-primary) !important;
            }
            .nav-link.active::after {
                width: 100% !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Scroll Animations (Intersection Observer)
    setupScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        const animateElements = document.querySelectorAll(
            '.timeline-item, .project-card, .skill-card, .contact-card, .education-card'
        );

        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
            observer.observe(el);
        });

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Project Card Navigation
class ProjectNavigation {
    constructor() {
        this.init();
    }

    init() {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            const projectLink = card.querySelector('.project-link');
            if (!projectLink) return;

            // Skip modal triggers
            if (projectLink.classList.contains('modal-trigger')) return;

            const href = projectLink.getAttribute('href');
            if (!href) return;

            // Make entire card clickable
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                // Don't navigate if clicking on a tag or internal link
                if (e.target.classList.contains('tag') || e.target.closest('.project-tags')) {
                    return;
                }
                window.location.href = href;
            });
        });
    }
}

// Initialize Portfolio
const portfolio = new Portfolio();

// Initialize Project Navigation after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectNavigation();

    console.log('Portfolio website loaded successfully!');
});
