const sliderItems = document.querySelectorAll(".header-slider-item");
const radioInputs = document.querySelectorAll(".header-slider-radio-item");

let currentIndex = 0;
let intervalId;
let isDragging = false;
let startX = 0;

function showSlide(index) {
    sliderItems.forEach(item => {
        item.classList.remove("active");
    });

    sliderItems[index].classList.add("active");
    radioInputs[index].checked = true;
}

function rotateSlider() {
    currentIndex = (currentIndex + 1) % sliderItems.length;
    showSlide(currentIndex);
}

function startSlider() {
    showSlide(currentIndex);
    intervalId = setInterval(rotateSlider, 5000000);
    radioInputs[currentIndex].checked = true;
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

function handleMouseDown(event) {
    isDragging = true;
    startX = event.clientX;
}

function handleMouseMove(event) {
    if (!isDragging) return;
    const deltaX = event.clientX - startX;
    if (deltaX > 50) {
        activateSlider((currentIndex - 1 + sliderItems.length) % sliderItems.length);
        isDragging = false;
    } else if (deltaX < -50) {
        activateSlider((currentIndex + 1) % sliderItems.length);
        isDragging = false;
    }
}

function handleMouseUp() {
    isDragging = false;
}

sliderItems.forEach((item, index) => {
    item.addEventListener("mousedown", handleMouseDown);
    item.addEventListener("mousemove", handleMouseMove);
    item.addEventListener("mouseup", handleMouseUp);
});

radioInputs.forEach((input, index) => {
    input.addEventListener("change", function () {
        if (this.checked) {
            activateSlider(index);
        }
    });
});

startSlider();
