import React, {useEffect} from 'react';
import { useQuery, gql } from '@apollo/client';
import {GET_MY_NOTES} from '../gql/query'
import NoteFeed from '../components/NoteFeed'



const MyNotes = () => {
	
  useEffect(() => {
    document.title = 'My Notes - Notedly'
  })

  // Хук запроса
  const { data, loading, error } = useQuery(GET_MY_NOTES);
  if (loading) return <p>Loading...</p>;
  // Если при получении данных произошел сбой, отображаем сообщение об ошибке
  if (error) return <p>Error!</p>;

  // Если запрос выполнен успешно и содержит заметки, возвращаем их в ленту.
  // Если же запрос выполнен успешно, но заметок в нем нет,
  // выдаем сообщение "No notes yet"
  if(data.me.notes.length !== 0){
    return <NoteFeed notes={data.me.notes} />
  } else {
    return <p> No notes yet </p>
  }
  

}

export default MyNotes