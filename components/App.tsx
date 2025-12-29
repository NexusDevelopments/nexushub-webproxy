'use client';

import React, { useState, useRef, useEffect } from 'react';
import SearchBar from './SearchBar';
import TabBar from './TabBar';
import ProxyFrame from './ProxyFrame';
import UrlBar from './UrlBar';
import styles from './App.module.css';

interface Tab {
  id: number;
  title: string;
  url: string | null;
}

export default function App() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 1, title: 'Home', url: null }
  ]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [nextTabId, setNextTabId] = useState(2);
  const appRef = useRef<HTMLDivElement>(null);
  const phrases = [
    'hello im nexus dev',
    'go get a ob',
    "don't goon on this ir else...",
    'proxy the planet',
    'blink twice if u see this',
    'hydrate or evaporate'
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);

  const activeTab = tabs.find(t => t.id === activeTabId);

  const handleNewTab = () => {
    const newTab: Tab = { id: nextTabId, title: 'New Tab', url: null };
    setTabs([...tabs, newTab]);
    setNextTabId(nextTabId + 1);
    setActiveTabId(newTab.id);
  };

  const handleCloseTab = (tabId: number) => {
    const newTabs = tabs.filter(t => t.id !== tabId);
    if (newTabs.length === 0) {
      const newTab: Tab = { id: nextTabId, title: 'Home', url: null };
      setTabs([newTab]);
      setNextTabId(nextTabId + 1);
      setActiveTabId(newTab.id);
    } else if (activeTabId === tabId) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
      setTabs(newTabs);
    } else {
      setTabs(newTabs);
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    const algebraUrl = `/algebra?q=${encodeURIComponent(query)}`;
    // Hard navigate so user lands on the dedicated algebra page
    window.location.href = algebraUrl;
  };

  const handleUrlSubmit = (url: string) => {
    const proxied = `/api/proxy?url=${encodeURIComponent(url)}\u0026ts=${Date.now()}`;
    updateTabUrl(activeTabId, proxied);
  };

  const updateTabUrl = (tabId: number, url: string) => {
    const updatedTabs = tabs.map(t => {
      if (t.id === tabId) {
        try {
          const urlObj = new URL(url);
          return { ...t, url, title: urlObj.hostname };
        } catch {
          return { ...t, url, title: 'Loading...' };
        }
      }
      return t;
    });
    setTabs(updatedTabs);
  };

  const handleSelectTab = (tabId: number) => {
    setActiveTabId(tabId);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
      e.preventDefault();
      handleNewTab();
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
      e.preventDefault();
      handleCloseTab(activeTabId);
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'Tab') {
      e.preventDefault();
      const currentIndex = tabs.findIndex(t => t.id === activeTabId);
      const nextIndex = (currentIndex + 1) % tabs.length;
      setActiveTabId(tabs[nextIndex].id);
    }
    
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Tab') {
      e.preventDefault();
      const currentIndex = tabs.findIndex(t => t.id === activeTabId);
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      setActiveTabId(tabs[prevIndex].id);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown as EventListener);
    return () => window.removeEventListener('keydown', handleKeyDown as EventListener);
  }, [tabs, activeTabId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <div className={styles.app} ref={appRef}>
      <div className={styles.nova} />
      <div className={styles.nova2} />
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>⚡</span>
          <span className={styles.logoText}>NexusHub</span>
        </div>
      </header>

      <TabBar 
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={handleSelectTab}
        onCloseTab={handleCloseTab}
        onNewTab={handleNewTab}
      />

      <div className={styles.contentContainer}>
        {!activeTab?.url ? (
          <>
            <div className={styles.centerStage}>
              <div className={styles.centerLogo}>
                <span className={styles.centerIcon}>⚡</span>
                <h1 className={styles.centerTitle}>NexusHub</h1>
              </div>
              <SearchBar onSearch={handleSearch} />
              <p className={styles.rotating}>{phrases[phraseIndex]}</p>
            </div>
          </>
        ) : (
          <>
            <UrlBar 
              url={activeTab.url} 
              onSubmit={handleUrlSubmit}
            />
            <ProxyFrame url={activeTab.url} />
          </>
        )}
      </div>
    </div>
  );
}
