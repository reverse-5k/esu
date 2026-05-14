document.addEventListener('DOMContentLoaded', () => {

    // 0. Inject shared footer
    (function() {
        const el = document.getElementById('site-footer');
        if (!el) return;
        el.outerHTML = `
    <footer>
        <div class="footer-grid reveal">
            <div class="footer-col">
                <a href="index.html" class="logo"><img src="assets/images/logo-footer.png" class="logo-img" alt="ESU — Electrical Services Unlimited"></a>
                <p style="margin-top:15px; color:#aaa; line-height:1.7;">Your locally-owned, state-certified electrician serving Miami and South Florida since 2016.</p>
                <p style="margin-top:8px; color:#aaa;">License <strong style="color:var(--primary-orange);">EC13007781</strong></p>
                <div style="margin-top:20px; font-size:1.6rem; display:flex; gap:18px;">
                    <a href="https://www.facebook.com/Esumiami" target="_blank" rel="noopener" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>
                    <a href="https://www.instagram.com/esucorp/" target="_blank" rel="noopener" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                    <a href="https://www.google.com/maps/search/Electrical+Services+Unlimited+Miami" target="_blank" rel="noopener" aria-label="Google Reviews"><i class="fa-brands fa-google"></i></a>
                </div>
            </div>
            <div class="footer-col">
                <h4>Residential Services</h4>
                <ul>
                    <li><a href="electrical-repairs.html">Electrical Repairs</a></li>
                    <li><a href="panel-upgrades.html">Panel Upgrades</a></li>
                    <li><a href="generator-installation.html">Generator Installation</a></li>
                    <li><a href="lighting.html">Lighting Installation</a></li>
                    <li><a href="electrical-wiring.html">Electrical Wiring</a></li>
                    <li><a href="surge-protection.html">Surge Protection</a></li>
                    <li><a href="ev-charger-installation.html">EV Charger Installation</a></li>
                    <li><a href="electrical-inspection.html">Electrical Inspection</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Commercial Services</h4>
                <ul>
                    <li><a href="commercial.html">Commercial Overview</a></li>
                    <li><a href="commercial-buildouts.html">Tenant Improvements</a></li>
                    <li><a href="commercial-lighting.html">Commercial LED Lighting</a></li>
                    <li><a href="commercial-ev-charging.html">Business EV Charging</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Company</h4>
                <ul>
                    <li><a href="about.html">About ESU</a></li>
                    <li><a href="projects.html">Our Projects</a></li>
                    <li><a href="tips.html">Electrical Tips</a></li>
                    <li><a href="service-area-miami.html">Service Area</a></li>
                    <li><a href="contact.html">Contact Us</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Contact</h4>
                <ul>
                    <li><i class="fa-solid fa-phone" style="color:var(--primary-orange); width:20px;"></i>&nbsp;<a href="tel:+17869304300">786-930-4300</a></li>
                    <li><i class="fa-solid fa-envelope" style="color:var(--primary-orange); width:20px;"></i>&nbsp;<a href="mailto:info@esucorp.com">info@esucorp.com</a></li>
                    <li><i class="fa-regular fa-clock" style="color:var(--primary-orange); width:20px;"></i>&nbsp;24/7 Emergency</li>
                    <li><i class="fa-solid fa-location-dot" style="color:var(--primary-orange); width:20px;"></i>&nbsp;Homestead, FL</li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; 2026 Electrical Services Unlimited, Inc. All Rights Reserved. &nbsp;|&nbsp; License <strong>EC13007781</strong>
        </div>
    </footer>`;
    })();

    // 1. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => navLinks.classList.toggle('active'));
        document.addEventListener('click', (e) => {
            if (!mobileBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    // 2. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                if (navLinks && navLinks.classList.contains('active')) navLinks.classList.remove('active');
            }
        });
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Animated Counter (Stats Section)
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'), 10);
                    const duration = 1800;
                    const step = Math.ceil(target / (duration / 16));
                    let current = 0;
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            el.textContent = target.toLocaleString();
                            clearInterval(timer);
                        } else {
                            el.textContent = current.toLocaleString();
                        }
                    }, 16);
                    obs.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(c => counterObserver.observe(c));
    }

    // 5. FAQ Accordion Logic
    document.querySelectorAll('.accordion').forEach(acc => {
        acc.addEventListener('click', function () {
            // Close all others
            document.querySelectorAll('.accordion').forEach(other => {
                if (other !== this && other.classList.contains('active')) {
                    other.classList.remove('active');
                    other.nextElementSibling.style.maxHeight = null;
                }
            });
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + 'px';
        });
    });

    // 6. Keyboard accessibility for card click-throughs
    document.querySelectorAll('[tabindex="0"]').forEach(el => {
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') el.click();
        });
    });

});
