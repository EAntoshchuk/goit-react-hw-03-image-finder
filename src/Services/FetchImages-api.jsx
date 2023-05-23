const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35004383-5cd2ee797d433f0b9be31b1f4';

export default function fetchImages(request) {
  return fetch(
    `${BASE_URL}?q=${request}&page=1&key${API_KEY}=&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error('There is no images with ${request}'));
  });
}
