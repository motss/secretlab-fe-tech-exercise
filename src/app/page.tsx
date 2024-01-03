import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/products');
}

// todo: data fetched thru proxy from app API
// todo: all pages has to be responsive in desktop, table, and mobile
// todo: write tests
// todo: use zustand
