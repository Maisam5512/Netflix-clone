import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import Cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';

const TitleCards = ({title, category}) => {

  const cardsRef = useRef();
  const [apiData , setApiData] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWNiNDYyOGUwMjczMmViM2Y1ZTBlMDk5MzRhNTAwZiIsIm5iZiI6MTczMDcyMDg2MS4yNDY4MDczLCJzdWIiOiI2NzI4YjFkZjMxZDNhNDBjZmRlYWQ2MjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.71tsv9ZATW4rPx6kAImrcvL-mxIJOdvfxHbTBf94qlE'
    }
  };
  


const handleWheel = (event) =>{
 event.preventDefault();
 cardsRef.current.scrollLeft += event.deltaY;
}
useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category ? category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel', handleWheel);
}, [])

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link  to={`/Player/${card.id}`} className="card" key={index}>
            <img src={'https://image.tmdb.org/t/p/w500'+card.backdrop_path} alt="" />
             <p>{card.original_title}</p>
          </Link>

        })}
      </div>
    </div>
  )
}

export default TitleCards
