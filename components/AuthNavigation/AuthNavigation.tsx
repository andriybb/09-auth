'use client';

import css from './AuthNavigation.module.css';

import { useRouter } from 'next/navigation';

import useAuthStore from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import Link from 'next/link';

export default function AuthNavigation() {
  const router = useRouter();
  const isLogin = useAuthStore(state => state.isAuthenticated);
  const clearUser = useAuthStore(state => state.clearUser);
  const user = useAuthStore(state => state.user);

  async function out() {
    const res = await logout();
    if (res) {
      clearUser();
      router.push('/sign-in');
    }
  }

  return (
    <>
      {isLogin && (
        <>
          <li className={css.navigationItem}>
            <Link href="/profile" prefetch={false} className={css.navigationLink}>
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>
              {user?.email ?? 'User email'}
            </p>
            <button onClick={out} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </>
      )}
      {!isLogin && (
        <>
          <li className={css.navigationItem}>
            <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
}