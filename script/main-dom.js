var jqueryCDN = document.createElement('script');  
jqueryCDN.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js');
document.head.appendChild(jqueryCDN);


var allScripts = '<script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script><script src="script/class-configuration.js"></script><script src="script/custom.js"></script><script src="script/slider.js"></script>';


$('body').after(allScripts);