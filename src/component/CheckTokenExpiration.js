import React from 'react';
import { useDispatch } from 'react-redux';
import { authUser } from '../redux/modules/auth';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const CheckTokenExpiration = () => {
  // const dispatch = useDispatch();
  const token = Cookies.get('token');
  if (token) {
    const userToken = jwtDecode(token);
    const expirationTime = new Date(userToken.exp * 1000);
    const currentTime = new Date().getTime();
    if (currentTime < expirationTime) {
      return true; //토큰 만료되지 않을경우
    }
  }
  return false; //토큰이 만료되었거나 없을경우
};

export default CheckTokenExpiration;
