import * as cl from '../common/bookClass';
const svgRepo = {
  loadingSvg: require('../../assets/loading-svgrepo-com.svg'),
  arrowLeft: require('../../assets/MainHead/previous-svgrepo-com.svg'),
  arrowRight: require('../../assets/MainHead/next-svgrepo-com.svg')
}

// Makes html containers for each book and adds gliderJs html classes 
export function makeBookShelf(parent) {
  const container = document.querySelector(parent);

  const track = document.createElement("div");
  track.className = "glide__track";
  track.setAttribute("data-glide-el", "track");

  const ul = document.createElement("ul");
  ul.className = "glide__slides";

  // For each glide slide create 10 
  for (let i = 0; i < 10; i++) {
    const li = document.createElement("li");
    li.className = "glide__slide";
    li.id = `book${i}`;

    const img = document.createElement("img");
    li.appendChild(img);

    ul.appendChild(li);
  }

  track.appendChild(ul);

  const arrows = document.createElement("div");
  arrows.className = "glide__arrows";
  arrows.setAttribute("data-glide-el", "controls");

  const leftBtn = document.createElement("button");
  const leftBtnImg = document.createElement('img');
  leftBtn.appendChild(leftBtnImg);
  leftBtn.className = "glide__arrow glide__arrow--left";
  leftBtn.setAttribute("data-glide-dir", "<");
  leftBtnImg.src = svgRepo.arrowLeft;

  const rightBtn = document.createElement("button");
  const rightBtnImg = document.createElement('img');
  rightBtn.appendChild(rightBtnImg);
  rightBtn.className = "glide__arrow glide__arrow--right";
  rightBtn.setAttribute("data-glide-dir", ">");
  rightBtnImg.src = svgRepo.arrowRight;

  arrows.appendChild(leftBtn);
  arrows.appendChild(rightBtn);

  container.appendChild(arrows);
  container.appendChild(track);
}

// Gets cover from open lib database and displays it to screen
async function displayCovers(glideIdx, books) {
  displayRotationSvg(glideIdx);
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const slide = document.querySelector(
      `.glide${glideIdx} .glide__track .glide__slides #book${i} img`
    );
    const data = await getBookData(book.title, book.author);
    slide.classList.add('book-cover');
    slide.classList.remove('rotate');
    if (!data) return null;

    slide.setAttribute('data-key', data.key);
    slide.setAttribute('src', data.cover);
    slide.setAttribute('alt', book.title);
    slide.setAttribute('tabindex', '0');
  }
}

// While async function gets cover show rotating svg
function displayRotationSvg(glideIdx) {
  document
    .querySelectorAll(
      `.glide${glideIdx} .glide__track .glide__slides .glide__slide img`
    )
    .forEach((cover) => {
      cover.setAttribute('src', svgRepo.loadingSvg);
      cover.classList.add('rotate');
    });
}

// Renders book shelf with position for 10 books
const minContainerIdx = 2;
const maxContainerIdx = 7;
for (let i = minContainerIdx; i < maxContainerIdx; i++) {
  makeBookShelf(`.glide${i}`)
}

async function getBookData(title, author) {
  try {
    const book = new cl.Book(title, author);
    const data = await book.getBookData();
    return data;
  }
  catch(err) {
    return null;
  }
}

displayCovers(2, cl.bookLibrary.trendingBooks);
displayCovers(3, cl.bookLibrary.classicBooks);
displayCovers(4, cl.bookLibrary.educationalBooks);
displayCovers(5, cl.bookLibrary.kidBooks);
displayCovers(6, cl.bookLibrary.horrorBooks);
