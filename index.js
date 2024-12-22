const carouselContainer = document.querySelector(".carousel-container");
const carousel1 = document.querySelector(".carousel-1");
const carousel2 = document.querySelector(".carousel-2");

const carouselData = [
  {
    content: "No Hat",
    imageUrl:
      "https://www.syfy.com/sites/syfy/files/styles/hero_image__large__computer__alt/public/2021/03/rango-1200-1200-675-675-crop-000000.jpeg",
  },
  {
    content: "Cartoon Image",
    imageUrl: "https://images5.alphacoders.com/466/466601.jpg",
  },
  {
    content: "Holding Fish",
    imageUrl: "https://images6.alphacoders.com/810/810082.jpg",
  },
  {
    content: "Chicken",
    imageUrl: "https://images2.alphacoders.com/485/485329.jpg",
  },
  {
    content: "John Wick",
    imageUrl:
      "https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/04/rango-movie-image-6.jpg",
  },
];

const hoverImage = document.getElementById("hover-image");

// Function to populate carousel items
function populateCarousel(carousel, data) {
  if (!data || data.length === 0) {
    console.error("No data available to populate the carousel.");
    return;
  }

  carousel.innerHTML = ""; // Clear existing items
  data.forEach((item) => {
    const div = document.createElement("p");
    div.className = "carousel-item";
    div.textContent = item.content;

    // Add hover event to show image
    div.addEventListener("mouseover", () => {
      hoverImage.src = item.imageUrl;
      hoverImage.style.display = "block";
    });

    // Position image near the cursor
    // div.addEventListener("mousemove", (e) => {
    //   hoverImage.style.top = `${e.pageY + 10}px`;
    //   hoverImage.style.left = `${e.pageX + 10}px`;
    // });

    // Hide image on mouse out
    div.addEventListener("mouseout", () => {
      hoverImage.style.display = "none";
    });

    carousel.appendChild(div);
  });
}

// Populate both carousels
populateCarousel(carousel1, carouselData);
populateCarousel(carousel2, carouselData);

// Fetch updated items after population
let items1 = Array.from(carousel1.querySelectorAll(".carousel-item"));
let items2 = Array.from(carousel2.querySelectorAll(".carousel-item"));

// Function to recalculate dimensions and initialize positions
function recalculateDimensions() {
  const itemWidths1 = [];
  const itemWidths2 = [];

  let cumulativeWidth1 = 0;
  let cumulativeWidth2 = 0;

  // Calculate widths for each item in carousel 1
  items1.forEach((item) => {
    const width =
      item.offsetWidth +
      parseInt(getComputedStyle(item).marginLeft) +
      parseInt(getComputedStyle(item).marginRight);
    itemWidths1.push({ width, cumulativeWidth: cumulativeWidth1 });
    cumulativeWidth1 += width;
  });

  // Calculate widths for each item in carousel 2
  items2.forEach((item) => {
    const width =
      item.offsetWidth +
      parseInt(getComputedStyle(item).marginLeft) +
      parseInt(getComputedStyle(item).marginRight);
    itemWidths2.push({ width, cumulativeWidth: cumulativeWidth2 });
    cumulativeWidth2 += width;
  });

  initializePositions(items1, itemWidths1);
  initializePositions(items2, itemWidths2, true);
}

// Initialize positions with varying widths
function initializePositions(items, itemWidths, reverse = false) {
  items.forEach((item, index) => {
    const position = reverse
      ? itemWidths[itemWidths.length - 1 - index].cumulativeWidth
      : itemWidths[index].cumulativeWidth;
    item.style.transform = `translateX(${position}px)`;
  });
}

// Scroll handling for varying widths
let isScrolling = false;

carouselContainer.addEventListener("wheel", (e) => {
  if (isScrolling) return;

  isScrolling = true;
  const direction = e.deltaY > 0 ? -1 : 1;

  function moveCarousel(items, itemWidths, opposite = false) {
    const totalWidth = itemWidths.reduce((acc, w) => acc + w.width, 0);

    items.forEach((item, index) => {
      const currentTransform = parseFloat(
        item.style.transform.replace("translateX(", "").replace("px)", "")
      );

      const moveBy =
        direction *
        (opposite ? -itemWidths[index].width : itemWidths[index].width);
      let newPosition = currentTransform + moveBy;

      // Wrap the item around if it exits the viewport
      if (newPosition < -itemWidths[index].width) {
        newPosition += totalWidth;
      } else if (newPosition >= totalWidth) {
        newPosition -= totalWidth;
      }

      item.style.transform = `translateX(${newPosition}px)`;
    });
  }

  // Get updated widths for both carousels
  const itemWidths1 = items1.map((item) => ({
    width:
      item.offsetWidth +
      parseInt(getComputedStyle(item).marginLeft) +
      parseInt(getComputedStyle(item).marginRight),
  }));
  const itemWidths2 = items2.map((item) => ({
    width:
      item.offsetWidth +
      parseInt(getComputedStyle(item).marginLeft) +
      parseInt(getComputedStyle(item).marginRight),
  }));

  moveCarousel(items1, itemWidths1);
  moveCarousel(items2, itemWidths2, true);

  // Allow new scroll after animation
  requestAnimationFrame(() => {
    isScrolling = false;
  });
});

// Recalculate on resize
window.addEventListener("resize", recalculateDimensions);

// Initial calculation
recalculateDimensions();
