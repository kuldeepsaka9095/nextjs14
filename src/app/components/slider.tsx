"use client";
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ImageSlider() {
    const settings = {
        dots: true,
    };
    return (
        <div className="image-slider-container">
            <Slider {...settings}>
                <div>
                    <img src="https://soliloquywp.com/wp-content/uploads/2013/05/action-backlit-beach-1046896-1200x450_c.jpg" />
                </div>
                <div>
                    <img src="https://soliloquywp.com/wp-content/uploads/2013/05/artistic-backlit-creative-532285-1200x450_c.jpg" />
                </div>
                <div>
                    <img src="https://soliloquywp.com/wp-content/uploads/2013/05/adult-backlit-child-356188-1200x450_c.jpg" />
                </div>

            </Slider>
        </div>
    );
}
