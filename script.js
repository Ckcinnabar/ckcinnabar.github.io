// Language Toggle Functionality
class LanguageToggle {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.langToggleBtn = document.getElementById('langToggle');
        this.init();
    }

    init() {
        // Set initial language
        this.setLanguage(this.currentLang);

        // Add event listener to toggle button
        this.langToggleBtn.addEventListener('click', () => {
            this.toggleLanguage();
        });

        // Add smooth scroll to navigation links
        this.setupSmoothScroll();

        // Add navbar scroll effect
        this.setupNavbarScroll();

        // Add intersection observer for animations
        this.setupScrollAnimations();
    }

    setLanguage(lang) {
        this.currentLang = lang;
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);

        // Update all elements with data-en and data-zh attributes
        const elements = document.querySelectorAll('[data-en][data-zh]');
        elements.forEach(element => {
            if (lang === 'en') {
                element.textContent = element.getAttribute('data-en');
            } else {
                element.textContent = element.getAttribute('data-zh');
            }
        });

        // Update language toggle button
        const langEnSpan = this.langToggleBtn.querySelector('.lang-en');
        const langZhSpan = this.langToggleBtn.querySelector('.lang-zh');

        if (lang === 'en') {
            langEnSpan.style.display = 'inline';
            langZhSpan.style.display = 'none';
        } else {
            langEnSpan.style.display = 'none';
            langZhSpan.style.display = 'inline';
        }
    }

    toggleLanguage() {
        const newLang = this.currentLang === 'en' ? 'zh' : 'en';
        this.setLanguage(newLang);
    }

    setupSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;

                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            } else {
                navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            }

            lastScroll = currentScroll;
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        const animatedElements = document.querySelectorAll('.education-item, .timeline-item, .project-card, .skill-category, .contact-item');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// Active Navigation Link Highlight
class NavigationHighlight {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-menu a');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.highlightActiveLink();
        });
    }

    highlightActiveLink() {
        const scrollPosition = window.pageYOffset + 100;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Typing Effect for Hero Title
class TypingEffect {
    constructor(element, texts, typeSpeed = 100, deleteSpeed = 50, delayBetween = 2000) {
        this.element = element;
        this.texts = texts;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.delayBetween = delayBetween;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
    }

    type() {
        const currentText = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.delayBetween;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Particle Background (Optional Enhancement)
class ParticleBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 1,
                vx: Math.random() * 0.5 - 0.25,
                vy: Math.random() * 0.5 - 0.25
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Modal Functionality for Work Experience
class ExperienceModal {
    constructor() {
        this.modal = null;
        this.init();
    }

    init() {
        // Create modal HTML structure
        this.createModal();

        // Add click listeners to experience items
        const experienceItems = document.querySelectorAll('.timeline-content');
        experienceItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openModal(index);
            });
        });

        // Close modal when clicking outside
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }

        // Close modal with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    createModal() {
        const modalHTML = `
            <div id="experienceModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="modal-close" id="modalCloseBtn">
                            <i class="fas fa-times"></i>
                        </button>
                        <h2 class="modal-title" id="modalTitle"></h2>
                        <p class="modal-subtitle" id="modalCompany"></p>
                        <div class="modal-meta" id="modalMeta"></div>
                    </div>
                    <div class="modal-body" id="modalBody"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('experienceModal');

        // Add close button listener
        const closeBtn = document.getElementById('modalCloseBtn');
        closeBtn.addEventListener('click', () => this.closeModal());
    }

    openModal(index) {
        const experienceItems = document.querySelectorAll('.timeline-content');
        const item = experienceItems[index];

        const title = item.querySelector('h3').textContent;
        const company = item.querySelector('h4').textContent;
        const date = item.querySelector('.date').textContent;
        const location = item.querySelector('.location') ? item.querySelector('.location').textContent : '';
        const responsibilities = item.querySelectorAll('li');

        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalCompany').textContent = company;

        const metaHTML = `
            <div class="modal-meta-item">
                <i class="fas fa-calendar"></i>
                <span>${date}</span>
            </div>
            ${location ? `<div class="modal-meta-item"><i class="fas fa-map-marker-alt"></i><span>${location}</span></div>` : ''}
        `;
        document.getElementById('modalMeta').innerHTML = metaHTML;

        let responsibilitiesHTML = '<div class="modal-section"><h3>Key Responsibilities</h3><ul>';
        responsibilities.forEach(resp => {
            responsibilitiesHTML += `<li>${resp.textContent}</li>`;
        });
        responsibilitiesHTML += '</ul></div>';

        document.getElementById('modalBody').innerHTML = responsibilitiesHTML;

        // Calculate scrollbar width and set CSS variable
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

        console.log('Opening modal - adding modal-open class to body');
        console.log('Body classes before:', document.body.className);

        this.modal.classList.add('active');
        document.body.classList.add('modal-open');

        console.log('Body classes after:', document.body.className);
        console.log('Body overflow style:', window.getComputedStyle(document.body).overflow);
    }

    closeModal() {
        console.log('Closing modal - removing modal-open class from body');
        console.log('Body classes before close:', document.body.className);

        this.modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        document.documentElement.style.removeProperty('--scrollbar-width');

        console.log('Body classes after close:', document.body.className);
        console.log('Body overflow style after close:', window.getComputedStyle(document.body).overflow);
    }
}

// Education Modal Functionality
class EducationModal {
    constructor() {
        this.modal = null;
        this.currentLang = localStorage.getItem('language') || 'en';
        this.init();
    }

    init() {
        // Create modal HTML structure
        this.createModal();

        // Add click listeners to education items
        const educationItems = document.querySelectorAll('.education-item.clickable');
        educationItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openModal(index);
            });
        });

        // Close modal when clicking outside
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }

        // Close modal with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    createModal() {
        const modalHTML = `
            <div id="educationModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="modal-close" id="eduModalCloseBtn">
                            <i class="fas fa-times"></i>
                        </button>
                        <h2 class="modal-title" id="eduModalTitle"></h2>
                        <p class="modal-subtitle" id="eduModalDegree"></p>
                        <div class="modal-meta" id="eduModalMeta"></div>
                    </div>
                    <div class="modal-body" id="eduModalBody"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('educationModal');

        // Add close button listener
        const closeBtn = document.getElementById('eduModalCloseBtn');
        closeBtn.addEventListener('click', () => this.closeModal());
    }

    openModal(index) {
        const educationItems = document.querySelectorAll('.education-item.clickable');
        const item = educationItems[index];

        const school = item.querySelector('h4').textContent;
        const date = item.querySelector('.date').textContent;
        const degree = item.querySelector('.degree');
        const location = item.querySelector('.location') ? item.querySelector('.location').textContent : '';
        const courses = item.querySelectorAll('.course-list li');

        document.getElementById('eduModalTitle').textContent = school;

        const degreeText = this.currentLang === 'en' ?
            degree.getAttribute('data-en') :
            degree.getAttribute('data-zh');
        document.getElementById('eduModalDegree').textContent = degreeText;

        const metaHTML = `
            <div class="modal-meta-item">
                <i class="fas fa-calendar"></i>
                <span>${date}</span>
            </div>
            ${location ? `<div class="modal-meta-item"><i class="fas fa-map-marker-alt"></i><span>${location}</span></div>` : ''}
        `;
        document.getElementById('eduModalMeta').innerHTML = metaHTML;

        // Add school logo to header
        const modalHeader = this.modal.querySelector('.modal-header');
        const existingLogo = modalHeader.querySelector('.modal-header-logo');
        if (existingLogo) {
            existingLogo.remove();
        }

        let logoHTML = '';
        if (school.includes('University of Florida')) {
            logoHTML = '<img src="photos/uf-university-of-florida.webp" alt="UF Logo" class="modal-header-logo">';
        } else if (school.includes('Sun Yat-Sen')) {
            logoHTML = '<img src="photos/NSYSU-Logo.png" alt="NSYSU Logo" class="modal-header-logo">';
        }

        if (logoHTML) {
            modalHeader.insertAdjacentHTML('beforeend', logoHTML);
        }

        // Build courses HTML
        let coursesHTML = '<div class="modal-section">';
        coursesHTML += `<h3 data-en="Key Courses" data-zh="重點課程">${this.currentLang === 'en' ? 'Key Courses' : '重點課程'}</h3>`;
        coursesHTML += '<ul>';
        courses.forEach(course => {
            const courseText = this.currentLang === 'en' ?
                course.getAttribute('data-en') :
                course.getAttribute('data-zh');
            coursesHTML += `<li>${courseText}</li>`;
        });
        coursesHTML += '</ul></div>';

        // Add graduation photo for NSYSU
        let imagesHTML = '';
        if (school.includes('Sun Yat-Sen')) {
            imagesHTML = `
                <div class="modal-section">
                    <h3 data-en="Graduation Photo" data-zh="畢業照片">${this.currentLang === 'en' ? 'Graduation Photo' : '畢業照片'}</h3>
                    <div class="modal-images">
                        <img src="photos/畢業典禮.jpg" alt="Graduation Photo" class="modal-image graduation">
                    </div>
                </div>
            `;
        }

        document.getElementById('eduModalBody').innerHTML = coursesHTML + imagesHTML;

        // Calculate scrollbar width and set CSS variable
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

        this.modal.classList.add('active');
        document.body.classList.add('modal-open');
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        document.documentElement.style.removeProperty('--scrollbar-width');
    }

    updateLanguage(lang) {
        this.currentLang = lang;
    }
}

