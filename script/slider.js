const sliderItems = document.querySelectorAll(".header-slider-item");
const radioInputs = document.querySelectorAll(".header-slider-radio-item");

let currentIndex = 0;
let intervalId;

function showSlide(index) {
    sliderItems.forEach(item => {
        $(item).css("opacity", 0);
    });

    $(sliderItems[index]).css("opacity", 1);
    radioInputs[index].checked = true;
}

function rotateSlider() {
    currentIndex = (currentIndex + 1) % sliderItems.length;
    showSlide(currentIndex);
}

function startSlider() {
    showSlide(currentIndex);
    intervalId = setInterval(rotateSlider, 5000);
}

function stopSlider() {
    clearInterval(intervalId);
}

function activateSlider(index) {
    stopSlider();
    currentIndex = index;
    showSlide(index);
    startSlider();
}

radioInputs.forEach((input, index) => {
    input.addEventListener("change", function () {
        if (this.checked) {
            activateSlider(index);
        }
    });
});

startSlider();
