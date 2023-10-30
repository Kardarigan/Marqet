// ------------------[were is user]--------------------
navigator.geolocation.getCurrentPosition(showPos, showErr);
function showPos(position) {
  const currentPosition =
    "x => " + position.coords.latitude + "y => " + position.coords.longitude;
  console.log(currentPosition);
}
function showErr(error) {
  console.error("GeolocationPositionError: ", error.code, "-", error.message);
}
// ------------------[class config]--------------------
$(".list-hover-underline li a").addClass("lhu-link");
// ----------------[warecard builder]------------------
$.getJSON("/data/waresInfo.json", function (data) {
  let allArticlesCount = 0;
  var counts = {};

  $.each(data, function (index, item) {
    var theCategory = item.category;

    if (counts[theCategory]) {
      counts[theCategory]++;
    } else {
      counts[theCategory] = 1;
    }
    const article = $("<article>", { class: "col-md-3 p-2 col-6" }).append(
      $("<div>", { class: "card warecard" }).append(
        $("<div>", { class: "card warecard-container" }).append(
          $("<a>", {
            class: "warecard-banner overflow-hidden",
            href: item.href,
          }).append(
            item.hoverPath
              ? $("<div>").append(
                  $("<img>", {
                    class:
                      "card-img-top warecard-banner-img-hover position-absolute",
                    src: item.hoverPath,
                    alt: item.imgAlt,
                  }),
                  $("<img>", {
                    class: "card-img-top warecard-banner-img",
                    src: item.imgPath,
                    alt: item.imgAlt,
                  })
                )
              : $("<img>", {
                class: "card-img-top warecard-banner-img-static",
                src: item.imgPath,
                alt: item.imgAlt,
              })
          ),

          $("<div>", {
            class:
              "position-absolute warecard-banner-panel p-2 m-2 bg-white shadow-sm",
          }).append(
            $("<ul>").append(
              $("<li>", { class: "p-2 text-size-x" }).append(
                $("<a>", { href: "#" }).append(
                  $("<i>", { class: "fa-solid fa-shuffle" })
                )
              ),
              $("<li>", { class: "p-2 text-size-x" }).append(
                $("<a>", { href: "#" }).append(
                  $("<i>", { class: "fa-solid fa-magnifying-glass" })
                )
              ),
              $("<li>", { class: "p-2 text-size-x" }).append(
                $("<a>", { href: "#" }).append(
                  $("<i>", { class: "fa-regular fa-heart" })
                )
              )
            )
          ),
          $("<div>", {
            class:
              "position-absolute warecard-banner-event m-2 flex-column text-light",
          }).append(
            item.discount &&
              $("<h5>", {
                class: "p-1 m-1 bg-primary text-light",
              }).text("%" + item.discount),
            item.hot &&
              $("<h5>", {
                class: "p-1 m-1 bg-primary text-light",
              }).text("Hot")
          )
        ),

        $("<div>", { class: "card-body py-1 px-3" }).append(
          $("<a>", { class: "card-title pt-5", href: "#" }).text(item.title),
          $("<a>", { class: "text-muted d-block pt-1", href: "#" }).text(
            item.category.charAt(0).toUpperCase() + item.category.slice(1)
          ),

          $("<ul>", { class: "card-text py-1 warecard-size-list" }).append(
            (function () {
              if (item.sizes) {
                const sizeItems = [];
                $.each(item.sizes, function (index, size) {
                  sizeItems.push(
                    $("<li>", { class: "d-inline text-size-m" }).append(
                      $("<button>", {
                        class: "me-2 reset-button warecard-size-btn p-1",
                        href: "#",
                      }).text(size)
                    )
                  );
                });
                return sizeItems;
              } else if (item.colors) {
                const colorItem = [];
                $.each(item.colors, function (index, color) {
                  colorItem.push(
                    $("<li>", { class: "d-inline text-size-m" }).append(
                      $("<button>", {
                        class: `me-2 reset-button rounded-circle p-1 hoverTitle werecard-color-${color}`,
                        "data-titel":
                          color.charAt(0).toUpperCase() + color.slice(1),
                      })
                    )
                  );
                });
                return colorItem;
              } else {
                return;
              }
            })()
          ),
          $("<div>", { class: "warecard-price" }).append(
            $("<strong>", { class: "d-block" }).text(`$${item.price}`),
            $("<a>", { class: "lhu-link my-1", href: "#" }).text(
              "SELECT OPTION"
            )
          )
        )
      )
    );
    if (item.category == "furniture") {
      $(".warecards-furniture").append(article);
    } else if (item.category == "fashion") {
      $(".warecards-fashion").append(article);
    } else if (item.category == "toys") {
      $(".warecards-toys").append(article);
    } else if (item.category == "cars") {
      $(".warecards-cars").append(article);
    } else if (item.category == "cooking") {
      $(".warecards-cooking").append(article);
    } else if (item.category == "accessories") {
      $(".warecards-accessories").append(article);
    } else if (item.category == "clocks") {
      $(".warecards-clocks").append(article);
    } else if (item.category == "lighting") {
      $(".warecards-lighting").append(article);
    } else if (item.category == "minimalism") {
      $(".warecards-minimalism").append(article);
    } else {
      $(".warecards").append(article);
    }
    console.log("Category: " + item.category);
    allArticlesCount++;
  });
  console.log(counts);

  $.each(counts, function (category, count) {
    var categoryCountElement = $(`[data-categoryCount="${category}"]`);
    if (categoryCountElement.length > 0) {
      categoryCountElement.text(count);
    }
  });

  for (let i = 0; i <= 25; i++) {
    if (allArticlesCount > i) {
      $(`.warecards-${i} article:gt(${i - 1})`).hide();
    }
  }
});
// --------------------[magnifier]---------------------
const showWrp = document.querySelector(".album-show-wrapper");
const showImg = document.querySelector(".album-show");
const thumbWrp = document.querySelector(".album-thumbnail-wrapper");

