document.addEventListener('DOMContentLoaded', function() {
  let btnPrevs = document.querySelectorAll('.carousel .previous');

  btnPrevs.forEach(prev => {
    const screen = prev?.nextElementSibling;
    const btnNext = screen.nextElementSibling
    const stripe = screen.querySelector('.stripe')
    if (!screen) return; 
    const countShow = Number(screen?.getAttribute('show') || 1);
    const tiles = screen.querySelectorAll('.tile');
    if (tiles) {
      tiles.forEach(tile=>{
        tile.style.width = `calc(100% / ${countShow})`; 
      })
    }
    // Xử lý click
let currentItem = 0;
let tileWidth = screen.offsetWidth / countShow;
let maxScrollItem = tiles.length - countShow;
  
    prev.addEventListener('click', (e) => {
      currentItem++;
      if (currentItem > maxScrollItem) currentItem = 0;
      stripe.style.transform = `translateX(-${tileWidth * currentItem}px)`;
    });
    btnNext.addEventListener('click', (e) => {
      currentItem--;
  if (currentItem < 0) currentItem = maxScrollItem; 
  stripe.style.transform = `translateX(-${tileWidth * currentItem}px)`;
    });
  });

});


