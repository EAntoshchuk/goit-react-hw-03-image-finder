import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ src, largeImageURL, onClick }) {
  return (
    <li
      className={css.imageGalleryItem}
      onClick={() => onClick({ largeImageURL })}
    >
      <img className={css.imageGalleryItem_image} src={src} alt="image" />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
