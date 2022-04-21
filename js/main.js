"use strict";

window.onload = function () {

    // Preloader
    let preloader = document.querySelector('.preloader');
    preloader.style.display = 'none';
    document.body.classList.remove("_lock");

    // Burger menu
    const burger = document.querySelector(".header__burger");
    const headerNav = document.querySelector(".header__nav");
    if (burger) {
        burger.addEventListener("click", () => {
            document.body.classList.toggle("_lock");
            burger.classList.toggle("_active");
            headerNav.classList.toggle("_active");
        });
    }

    // Footer mark
    const box = document.querySelector(".footer__cube");
    const agreement = document.querySelector(".footer__agreement");
    const mark = document.querySelector(".footer__mark");
    if (box) {
        mark.addEventListener("click", () => {
            agreement.classList.toggle("_active");
        });
    }

    // Scroll to section
    const menuLinks = document.querySelectorAll(".link[data-goto");
    if (menuLinks.length > 0) {
        menuLinks.forEach(menuLink => {
            menuLink.addEventListener("click", onMenuClick);
        });

        function onMenuClick(e) {
            const menuLink = e.target;
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector("header").offsetHeight - 20;

                document.body.classList.remove("_lock");
                burger.classList.remove("_active");
                headerNav.classList.remove("_active");

                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                });
                e.preventDefault();
            }
        }
    }

    // Animate items 
    const animItems = document.querySelectorAll('._anim-items');
    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);
        function animOnScroll() {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 4;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('_active');
                }
            }
        }

        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }
        setTimeout(() => {
            animOnScroll();
        }, 300);
    }

    // Popups
    const popupLinks = document.querySelectorAll(".popup-link");
    const body = document.querySelector("body");
    const lockPadding = document.querySelectorAll(".lock-padding");

    let unlock = true;

    const timeout = 800;

    if (popupLinks.length > 0) {
        for (let index = 0; index < popupLinks.length; index++) {
            const popupLink = popupLinks[index];
            popupLink.addEventListener("click", (event) => {
                const popupName = popupLink.getAttribute('href').replace('#', '');
                const curentPopup = document.getElementById(popupName);
                popupOpen(curentPopup);
                event.preventDefault();
            });
        }
    }

    const popupCloseIcon = document.querySelectorAll(".close-popup");
    if (popupCloseIcon.length > 0) {
        for (let index = 0; index < popupCloseIcon.length; index++) {
            const el = popupCloseIcon[index];
            el.addEventListener("click", (event) => {
                popupClose(el.closest('.popup'));
                event.preventDefault();
            });
        }
    }

    function popupOpen(curentPopup) {
        if (curentPopup && unlock) {
            const popupActive = document.querySelector(".popup.open");
            if (popupActive) {
                popupClose(popupActive, false);
            } else {
                bodyLock();
            }
            curentPopup.classList.add('open');
            curentPopup.addEventListener("click", (event) => {
                if (!event.target.closest('.popup__content')) {
                    popupClose(event.target.closest('.popup'));
                }
            });
        }
    }

    function popupClose(popupActive, doUnlock = true) {
        if (unlock) {
            popupActive.classList.remove("open");
            if (doUnlock) {
                bodyUnlock();
            }
        }
    }

    function bodyLock() {
        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = lockPaddingValue;
            }
        }

        body.style.paddingRight = lockPaddingValue;
        body.classList.add('_lock');

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

    function bodyUnlock() {
        setTimeout(function () {
            if (lockPadding.length > 0) {
                for (let index = 0; index < lockPadding.length; index++) {
                    const el = lockPadding[index];
                    el.style.paddingRight = '0px';
                }
            }

            body.style.paddingRight = '0px';
            body.classList.remove("_lock");
        }, timeout);

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

    // Event catcher 
    document.addEventListener('keydown', function (event) {
        if (event.which === 27) {
            const popupActive = document.querySelector(".popup.open");
            popupClose(popupActive);
        }
    });

    document.addEventListener('click', documentActions);

    function documentActions(event) {
        const targetElement = event.target;
        if (targetElement.classList.contains('slider__button-right') || targetElement.classList.contains('slider__button-left')) {
            slider(targetElement);
        }
    }

    if (document.querySelector('.slider')) {
        getWidth();
    }
}