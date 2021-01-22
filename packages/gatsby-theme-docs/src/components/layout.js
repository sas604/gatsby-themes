/** @jsxRuntime classic /
/** @jsx jsx */

import { jsx } from 'theme-ui';
import { Fragment } from 'react';
const Layout = ({ children }) => (
  <Fragment>
    <header
      sx={{ bg: 'primary', color: 'background', fontFamily: 'heading', p: 3 }}
    >
      Bla bla
    </header>
    <main sx={{ mx: 'auto', maxWidth: 650, width: '90vw' }}>{children}</main>
  </Fragment>
);

export default Layout;
