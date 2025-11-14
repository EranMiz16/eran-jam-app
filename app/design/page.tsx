// app/design/page.tsx
import React from 'react';
import styles from './design.module.css';
import BottomNavBar from './BottomNavBar';

export const metadata = {
  title: 'Design - Mobile'
};



export default function DesignPage() {
  return (
    <main className={styles.screen} dir="rtl">
      <div className={styles.bottomBar} />
      <section className={`${styles.section} ${styles.whiteCard}`}>
        <div className={styles.topBar}>
          <div className={styles.smallTextLeft}>ג׳אם מוצרים</div>
          <div className={styles.smallTextRight}>באמבל למוזיאון ישראל</div>
        </div>

        <div className={styles.bannerWrap}>
          <div className={styles.banner}>אנסמבל אוצרים</div>
          
        </div>

        <div className={styles.sideLabel}>אודות</div>

        <div className={styles.mainText}>
          <h1 className={styles.mainHeading}>
            <span className={styles.red}>אפליקציית היכרות בין </span>
            <span>אמנים לאוצרים מטעם מוזיאון ישראל שמטרתה ליצור חיבורים מדויקים, שיתופי פעולה והזדמנויות חדשות.</span>
          </h1>

          <div className={styles.pill}>
            <span className={styles['pill-text']}>רקע, מטרה ותוצרים</span>
          </div>

          <p className={styles.paragraph}>
            תהליך האוצרות במוזיאון ישראל כיום ארוך, אינטראקטיבי ותלוי בקשרים אישיים.
            האוצרים מתקשים לאתר חיבורים רלוונטיים בין אמנים ליצירות, ובעוד שאמנים מתקשים לחשוף את עבודותיהם ולהגיע לאוצרים.
            המטרה – ליצור תהליך גמיש, ממוקד ושקוף יותר לשני הצדדים.
          </p>
        </div>

        <div className={styles.bottomBar} />
      </section>

      <section className={`${styles.section} ${styles.redScreen}`}>
    <div className={styles.logoWrap}>
    <svg viewBox="0 0 200 200" className={styles.logoSvg} aria-hidden>
        <rect x="0" y="0" width="200" height="200" fill="none" /> 

        <polygon points="20,20 80,20 50,80" fill="#0b0b0b" /> {/* Top Triangle */}
        <polygon points="20,100 80,100 50,40" fill="#0b0b0b" /> {/* Bottom Triangle (Creating the hourglass effect) */}
        
        <rect x="110" y="30" width="60" height="60" transform="rotate(45 140 60)" fill="#0b0b0b" /> 
        
        <polygon points="20,120 80,120 50,180" fill="#0b0b0b" /> {/* Inverted Triangle */}
        <rect x="40" y="180" width="20" height="40" fill="#0b0b0b" /> {/* Small stem rectangle (moved below the triangle) */}
        
        <rect x="110" y="110" width="70" height="70" fill="#0b0b0b" /> {/* Large Black Square */}
        <circle cx="145" cy="145" r="25" fill="#e30613" /> 
    </svg>
    </div>

        <div className={styles.redBottomStrip} />
      </section>

      <section className={`${styles.section} ${styles.whiteCard}`}>
        <div className={styles.topRedBar} />
        <div className={styles.creditList}>
          <article className={styles.credit}>
            <div className={styles.index}>(1)</div>
            <h3 className={styles.creditTitle}><span className={styles.red}>מתכננים:</span> נוי בריתן, מעין מימון, שירה ברקוביץ', רפאל סבון.</h3>
          </article>

          <article className={styles.credit}>
            <div className={styles.index}>(2)</div>
            <h3 className={styles.creditTitle}><span className={styles.red}>מעצבים:</span> טל לנגזם, שני דדוביץ', אגניו טגניה, מאי מינה</h3>
          </article>

          <article className={styles.credit}>
            <div className={styles.index}>(3)</div>
            <h3 className={styles.creditTitle}>
              <span className={styles.red}>יועצים חיצוניים:</span> צוות המוזיאון, האוצר הבכיר של מוזיאון ישראל ועומר זיו ואורי סוכר – מעצבי UX בכירים
            </h3>
          </article>
        </div>

        <div className={styles.bottomBar} />
      </section>

      <section className={`${styles.section} ${styles.contextScreen}`} dir="rtl">
        <div className={styles.contextContent}>
          
          <div className={styles.contextHeader}>
            <div className={styles['white-sideLabel']}>קהל היעד והקונטקסט השימוש</div>
          </div>
          
          <h2 className={styles.contextHeading}>
            <span className={styles['white-text']}>אוצרים ואוצרות </span>
            <span>אשל מוזיאון ישראל ומוסדות נוספים.</span>
            <br />
            <span className={styles['white-text']}>אמנים ויוצרים פעילים:</span>
            <br />
            אמנים, בוגרי בתי ספר לאומנות, סטודנטים לאמנות, יוצרים חדשניים, עצמאיים, סטודיואים וכו'.
          </h2>
          <p className={styles.contextParagraph}>
            המוצר ישרת את האוצרים והאוצרות לשימוש תקופתי בעת עבודה על הכנת תערוכות, ואת האמנים ישרת גם לשימוש יומיומי בחיפוש אחר פלטפורמה להצגת העבודות שלהם ולשיתופי פעולה.
          </p>

        </div>
      </section>

    <div className={styles.screenFour}></div>
      <BottomNavBar />
      
    </main>
  );
}
