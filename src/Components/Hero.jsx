import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className='hero'>
        <img className='heroImage' src='https://www.teahub.io/photos/full/7-74859_wallpaper-moraine-lake-lake-louise-banff-national-moraine.jpg' alt='Image'></img>
        <img className='heroImageBottom' src='https://www.wallpapertip.com/wmimgs/43-436636_bora-bora-beach-hd-wallpaper-4k-bora-bora.jpg' alt='Img'></img>
        <div className='blackbox'></div>
        <div className='heroTextContainer'>
            <h1 className='heroTitle'>A GREAT ADVENTURE IS WAITING FOR YOU</h1>
            <h1 className='wwb'> World Wide Booking</h1>
        </div>
        
    </div>
  )
}

export default Hero
