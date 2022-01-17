import React, { useEffect } from 'react'
import { useMutation, gql } from '@apollo/client';
import NoteForm from '../components/NoteForm'
import { GET_MY_NOTES, GET_NOTES } from '../gql/query'

const NEWNOTE = gql`
  mutation newNote($content: String!) {
    newNote(content: $content){
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }  
`;
  

const NewNote = props => {
  useEffect(() => {
    // Обновляем заголовок документа
    document.title = 'New note — Notedly';
  })

  //Добавляем хук мутации
  const [data, { loading, error }] = useMutation(NEWNOTE, {
    // Повторно получаем запрос GET_NOTES, чтобы обновить кэш
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
    onCompleted: data => {
      props.history.push(`note/${data.newNote.id}`)
    }
  })


	return (
    <React.Fragment>
      {/* Во время загрузки мутации выдаем сообщение о загрузке */}
      {loading && <p>Loading...</p>}
      {/* В случае сбоя выдаем сообщение об ошибке*/}
      {error && <p>Error saving the note</p>}
      <NoteForm action={data}/>
    </React.Fragment>
	)
}

export default NewNote