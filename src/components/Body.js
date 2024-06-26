import RestaurantCard, { withPromotedLabel } from './RestaurantCard';
import { useEffect, useState, useContext } from 'react';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import UserContext from '../utils/UserContext';

import useOnlineStatus from '../utils/useOnlineStatus';

const Body = () => {
  // Local State Variable -Super powerful variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState('');

  const [searchText, setSearchText] = useState('');

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9541074&lng=77.575705&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
    );
    const json = await data.json();
    console.log(json);
    setListOfRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  // console.log(listOfRestaurants);
  if (!onlineStatus)
    return (
      <h1>Looks like you're offline!! Please check your internet connection</h1>
    );

  // Use Context
  const { loggedInUser, setUserName } = useContext(UserContext);

  return !listOfRestaurants.length ? (
    <Shimmer />
  ) : (
    <div className='body'>
      <div className='flex'>
        <div className='search m-4 p4'>
          <input
            type='text'
            className='border border-solid border-black'
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className='px-4 py-2 bg-green-100 m-4 rounded-lg'
            onClick={() => {
              // Filter the restaurant cards and update the UI
              // searchText
              const filteredRestaurants = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurants);
            }}
          >
            Search
          </button>
        </div>
        <div className='search m-4 p-4 flex items-center '>
          <button
            className='px-4 py-2 bg-gray-100 rounded-lg'
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4
              );
              setListOfRestaurants(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div className='search m-4 p-4 flex items-center '>
          <label>UserName: </label>
          <input
            type='text'
            className='border border-black p-2'
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className='flex flex-wrap'>
        {filteredRestaurant.map((obj, ind) => (
          <Link key={obj.info.id} to={'restaurants/' + obj.info.id}>
            {ind & 1 ? (
              <RestaurantCardPromoted resObj={obj} />
            ) : (
              <RestaurantCard resObj={obj} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
