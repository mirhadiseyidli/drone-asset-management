import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css';

function MyApp({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [loading, setLoading] = useState(true); // Loading state to manage UI while fetching data

  const fetchAuthAndCsrf = async () => {
    try {
      // Fetch CSRF token
      // const csrfResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/csrf-token`, { withCredentials: true });
      const csrfResponse = await axios.get('http://localhost:5002/api/csrf-token', { withCredentials: true });
      setCsrfToken(csrfResponse.data.csrfToken);

      // Check if user is authenticated
      // const authResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/check-auth`, { withCredentials: true });
      const authResponse = await axios.get('http://localhost:5002/api/check-auth', { withCredentials: true });
      if (authResponse.data.user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error during authentication or fetching CSRF token:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false); // Stop loading once authentication check is complete
    }
  };

  useEffect(() => {
    fetchAuthAndCsrf();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while authentication is being checked
  }

  return (
    <div className="min-h-screen flex flex-col relative h-screen w-full bg-white ">
      <div className="flex-grow z-10">
        <Component {...pageProps} isAuthenticated={isAuthenticated} csrfToken={csrfToken} />
      </div>
    </div>
  );
}

export default MyApp;
