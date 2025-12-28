'use client';

import React, { useState } from 'react';
import styles from './ProxyFrame.module.css';

interface ProxyFrameProps {
  url: string;
}

export default function ProxyFrame({ url }: ProxyFrameProps) {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading...</p>
        </div>
      )}
      <iframe
        src={url}
        title="Proxy Frame"
        className={styles.iframe}
        onLoad={handleLoad}
        onError={handleError}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
      />
    </div>
  );
}
