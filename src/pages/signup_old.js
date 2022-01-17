import React, { useEffect, useState } from 'react';
import React, { useEffect, useState } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import Button from '../components/Button';
import styled from 'styled-components';

const Wrapper = styled.div`
border: 1px solid #f5f4f0;
max-width: 500px;
padding: 1em;
margin: 0 auto;
`;

const Form = styled.form`
label,
input {
display: block;
line-height: 2em;
}
input {
width: 100%;
margin-bottom: 1em;
}
`;

const SIGNUP_USER = gql`  
mutation signUp($email: String!, $username: String!, $password: String!) {
signUp(email: $email, username: $username, password: $password)
}
`;

const SignUp = (props) => {
  // Устанавливаем состояние формы по умолчанию
  const [values, setValues] = useState();

  const onChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

	useEffect(() => {
		// Обновляем заголовок документа
		document.title = 'Sign Up — Notedly';
	})

  // Apollo Client
  const client = useApolloClient();

  //Добавляем хук мутации
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      // Когда мутация завершена, выводим в консоль JSON Web Token
      //console.log(data.signUp);

      // Обновляем локальный кэш
      client.writeData({ data: { isLoggedIn: true } });  
      
      // Сохраняем JWT в localStorage
      localStorage.setItem('token', data.signUp);
      props.history.push('/')

    }
  });

  return(
    <Wrapper>
      <h2>Sign Up</h2>
      {/*<Form onSubmit={event => {
              event.preventDefault();
              //console.log(values);
              signUp({
                  variables: {
                  ...values
                  }
              })
            }}
      >

        <label htmlFor="username">Username:</label>
        <input required
               type="text"
               id="username"
               name="username"
               placeholder="username"
               onChange={onChange}
        />
        <label htmlFor="email">Email:</label>
        <input required
               type="email"
               id="email"
               name="email"
               placeholder="email"
               onChange={onChange}
        />
        <label htmlFor="password">Password:</label>
        <input required
               type="password"
               id="password"
               name="password"
               placeholder="password"
               onChange={onChange}
        />
        <Button type="submit">Submit</Button>
               
      </Form>*/}
    </Wrapper>
  )


}

export default SignUp