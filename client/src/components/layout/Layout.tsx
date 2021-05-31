import React from 'react';
import { Wrapper, WrapperVariant } from './wrapper/Wrapper';
import { Header } from './header/Header';

interface LayoutProps {
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <Header />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
