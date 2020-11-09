import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { useMutation, gql } from '@apollo/client';
import swal from 'sweetalert';
import Header from '../../components/Header';
import List from '../../components/List';
import './style.css'

const GET_ACCESS_TOKEN = gql`
  mutation getAccessToken($code: String!) {
    getAccessToken(input: {
      code: $code
    }) {
      accessToken
      userName
    }
  }
`;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const [owner, setOwnerName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const query = useQuery();
  const code = query.get('code');
  const debounceQuery = debounce(q => setOwnerName(q), 1000);
  const [ getAccessToken ] = useMutation(GET_ACCESS_TOKEN);

  const handleChange = (event: any) => {
    const { value } = event.target;
    debounceQuery(value);
  };

  useEffect(() => {
    if (localStorage.getItem('userName')) {
      const userName = localStorage.getItem('userName') as string
      setUserName(userName)
    }

    const requestAccessToken = () => {
      getAccessToken({
        variables: {
          code: code
        }
      })
      .then(res => {
        localStorage.setItem('accessToken', res.data.getAccessToken.accessToken)
        localStorage.setItem('userName', res.data.getAccessToken.userName)
        setUserName(res.data.getAccessToken.userName)
      })
      .catch(error => {
        swal({
          title: error.name,
          text: error.message,
          icon: 'error'
        });
      })
    }
    if (code) requestAccessToken();
  }, [getAccessToken, code])

  return (
    <div className="normal">
      <Header userName={userName}></Header>
      <input className="search" onChange={e => handleChange(e)} type="text" placeholder="Enter the user name"></input>
      {
        owner ? <List owner={owner}></List> : ''
      }      
    </div>
  );
}

export default Home;
