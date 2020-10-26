import React, {useEffect, useState} from 'react';
import Tmdb from './Tmdb';
import MovieRow from './Components/MovieRow';
import './App.css';
import FeaturedMovie from './Components/FeaturedMovie';
import Header from './Components/Header';

export default () => {
  
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeraturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(true);

  useEffect(()=>{
    const loadAll = async () => {
      // pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // pegando o destaque
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].itens.results.length - 1));
      let chosen = originals[0].itens.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeraturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () => {
      {window.scrollY > 80 ? setBlackHeader(true) : setBlackHeader(false)};
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }

  }, []);

  return(
    <div className="page">
      
      <Header black={blackHeader}/>

      {featuredData && <FeaturedMovie item={featuredData}/>}
      
      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} itens={item.itens}/>
        ))}
      </section>

      <footer>
          <a>Feito seguindo o </a>
          <a className="footer--link" href="https://youtu.be/tBweoUiMsDg">tutorial</a>
          <a> de Bonieky Lacerda: </a>
      </footer>
    </div>
  );
}