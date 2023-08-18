import React, { useState, useEffect } from 'react';
import Style from '../style/weather.module.css';
import Pagination from './Pagination';
import { Paginate } from './Paginate';

function Favourite() {
  const [count] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  // get favourites from local storage
  const favouritesData = JSON.parse(localStorage.getItem('favourites')) || [];

  const favoriteCount = favouritesData.length;

  // set favourites to state
  const [favourites, setFavourites] = useState(favouritesData);

  // remove from favourites
  const removeFromFavourites = (favouriteId) => {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const filteredFavourites = favourites.filter(
      (item) => item.id !== favouriteId,
    );
    localStorage.setItem('favourites', JSON.stringify(filteredFavourites));
    setFavourites(filteredFavourites);
    // window.location.reload();
  };

  const handleChange = (page) => {
    setCurrentPage(page);
  };

  const FavoritesDatas = Paginate(favourites, currentPage, count);

  return (
    <div className={Style.favouriteContainer}>
      <h1 className={Style.favouriteTitle}>Favorites</h1>
      <ol className={Style.listContainer}>
        {FavoritesDatas ? FavoritesDatas.map((favourite) => (
          <div key={favourite?.id} className={Style.favouriteLists}>
            <div>
              <li className={Style.favouriteList}>
                <h2>{favourite?.cityData?.city}</h2>
                <p>Country: {favourite?.cityData?.country}</p>
              </li>
            </div>
            <div>
              <button
                className={Style.removeButton}
                onClick={() => removeFromFavourites(favourite?.id)}
              >
                remove
              </button>
            </div>
          </div>
        )) : (<p>You have not added any favorites</p>)}
      </ol>
      <Pagination
        itemsCount={favoriteCount}
        pageSize={count}
        currentPage={currentPage}
        onPageChange={handleChange}
        className={Style.pagination}
      />
    </div>
  );
}

export default Favourite;
