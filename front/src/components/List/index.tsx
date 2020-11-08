import React from 'react';
import { useQuery, gql } from '@apollo/client';
import swal from 'sweetalert';
import Item from '../Item';
import './style.css';

const GET_PUBLIC_REPOSITORIES = gql`
  query GetPublicRepositories($owner: String!) {
    getPublicRepositories(input: {
      owner: $owner
    }){
      id
      name
      full_name
      starred
    }
  }
`;

interface IList {
  owner: string;
}

function List({ owner }: IList) {
  const { data, error } = useQuery(GET_PUBLIC_REPOSITORIES, {
    variables: {
      owner
    }
  })

  if(error) {
    swal({
      title: error.name,
      text: error.message,
      icon: 'error'
    });
  }

  return (
    <section className="main">
      <ul className="list">
        {data?.getPublicRepositories.map((repository: any) => {
          return <Item key={repository.id} repository={repository}></Item> 
        })}        
      </ul>      
    </section>
  )
}

export default List;