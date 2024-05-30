import { useEffect, useState } from 'react';
import Shimmer from './Shimmer';
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';

const RestaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(null);
  const { resId } = useParams();

  const restInfo = useRestaurantMenu(resId);

  if (restInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    restInfo?.cards[2]?.card?.card?.info;

  // const { itemCards } =  restInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card  ?.categories[0];
  // console.log(restInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
  const category =
    restInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card.card?.['@type'] ===
        'type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory'
    );
  // console.log(category);
  return (
    <div className='text-center'>
      <h1 className='font-bold my-5 text-2xl'>{name}</h1>
      <p className='font-bold text-lg'>
        {cuisines.join(', ')} - {costForTwoMessage}
      </p>
      {category.map((cat, ind) => (
        // Controlled Component
        <RestaurantCategory
          key={cat?.card?.card.title}
          data={cat?.card?.card}
          showItems={ind === showIndex ? true : false}
          setShowIndex={() => setShowIndex(ind)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;

{
  /* <h2>Menu</h2>
      <ul>
        {itemCards.map((item) => {
          return (
            <li key={item.card.info.id}>
              {item?.card?.info?.name} -{'Rs.'}
              {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
            </li>
          );
        })}
      </ul> */
}
