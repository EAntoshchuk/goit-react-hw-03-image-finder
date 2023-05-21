export default function fetchImages(nextRequest) {
  return fetch(
    'https://pixabay.com/api/?q=${nextRequest}}&page=1&key=35004383-5cd2ee797d433f0b9be31b1f4&image_type=photo&orientation=horizontal&per_page=12'
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error('There is no images with ${nextRequest}'));
  });
}
