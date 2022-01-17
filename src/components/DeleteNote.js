import React from 'react'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/client';
import ButtonAsLink from './ButtonAsLink'

import { DELETE_NOTE } from '../gql/mutation'
// Импортируем запросы для их повторного получения после удаления заметки
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';

const DeleteNote = (props) => {
  const id = props.noteId

  //console.log("props.noteId->",id)
  const [deleteNote] = useMutation(DELETE_NOTE, {variables: {id}, 
    // Повторно получаем запросы списка заметок, чтобы обновить кэш
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
    // Перенаправляем пользователя на страницу "my notes"
    onCompleted: data => {props.history.push('/mynotes');}
  })

	return <ButtonAsLink onClick={deleteNote}>Delete Note</ButtonAsLink>
}

export default withRouter(DeleteNote)