// Project Card Click Handler
class ProjectNavigation {
    constructor() {
        this.init();
    }

    init() {
        const projectCards = document.querySelectorAll('.project-card');

        // Define project links mapping
        const projectLinks = {
            0: 'projects/cauldron.html',
            1: 'projects/sports-career.html',
            2: 'projects/darts.html'
        };

        projectCards.forEach((card, index) => {
            if (projectLinks[index]) {
                card.style.cursor = 'pointer';
                card.addEventListener('click', (e) => {
                    // Don't navigate if clicking on a tag or button
                    if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
                        window.location.href = projectLinks[index];
                    }
                });
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language toggle
    new LanguageToggle();

    // Initialize navigation highlight
    new NavigationHighlight();

    // Initialize experience modal
    new ExperienceModal();

    // Initialize education modal
    new EducationModal();

    // Initialize project navigation
    new ProjectNavigation();

    // Add active class style for navigation
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu a.active {
            color: var(--primary-color);
        }
        .nav-menu a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);

    // Log to console
    console.log('Portfolio website loaded successfully!');
    console.log('Language toggle, smooth scrolling, animations, modals, and project navigation are active.');
});

// Optional: Add easter egg
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.transform = 'rotate(360deg)';
        document.body.style.transition = 'transform 2s';
        setTimeout(() => {
            document.body.style.transform = 'rotate(0deg)';
        }, 2000);
        console.log('🎉 Konami Code activated! You found the easter egg!');
    }
});
