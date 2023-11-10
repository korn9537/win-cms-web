import React from 'react';
import { MyMenu } from './AppMenu';

type AppContentProps = {
  children: React.ReactNode;
  menus?: MyMenu[];
};

export default function AppContent(props: AppContentProps) {
  return <div>{props.children}</div>;
}
