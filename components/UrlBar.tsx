'use client';

import React, { useState, useEffect } from 'react';
import styles from './UrlBar.module.css';

interface UrlBarProps {
  url: string;
  onSubmit: (url: string) => void;
}

export default function UrlBar({ url, onSubmit }: UrlBarProps) {
  const [inputValue, setInputValue] = useState(url || '');

  useEffect(() => {
    setInputValue(url || '');
  }, [url]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      let fullUrl = inputValue.trim();
      
      if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
        fullUrl = 'https://' + fullUrl;
      }
      
      onSubmit(fullUrl);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <span className={styles.icon}>🔒</span>
        <input
          type="text"
          placeholder="Enter URL or search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.btn}>
          →
        </button>
      </div>
    </form>
  );
}
