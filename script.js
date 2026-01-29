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
            this.setupModal();
            this.setupSmoothScroll();
            this.setupScrollAnimations();
            this.setupNavigationHighlight();

            // Initialize typewriter after a short delay
            setTimeout(() => {
                new TypewriterEffect();
            }, 1000);

            // Initialize education modal
            new EducationModal(this);

            // Initialize experience modal
            new ExperienceModal(this);
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

            // Dispatch event for typewriter
            window.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { lang: this.currentLang }
            }));
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

    closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
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

    // Scroll Animations
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

        const animateElements = document.querySelectorAll(
            '.timeline-item, .project-card, .skill-card, .contact-card, .education-card'
        );

        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
            observer.observe(el);
        });

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

// Typewriter Effect
class TypewriterEffect {
    constructor() {
        this.element = document.querySelector('.typing-text');
        this.currentLang = localStorage.getItem('language') || 'en';
        this.titles = {
            en: ['Data Scientist', 'ML Engineer', 'AI Researcher'],
            zh: ['數據科學家', '機器學習工程師', 'AI 研究員']
        };
        this.currentIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.typeSpeed = 100;
        this.deleteSpeed = 50;
        this.pauseAfterType = 2000;
        this.pauseAfterDelete = 500;
        this.isRunning = false;
        this.timeoutId = null;

        if (this.element) {
            this.init();
        }
    }

    init() {
        this.startTyping();

        window.addEventListener('languageChanged', (e) => {
            this.stopTyping();
            this.currentLang = e.detail.lang;
            this.currentIndex = 0;
            this.charIndex = 0;
            this.isDeleting = false;
            this.element.textContent = '';
            setTimeout(() => this.startTyping(), 100);
        });
    }

    startTyping() {
        this.isRunning = true;
        this.type();
    }

    stopTyping() {
        this.isRunning = false;
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }

    type() {
        if (!this.isRunning) return;

        const currentText = this.titles[this.currentLang][this.currentIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            delay = this.pauseAfterType;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.currentIndex = (this.currentIndex + 1) % this.titles[this.currentLang].length;
            delay = this.pauseAfterDelete;
        }

        this.timeoutId = setTimeout(() => this.type(), delay);
    }
}

// Education Modal
class EducationModal {
    constructor(portfolio) {
        this.portfolio = portfolio;
        this.currentLang = localStorage.getItem('language') || 'en';
        this.modal = null;
        this.init();
    }

    init() {
        this.createModal();
        this.setupClickHandlers();

        window.addEventListener('languageChanged', (e) => {
            this.currentLang = e.detail.lang;
        });
    }

