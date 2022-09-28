import './css/styles.css';
import Notiflix from 'notiflix';
import CartApiService from './img-api';
import LoadBtn from './load-btn';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};
const loadBtn = new LoadBtn({
  selector: '.load-more',
  hidden: true,
});
const cartApiService = new CartApiService();
// console.log(loadBtn);
const simpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: '250',
  scrollZoomFactor: 0.2,
  navText: ['⇚', '⇛'],
  closeText: '&#10008',
  nav: true,
  close: true,
  caption: true,
  captionPosition: 'bottom',
});

refs.form.addEventListener('submit', onSearch); //*********** */

loadBtn.refs.button.addEventListener('click', onLoadMore); //*********** */

function onSearch(e) {
  e.preventDefault();
  cartApiService.query = e.currentTarget.elements.searchQuery.value;
  cartApiService.resetPage();

  refs.gallery.innerHTML = '';
  if (cartApiService.query === '') {
    loadBtn.hide();
    return Notiflix.Notify.warning('Please, print something.');
  }

  cartApiService.cartFetch().then(hits => {
    // console.log(hits);

    if (hits.length === 0) {
      return Notiflix.Notify.failure(
        'Ooooops. Something wrong. We can`t find this. Try again, please.'
      );
      //   loadBtn.hide();
    }
    loadBtn.show();
    loadBtn.disable();
    appendCardsMarkup(hits);

    Notiflix.Notify.success(
      `Hooooray! We found ${cartApiService.totalHits} perfect images for you.`
    );
    loadBtn.enable();
  });
}
function onLoadMore() {
  loadBtn.disable();
  cartApiService.cartFetch().then(hits => {
    if (hits.length === 0) {
      loadBtn.hide();
      return Notiflix.Notify.info(
        'We`re sorry, but you`ve reached the end of search results.'
      );
    }
    appendCardsMarkup(hits);

    loadBtn.enable();
  });
}
function appendCardsMarkup(hits) {
  const galleryMarkup = hits.map(hit => {
    return `<div class="photo-card">
    <a href="${hit.largeImageURL}">

  <img class="img" src="${hit.webformatURL}"  loading="lazy" alt="${hit.tags}"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${hit.likes}
    </p>
    <p class="info-item">
      <b>Views</b>${hit.views}
    </p>
    <p class="info-item">
      <b>Comments</b>${hit.comments}
    </p>
    <p class="info-item">
<b>Downloads</b>${hit.downloads}
    </p>
  </div></div>`;
  });
  galleryMarkup.forEach(markup => {
    refs.gallery.insertAdjacentHTML('beforeend', markup);
  });
  simpleLightbox.refresh();
}
