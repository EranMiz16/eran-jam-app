import React from 'react';
import { ArtObject } from './types';
import styles from './Art.module.css';

interface ArtCardProps {
  art: ArtObject;
}

export default function ArtCard({ art }: ArtCardProps): JSX.Element {
  return (
    <div className={styles.card}>
      {art.primaryImage && (
        // Use a standard img tag; in a full app, you'd use Next.js <Image>
        <img 
          src={art.primaryImage} 
          alt={art.title} 
          className={styles.image}
        />
      )}
      <div className={styles.details}>
        <h3 className={styles.title}>{art.title}</h3>
        <p className={styles.artist}>Artist: {art.artistDisplayName || 'Unknown'}</p>
        
        {/* --- 3 OTHER PROPERTIES REQUIRED BY ASSIGNMENT --- */}
        <p><strong>Department:</strong> {art.department}</p>
        <p><strong>Medium:</strong> {art.medium}</p>
        <p><strong>Date:</strong> {art.objectDate}</p>
        {/* --- END OTHER PROPERTIES --- */}
        
      </div>
    </div>
  );
}