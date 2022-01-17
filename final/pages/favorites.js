import React, {useEffect} from 'react';
import { useQuery, gql } from '@apollo/client';
import {GET_MY_FAVORITES} from '../gql/query'
import NoteFeed from '../components/NoteFeed'


const Favorites = () => {

	useEffect(() => {
    document.title = 'Favorites - Notedly'
  })


  // Хук запроса
  const { data, loading, error } = useQuery(GET_MY_FAVORITES);
  if (loading) return <p>Loading...</p>;
  // Если при получении данных произошел сбой, отображаем сообщение об ошибке
  if (error) return <p>Error!</p>;

  console.log("data.me.favorites ->",data.me.favorites)
  if(data.me.favorites.length !== 0){
    return <NoteFeed notes={data.me.favorites} />
  }else{
    return <p> No notes yet </p>
  }

}

export default Favorites