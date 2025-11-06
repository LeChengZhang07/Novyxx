let scene, camera, renderer, particles = [];
        let mouseX = 0, mouseY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;
        let particleSystem;
        let time = 0;
        function initWebGL() {
            const canvas = document.getElementById('webgl-canvas');
            scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x0f172a, 0.0012);
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 4000);
            camera.position.z = 1400;
            renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true,
                alpha: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(0x000000, 0);
            const particleCount = 5000;
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);
            const sizes = new Float32Array(particleCount);
            const color1 = new THREE.Color(0x3b82f6);
            const color2 = new THREE.Color(0x60a5fa);
            const color3 = new THREE.Color(0x818cf8);
            const color4 = new THREE.Color(0x93c5fd);
            const color5 = new THREE.Color(0xc7d2fe);
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                const radius = 1200;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const x = radius * Math.sin(phi) * Math.cos(theta);
                const y = radius * Math.sin(phi) * Math.sin(theta);
                const z = radius * Math.cos(phi);
                positions[i3] = x;
                positions[i3 + 1] = y;
                positions[i3 + 2] = z;
                const color = new THREE.Color();
                const rand = Math.random();
                if (rand < 0.3) color.lerpColors(color1, color2, Math.random());
                else if (rand < 0.6) color.lerpColors(color2, color3, Math.random());
                else if (rand < 0.8) color.lerpColors(color3, color4, Math.random());
                else color.lerpColors(color4, color5, Math.random());
                colors[i3] = color.r;
                colors[i3 + 1] = color.g;
                colors[i3 + 2] = color.b;
                sizes[i] = Math.random() * 5 + 1.5;
            }
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
            const material = new THREE.PointsMaterial({
                size: 3,
                vertexColors: true,
                transparent: true,
                opacity: 0.9,
                sizeAttenuation: true,
                blending: THREE.AdditiveBlending
            });
            // Three.js Points are naturally round when rendered
            particleSystem = new THREE.Points(geometry, material);
            scene.add(particleSystem);
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.08);
            scene.add(ambientLight);
            const directionalLight1 = new THREE.DirectionalLight(0x3b82f6, 0.5);
            directionalLight1.position.set(1, 1, 1);
            scene.add(directionalLight1);
            const directionalLight2 = new THREE.DirectionalLight(0x60a5fa, 0.4);
            directionalLight2.position.set(-1, -1, -1);
            scene.add(directionalLight2);
            const pointLight = new THREE.PointLight(0x818cf8, 0.7, 2500);
            pointLight.position.set(0, 0, 600);
            scene.add(pointLight);
            document.addEventListener('mousemove', (event) => {
                mouseX = (event.clientX - windowHalfX) * 1.2;
                mouseY = (event.clientY - windowHalfY) * 1.2;
            });
            window.addEventListener('resize', () => {
                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
            animate();
        }
        function animate() {
            requestAnimationFrame(animate);
            time += 0.01;
            camera.position.x += (mouseX * 0.12 - camera.position.x) * 0.05;
            camera.position.y += (-mouseY * 0.12 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);
            const positions = particleSystem.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 2] += 0.4 + Math.sin(time + i * 0.015) * 0.2;
                if (positions[i + 2] > 1400) {
                    positions[i + 2] = -1400;
                }
            }
            particleSystem.geometry.attributes.position.needsUpdate = true;
            renderer.render(scene, camera);
        }
        function initScrollAnimations() {
            gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
            gsap.to('.hero-content', {
                duration: 1.6,
                y: 0,
                rotateX: 0,
                scale: 1,
                opacity: 1,
                ease: "expo.out",
                delay: 0.5
            });
            gsap.utils.toArray('.service-card').forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=150",
                        end: "top center",
                        toggleActions: "play none none none"
                    },
                    duration: 1,
                    y: 80,
                    opacity: 0,
                    rotateX: 20,
                    rotateY: 20,
                    scale: 0.85,
                    delay: i * 0.15,
                    ease: "power3.out"
                });
            });
            gsap.from('.about-text', {
                scrollTrigger: {
                    trigger: '.about-text',
                    start: "top bottom-=150",
                    end: "top center",
                    toggleActions: "play none none none"
                },
                duration: 1.2,
                x: -100,
                opacity: 0,
                ease: "power3.out"
            });
            gsap.from('.ceo-info', {
                scrollTrigger: {
                    trigger: '.ceo-info',
                    start: "top bottom-=150",
                    end: "top center",
                    toggleActions: "play none none none"
                },
                duration: 1,
                x: 60,
                opacity: 0,
                ease: "power3.out"
            });
            gsap.utils.toArray('.contact-card').forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=150",
                        end: "top center",
                        toggleActions: "play none none none"
                    },
                    duration: 1,
                    y: 60,
                    opacity: 0,
                    scale: 0.88,
                    rotateY: 8,
                    delay: i * 0.15,
                    ease: "power3.out"
                });
            });
        }
        function initSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

                if (href === '#') return;

                    e.preventDefault();
                    const target = document.querySelector(href);

                if (target) {
                    gsap.to(window, {
                    duration: 1.2,
                    scrollTo: { y: target, offsetY: 100 },
                    ease: "power2.out"
                    });
                    }
                });
            });
        }


        function openModal(type) {
            const modals = {
                'privacy': 'privacyModal',
                'terms': 'termsModal',
                'legal': 'legalModal',
                'cookies': 'cookiesModal',
                'ethics': 'ethicsModal'
            };
            const modalId = modals[type];
            if (modalId) {
                document.getElementById(modalId).style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        }
        function closeModal(modalId) {
            const el = document.getElementById(modalId);
            if (el) {
                el.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
        function showCookieBanner() {
            const banner = document.querySelector('.cookie-banner');
            banner.style.display = 'flex';
            gsap.to(banner, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
        }

        window.addEventListener('click', function(event) {
            if (event.target.classList.contains('modal')) {
                closeModal(event.target.id);
            }
        });
        function acceptCookies() {
            try {
                localStorage.setItem(
                    'novyxx_cookie_consent',
                    JSON.stringify({ analytics: true, marketing: true, timestamp: Date.now() })
                );
            } catch(e) {
                console.warn('LocalStorage not available');
            }
            document.getElementById('cookieBanner').style.display = 'none';
        }
        function rejectCookies() {
            try {
                localStorage.setItem(
                    'novyxx_cookie_consent',
                    JSON.stringify({ analytics: false, marketing: false, timestamp: Date.now() })
                );
            } catch(e) {
                console.warn('LocalStorage not available');
            }
            document.getElementById('cookieBanner').style.display = 'none';
        }
        function initCookieBanner() {
            try {
                const consent = localStorage.getItem('novyxx_cookie_consent');
                if (!consent) {
                    document.getElementById('cookieBanner').style.display = 'flex';
                    gsap.to('#cookieBanner', {
                        duration: 0.8,
                        y: 0,
                        opacity: 1,
                        delay: 1.4,
                        ease: "power2.out"
                    });
                }
            } catch(e) {
                console.warn('LocalStorage not available, showing cookie banner');
                document.getElementById('cookieBanner').style.display = 'flex';
                gsap.to('#cookieBanner', {
                    duration: 0.8,
                    y: 0,
                    opacity: 1,
                    delay: 1.4,
                    ease: "power2.out"
                });
            }
        }
        document.addEventListener('DOMContentLoaded', function() {
            initWebGL();
            initScrollAnimations();
            initSmoothScroll();
            initCookieBanner();
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    document.querySelectorAll('.modal').forEach(modal => {
                        if (modal.style.display === 'block') {
                            closeModal(modal.id);
                        }
                    });
                }
            });
        });

        document.addEventListener("DOMContentLoaded", () => {
        const cookieButtons = document.querySelectorAll('[onclick="showCookieBanner()"]');

        cookieButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const banner = document.getElementById('cookieBanner');
                if (!banner) return;
                banner.style.display = 'flex';
                banner.style.opacity = '1';
                banner.style.transform = 'translateY(0)';
                try {
                    gsap.fromTo(
                        banner,
                        { y: 50, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
                    );
                    } catch {
                    console.warn('GSAP no disponible, banner mostrado sin animación');
                    }
                });
            });
        });
                // =========================
        // GESTIÓN DE COOKIES EN POLÍTICA
        // =========================
        document.addEventListener('DOMContentLoaded', () => {
        const cookieForm = document.getElementById('cookieForm');
        if (!cookieForm) return; // si no estamos en el modal de cookies, no hace nada

        const analytics = cookieForm.querySelector('input[name="analytics"]');
        const marketing = cookieForm.querySelector('input[name="marketing"]');
        const savedPrefs = JSON.parse(localStorage.getItem('novyxx_cookie_consent'));

        if (savedPrefs) {
            analytics.checked = savedPrefs.analytics;
            marketing.checked = savedPrefs.marketing;
        }

        document.getElementById('acceptAll').addEventListener('click', () => {
            analytics.checked = true;
            marketing.checked = true;
            savePrefs(true, true);
        });

        document.getElementById('rejectAll').addEventListener('click', () => {
            analytics.checked = false;
            marketing.checked = false;
            savePrefs(false, false);
        });

        cookieForm.addEventListener('submit', (e) => {
            e.preventDefault();
            savePrefs(analytics.checked, marketing.checked);
        });

        function savePrefs(analyticsVal, marketingVal) {
            localStorage.setItem(
            'novyxx_cookie_consent',
            JSON.stringify({
                analytics: analyticsVal,
                marketing: marketingVal,
                timestamp: Date.now()
            })
            );
            alert('Preferencias de cookies guardadas correctamente.');
        }
        });

