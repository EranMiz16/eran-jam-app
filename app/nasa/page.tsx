import React from 'react';
import { getData, ApodItem } from '../../lib/nasa';
import styles from './nasa.module.css';

export const metadata = {
  title: 'NASA APOD Gallery'
};

export default async function NasaPage() {
  let items: ApodItem[] = [];
  try {
    items = await getData(8);
  } catch (err) {
    console.error('Failed to fetch NASA APOD:', err);
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>NASA — Astronomy Picture of the Day</h1>

      {items.length === 0 ? (
        <div className={styles.error}>No items available right now. Try again later.</div>
      ) : (
        <div className={styles.grid}>
          {items.map((it) => (
            // media_type may be "image" or "video" — handle both
            <article key={it.date} className={styles.card}>
              <div className={styles.media}>
                {it.media_type === 'image' ? (
                  <img src={it.url} alt={it.title} className={styles.img} />
                ) : (
                  // if video (e.g. YouTube), embed using iframe
                  <div className={styles.videoWrap}>
                    <iframe
                      src={it.url}
                      title={it.title}
                      frameBorder={0}
                      allow="encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>

              <div className={styles.info}>
                <h2 className={styles.itemTitle}>{it.title}</h2>
                <time className={styles.date}>{it.date}</time>
                <p className={styles.expl}>{it.explanation}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
