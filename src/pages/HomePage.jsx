import React from 'react';
import AboutSection from '../components/about';
import ProductSection from '../components/HomeProducts';
import Hero from '../components/Hero';

const HeaderAndHero = () => {
  return (
    <>
    <Hero/>
    <AboutSection/>
    <ProductSection/>
    </>
  );
};

export default HeaderAndHero;