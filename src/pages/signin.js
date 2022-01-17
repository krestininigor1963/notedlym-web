import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import UserForm from '../components/UserForm'


const SIGNIN_USER = gql`  
mutation signIn($email: String!, $password: String!) {
signIn(email: $email, password: $password)
}
`;

const SignIn = (props) => {

	
	useEffect(() => {
	  document.title = 'Sign In — Notedly';
	})

	// Apollo Client
  const client = useApolloClient();

  //Добавляем хук мутации
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      
      // Сохраняем JWT в localStorage
      localStorage.setItem('token', data.signIn);
      // Обновляем локальный кэш
      client.writeData({ data: { isLoggedIn: true } });
      // на домашнюю страницу
      props.history.push('/')

    }
  });

	return (
    <React.Fragment>
    	<UserForm action={signIn} formType="signin" />
      {/* Если данные загружаются, отображаем сообщение о загрузке */}
      {loading && <p>Loading...</p>}	
      {/* Если при загрузке произошел сбой, отображаем сообщение об ошибке */}
      {error && <p>Error signing in!</p>}
    </React.Fragment>
  )

}


export default SignIn