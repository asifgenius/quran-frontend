import styles from "./styles.module.css";

export function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className={styles.column}>
      <p className={`${styles.columnTitle} font-semibold text-stone-900`}>
        {title}
      </p>
      <div className={`${styles.columnLinks} text-stone-500`}>
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}