    createModal() {
        const modalHTML = `
            <div id="education-modal" class="modal">
                <div class="modal-backdrop"></div>
                <div class="modal-content">
                    <button class="modal-close" aria-label="Close modal">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="modal-header">
                        <div class="modal-header-with-logo">
                            <div class="modal-school-logo" id="edu-modal-logo"></div>
                            <div class="modal-header-text">
                                <span class="modal-tag" id="edu-modal-tag">Education</span>
                                <h2 id="edu-modal-title"></h2>
                                <p id="edu-modal-degree" class="modal-subtitle"></p>
                                <div id="edu-modal-meta" class="modal-meta-info"></div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-body" id="edu-modal-body"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('education-modal');

        // Close handlers
        const closeBtn = this.modal.querySelector('.modal-close');
        const backdrop = this.modal.querySelector('.modal-backdrop');

        closeBtn.addEventListener('click', () => this.closeModal());
        backdrop.addEventListener('click', () => this.closeModal());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    setupClickHandlers() {
        document.querySelectorAll('.education-card.clickable').forEach((card, index) => {
            card.addEventListener('click', () => {
                this.openModal(card, index);
            });
        });
    }

    openModal(card, index) {
        const school = card.querySelector('h4').textContent;
        const degree = card.querySelector('.edu-degree');
        const date = card.querySelector('.edu-date').textContent;
        const location = card.querySelector('.edu-location')?.textContent || '';
        const courses = card.querySelectorAll('.course-list li');
        const badge = card.querySelector('.edu-badge span');
        const logoImg = card.querySelector('.edu-logo img');
        const valPhoto = card.getAttribute('data-valedictorian-photo');

        // Set modal content
        document.getElementById('edu-modal-tag').textContent = this.currentLang === 'en' ? 'Education' : '學歷';
        document.getElementById('edu-modal-title').textContent = school;
        document.getElementById('edu-modal-degree').textContent = degree.getAttribute(`data-${this.currentLang}`) || degree.textContent;

        // Set logo
        if (logoImg) {
            document.getElementById('edu-modal-logo').innerHTML = `<img src="${logoImg.src}" alt="${school}">`;
        }

        // Meta info
        let metaHTML = `
            <div class="modal-meta-item">
                <i class="fas fa-calendar"></i>
                <span>${date}</span>
            </div>
        `;
        if (location) {
            metaHTML += `
                <div class="modal-meta-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${location}</span>
                </div>
            `;
        }
        document.getElementById('edu-modal-meta').innerHTML = metaHTML;

        // Body content
        let bodyHTML = '';

        // Valedictorian photo
        if (valPhoto) {
            bodyHTML += `
                <div class="modal-photo">
                    <img src="${valPhoto}" alt="${this.currentLang === 'en' ? 'Graduation Ceremony' : '畢業典禮'}">
                </div>
            `;
        }

        // Badge (Valedictorian)
        if (badge) {
            const badgeText = badge.getAttribute(`data-${this.currentLang}`) || badge.textContent;
            bodyHTML += `
                <div class="modal-highlight">
                    <i class="fas fa-star"></i>
                    <span>${badgeText}</span>
                </div>
            `;
        }

        // Courses
        if (courses.length > 0) {
            bodyHTML += `
                <div class="modal-section">
                    <h3>${this.currentLang === 'en' ? 'Key Courses' : '重點課程'}</h3>
                    <div class="modal-courses">
            `;
            courses.forEach(course => {
                const courseText = course.getAttribute(`data-${this.currentLang}`) || course.textContent;
                bodyHTML += `<span class="course-tag">${courseText}</span>`;
            });
            bodyHTML += `</div></div>`;
        }

        document.getElementById('edu-modal-body').innerHTML = bodyHTML;

        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Experience Modal
class ExperienceModal {
    constructor(portfolio) {
        this.portfolio = portfolio;
        this.currentLang = localStorage.getItem('language') || 'en';
        this.modal = null;
        this.init();
    }

    init() {
        this.createModal();
        this.setupClickHandlers();

        window.addEventListener('languageChanged', (e) => {
            this.currentLang = e.detail.lang;
        });
    }

    createModal() {
        const modalHTML = `
            <div id="experience-modal" class="modal">
                <div class="modal-backdrop"></div>
                <div class="modal-content">
                    <button class="modal-close" aria-label="Close modal">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="modal-header">
                        <span class="modal-tag" id="exp-modal-tag">Experience</span>
                        <h2 id="exp-modal-title"></h2>
                        <p id="exp-modal-company" class="modal-subtitle"></p>
                        <div id="exp-modal-meta" class="modal-meta-info"></div>
                    </div>
                    <div class="modal-body" id="exp-modal-body"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('experience-modal');

        // Close handlers
        const closeBtn = this.modal.querySelector('.modal-close');
        const backdrop = this.modal.querySelector('.modal-backdrop');

        closeBtn.addEventListener('click', () => this.closeModal());
        backdrop.addEventListener('click', () => this.closeModal());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    setupClickHandlers() {
        document.querySelectorAll('.timeline-item.clickable').forEach((item) => {
            item.addEventListener('click', () => {
                this.openModal(item);
            });
        });
    }

    openModal(item) {
        const card = item.querySelector('.timeline-card');
        const title = card.querySelector('.card-title').textContent;
        const company = card.querySelector('.card-company').textContent;
        const date = card.querySelector('.card-date').textContent;
        const type = card.querySelector('.card-type');
        const locationEl = card.querySelector('.card-location');
        const summary = card.querySelector('.card-summary');
        const details = card.querySelectorAll('.card-details li');

        // Set type tag
        const typeText = type.getAttribute(`data-${this.currentLang}`) || type.textContent;
        document.getElementById('exp-modal-tag').textContent = typeText;

        // Set title and company
        document.getElementById('exp-modal-title').textContent = title;
        document.getElementById('exp-modal-company').textContent = company;

        // Meta info
        let metaHTML = `
            <div class="modal-meta-item">
                <i class="fas fa-calendar"></i>
                <span>${date}</span>
            </div>
        `;
        if (locationEl) {
            const locationSpan = locationEl.querySelector('span[data-en]');
            const locationText = locationSpan
                ? (locationSpan.getAttribute(`data-${this.currentLang}`) || locationSpan.textContent)
                : locationEl.textContent.trim();
            metaHTML += `
                <div class="modal-meta-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${locationText}</span>
                </div>
            `;
        }
        document.getElementById('exp-modal-meta').innerHTML = metaHTML;

        // Body content
        let bodyHTML = '';

        // Summary
        if (summary) {
            const summaryText = summary.getAttribute(`data-${this.currentLang}`) || summary.textContent;
            bodyHTML += `
                <div class="modal-section">
                    <h3>${this.currentLang === 'en' ? 'Overview' : '概述'}</h3>
                    <p>${summaryText}</p>
                </div>
            `;
        }

        // Details
        if (details.length > 0) {
            bodyHTML += `
                <div class="modal-section">
                    <h3>${this.currentLang === 'en' ? 'Key Responsibilities' : '主要職責'}</h3>
                    <ul class="modal-details-list">
            `;
            details.forEach(detail => {
                const detailText = detail.getAttribute(`data-${this.currentLang}`) || detail.textContent;
                bodyHTML += `<li>${detailText}</li>`;
            });
            bodyHTML += `</ul></div>`;
        }

        document.getElementById('exp-modal-body').innerHTML = bodyHTML;

        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
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

            if (projectLink.classList.contains('modal-trigger')) return;

            const href = projectLink.getAttribute('href');
            if (!href) return;

            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
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
