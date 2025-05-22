import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import HomeSearch from '../components/HomeSearch.jsx';
import Hero from '../components/Hero.jsx';
import Gitashlok from '../components/Gitashlok.jsx';
import '../assets/styles/Home.css';

const Home = ({ mode, changeMode, meta }) => {
  // Static fallback books if meta.json missing or empty
  const fallbackBooks = [
    {
      title: "The Psychology of Money",
      author: "Morgan Housel",
      imgSrc: "/assets/images/Money.jpg",
    },
    {
      title: "Object Oriented",
      author: "Matt Weisfeld",
      imgSrc: "/assets/images/OOPS.png",
    },
    {
      title: "Spring In Action",
      author: "Manning",
      imgSrc: "/assets/images/Spring.png",
    },
    {
      title: "The Pragmatic Programmer",
      author: "Person",
      imgSrc: "/assets/images/Programmer.png",
    },
    {
      title: "Refactoring",
      author: "Kent Beck",
      imgSrc: "/assets/images/Refactor.png",
    },
  ];

  const books = meta?.featuredBooks?.length ? meta.featuredBooks : fallbackBooks;

  return (
    <>
      <Navbar mode={mode} changeMode={changeMode} />
      <HomeSearch mode={mode} />

      <div className='container'>
        <hr className='home-hr' />
        <div className='div-featured'>
          <h1>{meta?.featuredTitle || "Featured Books"}</h1>
        </div>

        <div className='card-container'>
          {books.map(({ title, author, imgSrc }, index) => (
            <div className="card" key={index}>
              <div className="img-box">
                <img src={imgSrc} alt={title} loading='lazy' decoding='async' />
              </div>
              <div className="text-box">
                <h2>{title}</h2>
                <span>{author}</span>
              </div>
            </div>
          ))}
        </div>

        <Hero />
        <Gitashlok />
      </div>

      <Footer />
    </>
  );
};

export default Home;
