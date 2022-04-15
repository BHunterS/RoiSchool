"use strict";

let flag = 1;

function slider(targetElement) {

    const targetButtons = targetElement.parentNode;
    const targetButtonRight = targetButtons.querySelector('.slider__button-right');
    const targetButtonLeft = targetButtons.querySelector('.slider__button-left');
    const targetTrack = targetButtons.parentNode;
    const targetItems = targetTrack.querySelector('.slider__items');
    let position = Number(targetItems.dataset.translate);
    const targetItem = targetItems.querySelector('.slider__item');
    const targetItemWidth = targetItem.clientWidth;
    const targetItemsCount = targetItems.querySelectorAll('.slider__item');
    const targetItemsLength = targetItemsCount.length;
    const movePosition = targetItemWidth + 30;

    const setPosition = () => {
        targetItems.style.transform = `translateX(${position}px)`;
        document.querySelector(".slider__purple-line").style.transform = `translateX(${-position / movePosition * (50 * (flag + 1))}%)`;
    };

    const checkBtns = () => {
        targetButtonRight.disabled = position <= -(targetItemsLength - 1 - flag) * targetItemWidth;
        targetButtonLeft.disabled = position >= 0;
    };

    if (targetElement.classList.contains('slider__button-right')) {
        position -= movePosition;
        targetItems.dataset.translate = position;

        checkBtns();
        setPosition();
    }

    if (targetElement.classList.contains('slider__button-left')) {
        position += movePosition;
        targetItems.dataset.translate = position;

        checkBtns();
        setPosition();
    }

    checkBtns();
}

function getWidth() {
    const sliderItemsCount = document.querySelectorAll('.slider__item');
    sliderItemsCount.forEach((item) => {
        const sliderTrack = item.parentNode.parentNode.clientWidth;
        if (document.body.clientWidth < 991) {
            flag = 0;
        }

        if (flag == 1) {
            item.style.minWidth = `${sliderTrack / 2 - 30}px`;
        } else if (flag == 0) {
            item.style.minWidth = `${sliderTrack - 30}px`;
        }

    });
}

function sliderReset(sliderItems, sliderButtonsLeft, sliderButtonsRight) {
    sliderButtonsLeft.forEach((item) => {
        item.disabled = true;
    });

    sliderButtonsRight.forEach((item) => {
        item.disabled = false;
    });

    sliderItems.forEach((item) => {
        item.style.transform = 'none';
        item.dataset.translate = 0;
    });

    document.querySelector(".slider__purple-line").style.transform = `translateX(0px)`;
}

window.addEventListener('resize', () => {
    const sliderItems = document.querySelectorAll('.slider__items');
    const sliderButtonsLeft = document.querySelectorAll('.slider__button-left');
    const sliderButtonsRight = document.querySelectorAll('.slider__button-right');

    if (document.body.clientWidth < 991) {
        flag = 0;
    } else {
        flag = 1;
    }

    sliderReset(sliderItems, sliderButtonsLeft, sliderButtonsRight);

    getWidth();
});