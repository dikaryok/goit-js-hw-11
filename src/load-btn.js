export default class LoadBtn {
  constructor({ selector, hidden = true }) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(e) {
    const refs = {};
    refs.button = document.querySelector(e);

    return refs;
  }

  enable() {
    this.refs.button.disabled = false;
    this.refs.button.textContent = 'Load more';
  }

  disable() {
    this.refs.button.disabled = true;
    this.refs.button.textContent = 'Wait...';
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}
