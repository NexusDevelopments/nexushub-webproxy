'use client';

import React, { useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      // Use DuckDuckGo for secure, private searches
      onSearch(query);
      setQuery('');
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Search securely with DuckDuckGo..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
          autoFocus
        />
        <button type="submit" className={styles.btn}>
          🔍
        </button>
      </div>
    </form>
  );
}
