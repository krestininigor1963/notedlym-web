import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm'

const SIGNUP_USER = gql`  
mutation signUp($email: String!, $username: String!, $password: String!) {
signUp(email: $email, username: $username, password: $password)
}
`;

const SignUp = (props) => {

	useEffect(() => {
		// Обновляем заголовок документа
		document.title = 'Sign Up — Notedly';
	})

  // Apollo Client
  const client = useApolloClient();

  //Добавляем хук мутации
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {

      // Сохраняем JWT в localStorage
      localStorage.setItem('token', data.signUp);
      
      // Обновляем локальный кэш
      client.writeData({ data: { isLoggedIn: true } });  
      
      props.history.push('/')

    }
  });


  return(
  	<React.Fragment>
  		<UserForm action={signUp} formType="signup" />
      {/* Если данные загружаются, отображаем сообщение о загрузке */}
      {loading && <p>Loading...</p>}	
      {/* Если при загрузке произошел сбой, отображаем сообщение об ошибке */}
      {error && <p>Error creating an account!</p>}
  	</React.Fragment>
  )	

}


  export default SignUp