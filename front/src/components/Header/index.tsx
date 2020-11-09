import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './styles.css';

const GET_AUTHORIZATION_URL = gql`
  query getAuthorizationURL {
    getAuthorizationURL{
      url
    }
  }
`;

interface IHeader {
  userName?: string;
}

function Header({ userName }: IHeader) {
  const { data } = useQuery(GET_AUTHORIZATION_URL)

  const handleAuthorization = () => {
    window.location.href = data.getAuthorizationURL.url
  }

  const logout = () => {
    localStorage.clear()
    window.location.href = window.location.protocol + '//' + window.location.host + window.location.pathname
  }

  return (
    <header>
      <h1>Public Repo List</h1>
      { 
        !userName ? 
          <button className="login-out-btn" onClick={handleAuthorization}>SignIn</button> : 
          <div>
            <div className="logged-user">{userName}</div> 
            <button className="login-out-btn" onClick={logout}>SignOut</button>
          </div>
      }      
    </header>
  );
}

export default Header;
