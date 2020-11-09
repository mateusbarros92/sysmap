import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarFilled } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert';
import './styles.css';
import { useMutation, gql } from '@apollo/client';

interface IItem {
  repository: any;
}

const HANDLE_STAR_REPOSITORY = gql`
 mutation handleStarRepository($full_name: String!) {
   handleStarRepository(input: {
     full_name: $full_name
   })
 }
`;

function Item({ repository }: IItem) {
  const [starStatus, setStarStatus] = useState(repository.starred);
  const selectedStar = starStatus ? faStarFilled : faStar;
  const [handleStarRepository] = useMutation(HANDLE_STAR_REPOSITORY);

  async function handleStarPress(full_name: string) {
    if(!validateUserAccess()) return;  

    handleStarRepository({
      variables: {
        full_name
      }
    })
      .then(res => {
        setStarStatus(res.data.handleStarRepository);        
      })
      .catch(error => {
        swal({
          title: error.name,
          text: error.message,
          icon: 'error'
        });
      })
  }

  function validateUserAccess() {
    if (!localStorage.getItem('accessToken')) {
      swal({
        title: 'Warning!',
        text: 'It\'s not possible to star a repository without sign in.',
        icon: 'warning'
      });     
      return false;       
    } 
    return true;
  }

  return (
    <li key={repository.id} className="list">
      <div className="view">
        <label>{repository.name}</label>
        <FontAwesomeIcon icon={selectedStar} onClick={() => handleStarPress(repository.full_name)} />   
      </div>
    </li>
  );
}

export default Item;
