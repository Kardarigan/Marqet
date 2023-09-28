// ----------------[warecard builder]------------------
$.getJSON("../data/waresInfo.json", function (data) {
    $.each(data, function (index, item) {
        const article = $("<article>", { class: "col-md-3 p-2 col-6" }).append(
            $("<div>", { class: "card warecard" }).append(
                $("<div>", { class: "card warecard-container" }).append(
                    $("<a>", { class: "warecard-banner overflow-hidden", href: item.href }).append(
                        $("<img>", {
                            class: "card-img-top warecard-banner-img-hover position-absolute d-none",
                            src: item.hoverPath,
                            alt: item.imgAlt
                        }),
                        $("<img>", {
                            class: "card-img-top warecard-banner-img",
                            src: item.imgPath,
                            alt: item.imgAlt
                        })
                    )
                ),
                $("<div>", { class: "position-absolute warecard-img-panel p-2 m-2 bg-white shadow-sm" }).append(
                    $("<ul>").append(
                        $("<li>", { class: "p-2 text-size-x" }).append(
                            $("<a>", { href: "#" }).append($("<i>", { class: "fa-solid fa-shuffle" }))
                        ),
                        $("<li>", { class: "p-2 text-size-x" }).append(
                            $("<a>", { href: "#" }).append($("<i>", { class: "fa-solid fa-magnifying-glass" }))
                        ),
                        $("<li>", { class: "p-2 text-size-x" }).append(
                            $("<a>", { href: "#" }).append($("<i>", { class: "fa-regular fa-heart" }))
                        )
                    )
                ),
                $("<div>", { class: "card-body py-1 px-3" }).append(
                    $("<a>", { class: "card-title pt-5", href: "#" }).text(item.title),
                    $("<a>", { class: "text-muted d-block pt-1", href: "#" }).text(item.categories),

                    $("<ul>", { class: "card-text py-1" }).append(
                        (function () {
                            const sizeItems = [];
                            $.each(item.sizes, function (index, size) {
                                sizeItems.push(
                                    $("<li>", { class: "d-inline text-size-m" }).append($("<a>", { class: "me-3", href: "#" }).text(size))
                                );
                            });
                            return sizeItems;
                        })()
                    ),

                    $("<div>").append(
                        $("<strong>", { class: "d-block" }).text("$199.00"),
                        $("<a>", { class: "lhu-link my-1", href: "#" }).text("SELECT OPTION")
                    )
                )
            )
        );

        $(".warecards").append(article);
    });
});
// --------------------[magnifier]---------------------
const showWrp = document.querySelector(".album-show-wrapper");
const showImg = document.querySelector(".album-show");
const thumbWrp = document.querySelector(".album-thumbnail-wrapper");

showWrp.addEventListener("mouseleave", function () {
    showImg.style.transform = "scale(1)";
    showImg.style.top = "0";
    showImg.style.left = "0";
});

showWrp.addEventListener("mousemove", function (mouseEvent) {
    let obj = showWrp;
    let obj_left = 0;
    let obj_top = 0;
    let xpos;
    let ypos;

    while (obj.offsetParent) {
        obj_left += obj.offsetLeft;
        obj_top += obj.offsetTop;
        obj = obj.offsetParent;
    }
    if (mouseEvent) {
        xpos = mouseEvent.pageX;
        ypos = mouseEvent.pageY;
    } else {
        xpos = window.Event.x + document.body.scrollLeft - 2;
        ypos = window.Event.y + document.body.scrollTop - 2;
    }

    xpos -= obj_left;
    ypos -= obj_top;

    const originX = (xpos / this.clientWidth) * 100 + "%";
    const originY = (ypos / this.clientHeight) * 100 + "%";

    showImg.style.transformOrigin = originX + " " + originY;
    showImg.style.transform = "scale(2)";
});

Array.from(thumbWrp.children).forEach((productElm, i, list) => {
    productElm.addEventListener("click", function () {
        const newSrc = productElm.querySelector("img").src;
        showImg.src = newSrc;

        list.forEach(prod => prod.classList.remove("active"));
        productElm.classList.add("active");
    });
});

function changeHeight() {
    showWrp.style.height = showWrp.clientWidth + "px";
}
changeHeight();

window.addEventListener("resize", changeHeight);
// --------------------[size btn]---------------------
const sizeBtns = document.querySelectorAll(".size-btn");
const clearButton = document.querySelector(".size-btn-clear");
clearButton.style.display = 'none';

Array.from(sizeBtns).forEach((sizeBtn) => {
    sizeBtn.addEventListener("click", function () {
        sizeBtns.forEach(btn => btn.classList.remove("active"));
        
        this.classList.add("active");

        const anySizeBtns = Array.from(sizeBtns).some(btn => btn.classList.contains("active"));

        if (anySizeBtns) {
            $(clearButton).css("display", "inline-block");
        } else {
            $(clearButton).css("display", "none");
        }
    });
});