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

function Header() {
  const { data } = useQuery(GET_AUTHORIZATION_URL)

  const handleAuthorization = () => {
    window.location.href = data.getAuthorizationURL.url
  }


  return (
    <header>
      <h1>Public Repo List</h1>
      <button className="login-btn" onClick={handleAuthorization} >SignIn</button>
    </header>
  );
}

export default Header;
