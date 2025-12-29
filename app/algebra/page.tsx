'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './algebra.module.css';

function AlgebraContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchUrl, setSearchUrl] = useState('');

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      const target = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
      const url = `/api/proxy?url=${encodeURIComponent(target)}`;
      setSearchUrl(url);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const target = `https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`;
      const url = `/api/proxy?url=${encodeURIComponent(target)}`;
      setSearchUrl(url);
      // Keep query text so the bar doesn't clear
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
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
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

export default function Algebra() {
  return (
    <Suspense fallback={<div style={{ background: '#0a0015' }} />}>
      <AlgebraContent />
    </Suspense>
  );
}
