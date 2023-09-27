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
// --------------------[Magnifier]---------------------
const showWrapper = document.querySelector(".album-show-wrapper");
const showImage = document.querySelector(".album-show-wrappe img");
const thumbWrapper = document.querySelector(".album-thumbnail-wrapper");

const ZOOM = 300;

showWrapper.addEventListener("mouseenter", function () {
    showImage.style.width = ZOOM + "%";
});

showWrapper.addEventListener("mouseleave", function () {
    showImage.style.width = "100%";
    showImage.style.top = "0";
    showImage.style.left = "0";
});

showWrapper.addEventListener("mousemove", function (mouseEvent) {
    let obj = thumbWrapper;
    let obj_left = 0;
    let obj_top = 0;
    let xpos;
    let ypos;
    while (obj.offsetParent) {
        obj_left += obj.offsetParent;
        obj_top += obj.offsetParent;
        obj = obj.offsetParent;
    }
    if (mouseEvent) {
        xpos = mouseEvent.pageX;
        ypos = mouseEvent.pageY;
    } else {
        xpos = window.event.x + document.body.scrollLeft - 2;
        ypos = window.event.y + document.body.scrollTop - 2;
    }

    ypos -= obj_left;
    ypos -= obj_top;

    const imgWidth = showImage.clientWidth;
    const imgHeight = showImage.clientHeight;

    showImage.style.top = -(((imgHeight - this.clientHeight) * ypos) / this.clientHeight) + "px";
    showImage.style.left = -(((imgHeight - this.clientWidth) * xpos) / this.clientWidth) + "px";
});

Array.from(thumbWrapper.children).forEach((thumbImage, i, list) => {
    thumbImage.addEventListener("click", function () {
        const newSrc = thumbImage.querySelector("img").src;
        showImage.src = newSrc;

        list.forEach(prod => prod.classList.remove("active"));
        thumbImage.classList.add("active");
    });
});

function changeHeight() {
    showImage.style.height = showWrapper.clientWidth + "px";
}
changeHeight();

window.addEventListener("resize", changeHeight)