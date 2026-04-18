import styles from "./styles.module.css";
import { FooterColumn } from "./column";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className={`page-shell grid py-10 ${styles.footerShell}`}>
        <div className={styles.brand}>
          <p className={`${styles.brandTitle} font-serif font-bold text-stone-900`}>
            Quran
          </p>
          <p className={`${styles.brandTagline} font-semibold text-stone-900`}>
            Read, Listen, Search, and Reflect on the Quran
          </p>
          <p className={`${styles.brandCopy} text-stone-500`}>
            Quran is a trusted platform used by millions worldwide to read,
            search, listen to, and reflect on the Quran in multiple languages.
          </p>
        </div>
        <FooterColumn
          title="Navigate"
          items={["Home", "Quran Radio", "Reciters", "About Us"]}
        />
        <FooterColumn
          title="Our Projects"
          items={["Quran", "Quran iOS", "Quran Android", "QuranReflect"]}
        />
        <FooterColumn
          title="Popular Links"
          items={["Ayatul Kursi", "Yaseen", "Al Mulk", "Al Kahf"]}
        />
      </div>
    </footer>
  );
}
