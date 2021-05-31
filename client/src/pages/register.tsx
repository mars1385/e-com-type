import React, { useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LockIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, selectErrors } from '../redux/user/userSelector';
import { createStructuredSelector } from 'reselect';
import { registerUser } from '../redux/user/userActions';
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

interface RegisterProps {}

type userInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface userSelector {
  currentUser: userInfo;
  currentErrors: error[];
}

const Register: React.FC<RegisterProps> = ({}) => {
  const { register, errors, handleSubmit, watch } = useForm();
  const password = useRef({});
  password.current = watch('password', '');
  const router = useRouter();

  const { currentUser, currentErrors } = useSelector(
    createStructuredSelector<appState, userSelector>({
      currentUser: selectCurrentUser,
      currentErrors: selectErrors,
    })
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser.email) {
      router.push('/');
    }
  }, [currentUser]);

  const registerUserHandler: SubmitHandler<userInput> = (data: userInput) => {
    dispatch(
      registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      })
    );
  };
  return (
    <Container>
      <Flex justifyContent='center' mb={5}>
        <LockIcon w={8} h={8} mr={2} color='red.500' />
        <Heading color='gray.600'>Register User</Heading>
      </Flex>

      <form onSubmit={handleSubmit(registerUserHandler)}>
        <FormControl isInvalid={errors.firstName} mb={4}>
          <FormLabel color='gray.600' htmlFor='firstName'>
            First Name :{' '}
          </FormLabel>
          <Input
            name='firstName'
            placeholder='First Name'
            id='firstName'
            ref={register({ required: { value: true, message: 'Please add your Name' } })}
          />
          <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.lastName} mb={4}>
          <FormLabel color='gray.600' htmlFor='lastName'>
            Last Name :{' '}
          </FormLabel>
          <Input
            name='lastName'
            placeholder='Last Name'
            id='lastName'
            ref={register({ required: { value: true, message: 'Please add your Last Name' } })}
          />
          <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.email} mb={4}>
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
        <FormControl isInvalid={errors.password} mb={4}>
          <FormLabel color='gray.600' htmlFor='password'>
            Password :{' '}
          </FormLabel>
          <Input
            name='password'
            placeholder='Password'
            type='password'
            id='password'
            ref={register({
              required: 'You must specify a password',
              minLength: {
                value: 6,
                message: 'Password must have at least 6 characters',
              },
            })}
          />
          <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.confirmPassword} mb={2}>
          <FormLabel color='gray.600' htmlFor='confirmPassword'>
            Confirm Password :{' '}
          </FormLabel>
          <Input
            name='confirmPassword'
            placeholder='Password'
            type='password'
            id='confirmPassword'
            ref={register({
              validate: (value) => value === password.current || 'The passwords do not match',
            })}
          />
          <FormErrorMessage>{errors.confirmPassword && errors.confirmPassword.message}</FormErrorMessage>
        </FormControl>

        {currentErrors.length > 0 && <Text color='red'>{`!! ${currentErrors[0].message}`}</Text>}
        <Button mt={4} textAlign='center' type='submit' colorScheme='green' size='lg'>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default React.memo(Register);
