'use client';

import React from 'react';
import styles from './TabBar.module.css';

interface Tab {
  id: number;
  title: string;
  url: string | null;
}

interface TabBarProps {
  tabs: Tab[];
  activeTabId: number;
  onSelectTab: (id: number) => void;
  onCloseTab: (id: number) => void;
  onNewTab: () => void;
}

export default function TabBar({ tabs, activeTabId, onSelectTab, onCloseTab, onNewTab }: TabBarProps) {
  return (
    <div className={styles.tabBar}>
      <div className={styles.container}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${styles.tab} ${tab.id === activeTabId ? styles.active : ''}`}
            onClick={() => onSelectTab(tab.id)}
          >
            <span className={styles.title}>{tab.title}</span>
            <button
              className={styles.close}
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(tab.id);
              }}
              aria-label="Close tab"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      <button className={styles.newBtn} onClick={onNewTab} title="New Tab (Ctrl+T)">
        +
      </button>
    </div>
  );
}
