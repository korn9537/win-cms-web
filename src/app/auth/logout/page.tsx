import React from 'react';
import { redirect } from 'next/navigation';

export default function LogoutPage() {
  redirect('/auth/login');

  return <div>LogoutPage</div>;
}
