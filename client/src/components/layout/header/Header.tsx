import React from 'react';
import {
  Avatar,
  Flex,
  Image,
  Link,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/user/userActions';
import { selectCurrentUser } from '../../../redux/user/userSelector';
import { createStructuredSelector } from 'reselect';
import NextLink from 'next/link';
import { userInfo } from '../../../redux/user/userTypes';
import { appState } from '../../../redux/rootReducers';

interface HeaderProps {}

interface userSelector {
  currentUser: userInfo;
}

export const Header: React.FC<HeaderProps> = ({}) => {
  const [search, setSearch] = React.useState('');
  const dispatch = useDispatch();

  const { currentUser } = useSelector(
    createStructuredSelector<appState, userSelector>({
      currentUser: selectCurrentUser,
    })
  );

  const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const clickLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <Flex zIndex={1} position='sticky' top={0} bg='white' p={4}>
      <Flex flex={1} m='auto' align='center' justifyContent='space-between' maxW={800}>
        <NextLink href='/'>
          <Link textDecoration='none'>
            <Flex align='center'>
              <Image src='./Logo.png' boxSize='50px' objectFit='cover' alt='My Shop' />
              <Heading size='sm' color='gray.500'>
                My Shop
              </Heading>
            </Flex>
          </Link>
        </NextLink>
        <InputGroup width='200px' borderColor='gray'>
          <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.300' />} />
          <Input
            onChange={changeSearch}
            name='search'
            id='search'
            placeholder='Search Items'
            value={search}
          />
        </InputGroup>
        {!currentUser.email ? (
          <Flex align='center'>
            <NextLink href='/login'>
              <Link margin='10px'>Login</Link>
            </NextLink>
            <NextLink href='/register'>
              <Link margin='10px'>Register</Link>
            </NextLink>
          </Flex>
        ) : (
          <Menu>
            <MenuButton size='sm' as={Avatar}></MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={clickLogout}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Flex>
  );
};
