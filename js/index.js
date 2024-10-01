let screen = document.querySelector('.screen');
let stripe = document.querySelector('.stripe');
let tile = document.querySelector('.tile');

// elements necessary to determine the slider behavior
let fullWidth = stripe.offsetWidth;
let screenWidth = screen.offsetWidth;
let tileWidth = tile.offsetWidth;
let scrollWidth = tileWidth;

// determining the maximum number of scrolls before returning to the beginning of the stripe
let currentItem = 0;
let stripeWidth = stripe.offsetWidth;
let tilesNumber = Math.round(stripeWidth / tileWidth);
let maxScrollItem = tilesNumber - Math.round(screenWidth / tileWidth) + 1;

// next and previous behavior
function next() {
  currentItem++;
  currentItem > maxScrollItem ? currentItem = 0 : '';
  screen.scrollTo({ top: 0, left: scrollWidth * currentItem, behavior: 'smooth' });
}

function previous() {
  currentItem--;
  screen.scrollTo({ top: 0, left: scrollWidth * currentItem, behavior: 'smooth' });
}

// autoplayer behavior
let interval = 0;
function autoplay() {
  interval = setInterval(next, 1000);
}

function stop() {
  clearInterval(interval);
}
