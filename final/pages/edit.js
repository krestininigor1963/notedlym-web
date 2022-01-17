import React from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import NoteForm from '../components/NoteForm'
import { GET_NOTE, GET_ME } from '../gql/query'
import { EDIT_NOTE } from '../gql/mutation'


// // Запрос note, принимающий переменную ID
// const GET_NOTE = gql`
// query note($id: ID!) {
//   note(id: $id) {
//       id
//       createdAt
//       content
//       favoriteCount
//       author {
//         username
//         id
//         avatar
//       }
//   }
// }
// `;


const EditNote = props => {
  // Сохраняем id, полученный из url, в виде переменной
  const id = props.match.params.id

  // Запрашиваем хук, передавая значение id в качестве переменной
  const { loading, error, data } = useQuery(GET_NOTE, {variables: {id}});
  const { data: userdata } = useQuery(GET_ME)

  const [editNote] = useMutation(EDIT_NOTE, {variables: {id}, 
    onCompleted: () => {props.history.push(`/note/${id}`);}
  })

 
  //Если данные загружаются, отображаем сообщение о загрузке
  if(loading) return <p>Loading...</p>;
  //Если при получении данных произошел сбой, отображаем сообщение об ошибке
  if(error) return <p>Error! Note not found</p>;
  
  // Если текущий пользователь не соответствует автору заметки,
  // возвращаем соответствующее сообщение
  // console.log("userdata?.me?.id ->", userdata?.me?.id)
  if(userdata?.me?.id !== data.note.author.id){
    return <p>You do not have access to edit this note</p>;
  }

	return(
		<div>
			{/*<p>ID: {props.match.params.id} </p>	*/}
      {/*// Если загрузка данных произошла успешно, отображаем их в UI*/}
      <NoteForm content={data.note.content} action={editNote} />
		</div>
	)
}

export default EditNote
