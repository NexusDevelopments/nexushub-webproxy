'use client';

import React, { useState, useEffect } from 'react';
import styles from './SubdomainManager.module.css';

interface SubdomainInfo {
  subdomain?: string;
  username?: string;
  created: boolean;
  available?: boolean;
  createdAt?: string;
  error?: string;
}

export default function SubdomainManager() {
  const [subdomain, setSubdomain] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [subdomainInfo, setSubdomainInfo] = useState<SubdomainInfo | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Check if current subdomain is registered
    const host = window.location.host;
    const parts = host.split('.');
    let currentSubdomain = null;

    if (parts.length > 2 && !host.includes('localhost')) {
      if (host.includes('vercel.app')) {
        currentSubdomain = parts[0];
      } else {
        currentSubdomain = parts[0];
      }
    }

    if (currentSubdomain && currentSubdomain !== 'www') {
      setSubdomain(currentSubdomain);
      checkSubdomain(currentSubdomain);
    }
  }, []);

  const checkSubdomain = async (sub: string) => {
    try {
      const response = await fetch('/api/subdomains', {
        method: 'GET',
        headers: {
          'x-subdomain': sub,
        },
      });
      const data = await response.json();
      setSubdomainInfo(data);
    } catch (error) {
      console.error('Error checking subdomain:', error);
    }
  };

  const handleCreateSubdomain = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/subdomains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-subdomain': subdomain,
        },
        body: JSON.stringify({
          username,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ Subdomain created! Visit: https://${subdomain}.${window.location.hostname}`);
        setSubdomainInfo({ ...data, created: true });
        setUsername('');
        setShowForm(false);
      } else {
        setMessage(`❌ ${data.error || 'Failed to create subdomain'}`);
      }
    } catch (error) {
      setMessage('❌ Error creating subdomain');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>🌐 Subdomain Manager</h2>

        {subdomain && (
          <div className={styles.currentSubdomain}>
            <p>Current subdomain: <code>{subdomain}.{window.location.hostname.split('.').slice(1).join('.')}</code></p>
          </div>
        )}

        {subdomainInfo?.created ? (
          <div className={styles.success}>
            <h3>✅ Subdomain Registered</h3>
            <p><strong>Username:</strong> {subdomainInfo.username}</p>
            <p><strong>Created:</strong> {new Date(subdomainInfo.createdAt || '').toLocaleDateString()}</p>
            <p className={styles.hint}>
              Share your subdomain with others: <code>https://{subdomainInfo.subdomain}.{window.location.hostname.split('.').slice(1).join('.')}</code>
            </p>
          </div>
        ) : (
          <div>
            {!showForm ? (
              <button
                className={styles.btn}
                onClick={() => setShowForm(true)}
              >
                📝 Claim This Subdomain
              </button>
            ) : (
              <form onSubmit={handleCreateSubdomain} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your username"
                    required
                  />
                </div>

                <div className={styles.formActions}>
                  <button
                    type="submit"
                    disabled={loading}
                    className={styles.submitBtn}
                  >
                    {loading ? 'Creating...' : 'Create Subdomain'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className={styles.cancelBtn}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {message && (
          <div className={styles.message}>
            {message}
          </div>
        )}

        <div className={styles.info}>
          <h4>How it works:</h4>
          <ul>
            <li>Each subdomain is a unique proxy instance</li>
            <li>Claim a subdomain by entering your username</li>
            <li>Share your URL with others to share your proxy</li>
            <li>Example: <code>alice.nexushublol.com</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
