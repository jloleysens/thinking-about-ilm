import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import { EuiButton } from '@elastic/eui';

export const NavButton: FunctionComponent<{ to: string }> = ({
  to,
  children,
}) => (
  <Link to={to}>
    <EuiButton>{children}</EuiButton>
  </Link>
);