$(showWrp).mouseleave(function () {
  howImg.style.transform = "scale(1)";
  showImg.style.top = "0";
  showImg.style.left = "0";
});

$(showWrp).mousemove(function (e) {
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

Array.from(thumbWrp.children).forEach((productElm, list) => {
  productElm.addEventListener("click", function () {
    const newSrc = productElm.querySelector("img").src;
    showImg.src = newSrc;

    list.forEach((prod) => prod.classList.remove("active"));
    productElm.classList.add("active");
  });
});

function changeHeight() {
  showWrp.style.height = showWrp.clientWidth + "px";
}
changeHeight();

window.addEventListener("resize", changeHeight);
// --------------------[size btn]---------------------
const sizeBtns = $(".size-btn");
const clearButton = $(".size-btn-clear");
clearButton.hide();

clearButton.on("click", function () {
  sizeBtns.removeClass("active");
  clearButton.hide();
});

sizeBtns.on("click", function () {
  sizeBtns.removeClass("active");
  $(this).addClass("active");

  const anySizeBtns = sizeBtns.hasClass("active");

  if (anySizeBtns) {
    clearButton.show();
  } else {
    clearButton.hide();
  }
});
// ------------------[stuffnumber]--------------------
let stuffQuantity = 0;

$(".stuffNumber-number p").html(stuffQuantity);

$(".stuffNumber-decrease-btn").click(function (e) {
  stuffQuantity -= 1;
  if (stuffQuantity <= 0) {
    $(".stuffNumber-number p").html(0);
  } else {
    $(".stuffNumber-number p").html(stuffQuantity);
  }
});

$(".stuffNumber-increase-btn").click(function (e) {
  if (stuffQuantity <= 0) {
    stuffQuantity = 0;
  } else {
    stuffQuantity = stuffQuantity;
  }
  stuffQuantity += 1;
  $(".stuffNumber-number p").html(stuffQuantity);
});
// -------------------[navbartab]---------------------
$(".navBar-item").hover(
  function () {
    var navTabId = $(this).data("navTab");
    $("#navWin" + navTabId).fadeIn();
  },
  function () {
    var navTabId = $(this).data("navTab");
    $("#navWin" + navTabId).fadeOut();
  }
);
$(".navBar-shop li").hover(
  function () {
    $(this).addClass("active");
  },
  function () {
    $(this).addClass("active");
  }
);
// -----------------[overviewShow]--------------------
alert("dsfd");
$(".overview-show-btn").on("click", function (event) {
  event.preventDefault();
  $(this).addClass("active");
  $(".overview-show-btn:not(.active)").removeClass("active");
});
