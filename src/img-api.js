const axios = require('axios').default;
const API_KEY = '7469520-66f77b6da8d7228e261c35de2';
const BASE_URL = 'https://pixabay.com/api';
const PARAMS =
  'image_type=photo&orientation=horizontal&safesearch=true&language=en&per_page=40';

export default class CartApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = 0;
  }

  async cartFetch() {
    // console.log(this);

    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&${PARAMS}&page=${this.page}`;
    try {
      const response = await axios.get(url);

      const data = response.data;

      this.incrementPage();

      this.totalHits = data.totalHits;
      return data.hits;
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
