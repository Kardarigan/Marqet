document.addEventListener("DOMContentLoaded", function() {
    const sliderItems = document.querySelectorAll('.header-slider-item');
    const radioInputs = document.querySelectorAll('.header-slider-radio-item');
  
    radioInputs.forEach((input, index) => {
      input.addEventListener("change", function() {
        sliderItems.forEach(item => {
          $(item).css('opacity', 0);
        });
  
        if (this.checked) {
          $(sliderItems[index]).css('opacity', 1);
        }
      });
    });
  
  
  });