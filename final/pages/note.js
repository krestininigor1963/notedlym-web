import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Note from '../components/Note'


// Запрос note, принимающий переменную ID
const GET_NOTE = gql`
query note($id: ID!) {
  note(id: $id) {
      id
      createdAt
      content
      favoriteCount
      author {
        username
        id
        avatar
      }
  }
}
`;


const NotePage = props => {
  const id = props.match.params.id

// Запрашиваем хук, передавая значение id в качестве переменной
  const { loading, error, data } = useQuery(GET_NOTE, {variables: {id}});
  //Если данные загружаются, отображаем сообщение о загрузке
  if(loading) return <p>Loading...</p>;
  //Если при получении данных произошел сбой, отображаем сообщение об ошибке
  if(error) return <p>Error! Note not found</p>;

	return(
		<div>
			{/*<p>ID: {props.match.params.id} </p>	*/}
      {/*// Если загрузка данных произошла успешно, отображаем их в UI*/}
      <Note note={data.note} />
		</div>
	)
}

export default NotePage
