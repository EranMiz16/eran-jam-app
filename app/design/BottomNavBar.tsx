// app/design/BottomNavBar.tsx

import React from 'react';
import { FiUser, FiShare2, FiImage, FiHeart, FiMessageSquare } from 'react-icons/fi'; // 1. Import icons
import styles from './design.module.css';

export default function BottomNavBar(): JSX.Element {
  return (
    <footer className={styles.bottomNavBar}>
      
      <div className={styles.navIcon}>
        <FiUser /> 
      </div>
      
      <div className={styles.navIcon}>
        <FiShare2 />
      </div>
      
      <div className={`${styles.navIcon} ${styles.highlightedIcon}`}>
        <FiImage /> 
      </div>
      
      <div className={styles.navIcon}>
        <FiHeart />
      </div>
      
      <div className={styles.navIcon}>
        <FiMessageSquare />
      </div>
    </footer>
  );
}