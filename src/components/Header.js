import { useEffect, useState, useContext } from 'react';
import { CDN_LOGO } from '../utils/constants';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';
import { useSelector } from 'react-redux';

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState('Login');
  // console.log('Header reader');
  useEffect(() => {
    // console.log('usEffect called');
  }, [btnNameReact]);
  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);
  console.log(loggedInUser);

  // Subscribing to the store using a Selector
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className='flex justify-between bg-pink-100 shadow-lg sm:bg-yellow-50 lg:bg-green-50'>
      <div className='=logo-container'>
        <img className='w-28' src={CDN_LOGO} alt='' />
      </div>
      <div className='flex items-center'>
        <ul className='flex'>
          <li className='px-4'>Online Status:{onlineStatus ? '✅' : '🔴'}</li>
          <li className='px-4'>
            <Link to='/'>Home</Link>
          </li>
          <li className='px-4'>
            <Link to='/about'>About Us</Link>
          </li>
          <li className='px-4'>
            <Link to='/contact'>Contact Us</Link>
          </li>
          <li className='px-4'>
            <Link to='/grocery'>Grocery</Link>
          </li>
          <li className='px-4 font-bold'>
            <Link to='/cart'>Cart - ({cartItems.length} items)</Link>
          </li>
          <button
            className='login'
            onClick={() => {
              btnNameReact === 'Login'
                ? setBtnNameReact('Logout')
                : setBtnNameReact('Login');
            }}
          >
            {btnNameReact}
          </button>
          <li className='px-4'>{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
