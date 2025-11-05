        const hamburgerBtn = document.querySelector('.nav__hamburger');
        const closeBtn = document.querySelector('.nav__close');
        const mobileMenu = document.querySelector('.nav__menu');

        function openMenu() {
            mobileMenu.classList.add('active');
            mobileMenu.setAttribute('aria-hidden', 'false');
            hamburgerBtn.setAttribute('aria-expanded', 'true');
        }

        function closeMenu() {
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-hidden', 'true');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
        
        hamburgerBtn.addEventListener('click', openMenu);
        closeBtn.addEventListener('click', closeMenu);