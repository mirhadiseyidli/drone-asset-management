import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import ProfileBar from '../components/profileBar';
import Dashboard from '../components/Dashboard';
import Inventory from '../components/Inventory';
import AdminPanel from '../components/AdminPanel';

export default function HomePage() {
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRouterReady, setIsRouterReady] = useState(false);

  // Function to handle section changes
  const handleSectionChange = (section) => {
    setSelectedSection(section);
    
    if (section === 'Dashboard') {
      router.push(
        {
          pathname: '/',
          query: { section: 'dashboard' }
        },
        undefined,
        { shallow: true }
      );
    } else if (section === 'Inventory') {
      router.push(
        {
          pathname: '/',
          query: { section: 'inventory' }
        },
        undefined,
        { shallow: true }
      );
    } else if (section === 'Requests') {
      router.push(
        {
          pathname: '/',
          query: { section: 'requests' }
        },
        undefined,
        { shallow: true }
      );
    } else if (section === 'Approvals') {
      router.push(
        {
          pathname: '/',
          query: { section: 'approvals' }
        },
        undefined,
        { shallow: true }
      );
    } else if (section === 'Admin Panel') {
      router.push(
        {
          pathname: '/',
          query: { section: 'admin panel' }
        },
        undefined,
        { shallow: true }
      );
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // When the component mounts or URL changes, check the query for section
  useEffect(() => {
    if (router.isReady) {
      const sectionFromQuery = router.query.section;
      setIsRouterReady(true);

      if (sectionFromQuery === 'inventory') {
        setSelectedSection('Inventory');
      } else if (sectionFromQuery === 'dashboard') {
        setSelectedSection('Dashboard');
      } else if (sectionFromQuery === 'requests') {
        setSelectedSection('Requests');
      } else if (sectionFromQuery === 'approvals') {
        setSelectedSection('Approvals');
      } else if (sectionFromQuery === 'admin panel') {
        setSelectedSection('Admin Panel');
      }
    }
    if (!router.query.section) {
      router.push(
        {
          pathname: '/',
          query: { section: 'dashboard' }
        },
        undefined,
        { shallow: true }
      );
    }
  }, [router.isReady, router.query.section]);

  // Don't render until the router is ready
  if (!isRouterReady) {
    return <div>Loading...</div>; // You can customize this loader
  }

  return (
    <main className='flex h-full w-full'>
      <div className='flex flex-row h-full w-full'>
        <div>
          {/* Pass the function to Navbar to update the focused section */}
          <Navbar onSectionChange={handleSectionChange} selectedSection={selectedSection} />
        </div>
        <div className='flex flex-col w-full'>
          <div className='flex flex-row'>
            <div className='flex w-full ml-8 items-center justify-start text-start'>
              {/* <SearchBar onSearch={handleSearch} /> */}
            </div>
            <div>
              {/* <Notifications /> */}
            </div>
            <div>
              <ProfileBar />
            </div>
          </div>
          <div className='flex h-full w-full bg-gray-50'>
            {selectedSection === 'Inventory' && <Inventory />}
            {selectedSection === 'Dashboard' && <Dashboard />}
            {selectedSection === 'Requests' && <div>Requests Content</div>}
            {selectedSection === 'Approvals' && <div>Approvals Content</div>}
            {selectedSection === 'Admin Panel' && <AdminPanel />}
          </div>
        </div>
      </div>
    </main>
  );
}
