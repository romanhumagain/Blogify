import React from 'react';
import Carousel from './Carousel';

const ImageCarousel = ({ images }) => {
  return (
    <div className="h-72">
      <Carousel autoSlide={false} autoSlideInterval={3000}>
        {images.map((image) => (
          <img
            key={image.id}
            src={image.image}
            alt={image.caption || `Slide`}
            className="h-full w-full object-cover"
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
