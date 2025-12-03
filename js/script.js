document.addEventListener('DOMContentLoaded', function() {

    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }


    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
       
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value;

          
            if (!nombre || !email || !telefono || !asunto || !mensaje) {
                alert('Por favor, completa todos los campos');
                return;
            }

           
            alert('¡Gracias por tu mensaje, ' + nombre + '! Nos pondremos en contacto contigo pronto.');
            
            
            contactForm.reset();
        });
    }

   
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animación a elementos
    const animateElements = document.querySelectorAll('.feature-card, .car-card, .service-card, .value-card, .team-member');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

  
    const carouselSwiper = document.querySelector('.carousel-swiper');
    if (carouselSwiper) {
        new Swiper('.carousel-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true, 
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
   
            touchEventsTarget: 'container',
            simulateTouch: true,
            touchRatio: 1,
            touchAngle: 45,
            grabCursor: true,
       
            breakpoints: {
                480: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 25,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            },
          
            on: {
                init: function() {
                   
                    if (window.innerWidth <= 768) {
                        this.params.autoplay.delay = 3000; 
                    }
                },
                resize: function() {
                    if (window.innerWidth <= 768) {
                        this.params.autoplay.delay = 3000;
                    } else {
                        this.params.autoplay.delay = 4000;
                    }
                }
            }
        });
    }

 
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
        
            const nombre = document.getElementById('nombre').value;
            const apellido = document.getElementById('apellido').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const fechaNacimiento = document.getElementById('fechaNacimiento').value;
            const genero = document.getElementById('genero').value;
            const direccion = document.getElementById('direccion').value;
            const ciudad = document.getElementById('ciudad').value;
            const codigoPostal = document.getElementById('codigoPostal').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terminos = document.getElementById('terminos').checked;

            // Validación básica
            if (!nombre || !apellido || !email || !telefono || !fechaNacimiento || 
                !genero || !direccion || !ciudad || !codigoPostal || !password || !confirmPassword) {
                alert('Por favor, completa todos los campos obligatorios');
                return;
            }

            
            if (password.length < 8) {
                alert('La contraseña debe tener al menos 8 caracteres');
                return;
            }

            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }

           
            if (!terminos) {
                alert('Debes aceptar los términos y condiciones');
                return;
            }

            
            alert('¡Registro exitoso! Bienvenido a AutoPremium, ' + nombre + ' ' + apellido + '. Te hemos enviado un correo de confirmación.');
            
         
            registrationForm.reset();
        });
    }
});


function filtrarVehiculos() {
    const tipo = document.getElementById('tipo')?.value || '';
    const precio = document.getElementById('precio')?.value || '';
    const marca = document.getElementById('marca')?.value || '';

    const carCards = document.querySelectorAll('.car-card');
    let visibleCount = 0;

    carCards.forEach(card => {
        const cardTipo = card.getAttribute('data-tipo') || '';
        const cardPrecio = parseInt(card.getAttribute('data-precio')) || 0;
        const cardMarca = card.getAttribute('data-marca') || '';

        let showCard = true;

       
        if (tipo && cardTipo !== tipo) {
            showCard = false;
        }

        
        if (precio && showCard) {
            switch(precio) {
                case '0-30000':
                    if (cardPrecio > 30000) showCard = false;
                    break;
                case '30000-50000':
                    if (cardPrecio < 30000 || cardPrecio > 50000) showCard = false;
                    break;
                case '50000-80000':
                    if (cardPrecio < 50000 || cardPrecio > 80000) showCard = false;
                    break;
                case '80000+':
                    if (cardPrecio <= 80000) showCard = false;
                    break;
            }
        }

        
        if (marca && cardMarca !== marca) {
            showCard = false;
        }

        
        if (showCard) {
            card.style.display = 'block';
            visibleCount++;
           
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });

  
    const inventorySection = document.querySelector('.inventory-section');
    let noResultsMsg = document.getElementById('noResultsMessage');
    
    if (visibleCount === 0) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.id = 'noResultsMessage';
            noResultsMsg.style.cssText = 'text-align: center; padding: 3rem; color: var(--color-text-light);';
            noResultsMsg.innerHTML = '<h3>No se encontraron vehículos</h3><p>Intenta con otros filtros de búsqueda.</p>';
            if (inventorySection) {
                const container = inventorySection.querySelector('.container');
                if (container) {
                    container.appendChild(noResultsMsg);
                }
            }
        }
        noResultsMsg.style.display = 'block';
    } else {
        if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            
        });
    });
});


window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        hero.style.transform = 'translateY(' + rate + 'px)';
    }
});


function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


        
      