'use client';

import Link from 'next/link';

import { useState } from 'react';
import { useMount } from 'react-use';
import styles from './styles.module.css';

export function Checkout() {
  const [checkingOut, setCheckingOut] = useState(true);

  useMount(() => {
    const rand = Math.random() * 10e3;

    window.setTimeout(() => {
      setCheckingOut(false);
    }, rand);
  });

  return (
    <div className="grid p-4 justify-items-center">
      {
        checkingOut ? (
          <>
            <div className={`mb-6 mx-auto ${styles.loader}`} />
            <p>Validating your purchase...</p>
          </>
        ) : (
          <>
            <h2>Thank you for choosing to shop with us!</h2>
            <br />
            <Link className="text-center underline" href="/products">Continue shopping</Link>
          </>
        )
      }
    </div>
  );
}
