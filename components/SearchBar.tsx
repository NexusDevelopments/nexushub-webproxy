'use client';

import React, { useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string, engine: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [searchEngine, setSearchEngine] = useState('google');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, searchEngine);
      setQuery('');
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.engineSelector}>
        <select 
          value={searchEngine} 
          onChange={(e) => setSearchEngine(e.target.value)}
          className={styles.select}
        >
          <option value="google">Google</option>
          <option value="duckduckgo">DuckDuckGo</option>
          <option value="bing">Bing</option>
        </select>
      </div>
      
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Search the web securely..."
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
