import { useEffect } from 'react';
import { useRouter } from 'next/router';
import HomePage from './home';

export default function Home({ isAuthenticated }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login'); // Use replace to avoid adding this redirect to history
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Prevent rendering if not authenticated
  }

  return <HomePage />;
}
