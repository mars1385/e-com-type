import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LockIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, selectErrors } from '../redux/user/userSelector';
import { createStructuredSelector } from 'reselect';
import { loginUser } from '../redux/user/userActions';
import {
  Heading,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  Container,
  Text,
} from '@chakra-ui/react';
import { userInfo, error } from '../redux/user/userTypes';
import { appState } from '../redux/rootReducers';
import { useRouter } from 'next/router';

interface LoginProps {}

type userInput = {
  email: string;
  password: string;
};

interface userSelector {
  currentUser: userInfo;
  currentErrors: error[];
}

const Login: React.FC<LoginProps> = ({}) => {
  const { register, errors, handleSubmit } = useForm();
  const router = useRouter();

  const { currentUser, currentErrors } = useSelector(
    createStructuredSelector<appState, userSelector>({
      currentUser: selectCurrentUser,
      currentErrors: selectErrors,
    })
  );

  useEffect(() => {
    if (currentUser.email) {
      router.push('/');
    }
  }, [currentUser]);
  const dispatch = useDispatch();

  const loginUserHandler: SubmitHandler<userInput> = (data: userInput) => {
    dispatch(loginUser({ email: data.email, password: data.password }));
  };
  return (
    <Container>
      <Flex justifyContent='center' mb={5}>
        <LockIcon w={8} h={8} mr={2} color='red.500' />
        <Heading color='gray.600'>Login User</Heading>
      </Flex>

      <form onSubmit={handleSubmit(loginUserHandler)}>
        <FormControl isInvalid={errors.email} mb={6}>
          <FormLabel color='gray.600' htmlFor='email'>
            Email Address :{' '}
          </FormLabel>
          <Input
            name='email'
            placeholder='Email Address'
            type='email'
            id='email'
            ref={register({ required: { value: true, message: 'Please add an valid Email' } })}
          />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password} mb={2}>
          <FormLabel color='gray.600' htmlFor='email'>
            Password :{' '}
          </FormLabel>
          <Input
            name='password'
            placeholder='Password'
            type='password'
            id='password'
            ref={register({ required: { value: true, message: 'Please add an password' } })}
          />
          <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
        </FormControl>
        {currentErrors.length > 0 && <Text color='red'>{`!! ${currentErrors[0].message}`}</Text>}
        <Button mt={4} textAlign='center' type='submit' colorScheme='green' size='lg'>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default React.memo(Login);
