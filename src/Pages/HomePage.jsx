import React from 'react';
import Hero from '../Components/Hero';
import './HomePage.css';
import Slider from '../Components/Slider';
import SignUp from '../Components/SingUp';

export default function HomePage() {
  return (
    <section className='homePage'>
        <Hero />
        <Slider imgSrc ={'https://wallpapercave.com/wp/4xZdAJ6.jpg'} title ={'Explore the world with us!'} text = {'Paris - France'}/>
        <Slider imgSrc ={'https://wallpaperaccess.com/full/232806.jpg'} flipped={true} title ={'The trip you always wanted.'} text = {'New York - EEUU'} />
        <Slider imgSrc ={'https://pbs.twimg.com/media/CZU7YDIWkAITbkE.jpg'} title ={'Just a few clicks away.'} text = {'Pico Espejo - Venezuela'}/>
        <SignUp />
    </section>
  )
}


