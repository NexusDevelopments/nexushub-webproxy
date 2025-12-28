'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './algebra.module.css';

export default function Algebra() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchUrl, setSearchUrl] = useState('');

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      const url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
      setSearchUrl(url);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const url = `https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`;
      setSearchUrl(url);
      setSearchQuery('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🔐 Private Search</h1>
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search securely..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.input}
            autoFocus
          />
          <button type="submit" className={styles.btn}>
            Search
          </button>
        </form>
      </div>

      <div className={styles.frameContainer}>
        {searchUrl ? (
          <iframe
            src={searchUrl}
            className={styles.frame}
            title="DuckDuckGo Search"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-top-navigation"
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <p style={{ color: '#a78bfa', fontSize: '18px' }}>Start searching above...</p>
          </div>
        )}
      </div>
    </div>
  );
}
