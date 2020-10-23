import React from 'react';
import './MovieRow.css';

export default ({title, itens}) => {
    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--listArea">
                <div className="movieRow--list">
                    {itens.results.length > 0 && itens.results.map((item, key)=>(
                        <div className="movieRow--item">
                            <img key={key} src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.origina_title} />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )

}