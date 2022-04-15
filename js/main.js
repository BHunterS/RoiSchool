"use strict";

window.onload = function () {

    // Preloader
    document.body.classList.add("_lock");
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

    /* Animate items */

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

    /* Event catcher */
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