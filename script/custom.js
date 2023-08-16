$(".myqmars").slick({
    dots: true,
    centerMode: true
});

$(".multiple-items").slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
    ]
});
// ----------------[warecard builder]------------------
$.getJSON("../data/waresInfo.json", function (data) {
    $.each(data, function (index, item) {
        const article = $("<article>", { class: "col-md-3 p-2 col-6" }).append(
            $("<div>", { class: "card warecard" }).append(
                $("<div>", { class: "warecard-banner" }).append(
                    $("<img>", {
                        class: "card-img-top warecard-banner-img",
                        src: item.imgPath,
                        alt: item.imgAlt
                    })
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
// ----------------[warecard changer]------------------
