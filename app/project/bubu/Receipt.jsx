import styles from "./receipt.module.css"

/*
 * The product's daily receipt, drawn rather than exported.
 *
 * The screen it comes from is a thermal receipt: mono type, dashed rules,
 * a barcode, and the meal photos cut out and printed straight onto the
 * paper. All of that is type and borders, so building it in CSS keeps it
 * sharp at any width and lets the two receipts sit side by side on a
 * phone - which a flat export of the screen could not do.
 */
export function Receipt({ player, date, no, meals, exercise, progress, items, streak, missed, sealed = true }) {
  return (
    <figure className={styles.receipt} data-player={player.toLowerCase()}>
      <header className={styles.head}>
        <p className={styles.brand}>DIET MATCH</p>
        <p className={styles.sub}>DAILY RECEIPT</p>
      </header>

      <dl className={styles.facts}>
        <div><dt>DATE</dt><dd>{date}</dd></div>
        <div><dt>NO.</dt><dd>{no}</dd></div>
        <div><dt>PLAYER</dt><dd>{player}</dd></div>
      </dl>

      <div className={styles.meals}>
        {meals.map((meal) => (
          <div className={styles.meal} key={meal.slot}>
            <p className={styles.mealHead}><span>{meal.slot}</span><span>{meal.time}</span></p>
            {meal.image
              ? <img className={styles.mealImage} src={meal.image} alt="" width="320" height="240" loading="lazy" decoding="async" />
              : <span className={styles.mealBlank} aria-hidden="true" />}
            <p className={styles.mealName}>&mdash; {meal.name}</p>
          </div>
        ))}
      </div>

      <dl className={styles.facts}>
        <div><dt>EXERCISE</dt><dd>{exercise}</dd></div>
        <div><dt>PROGRESS</dt><dd>{progress}</dd></div>
      </dl>

      <dl className={styles.totals}>
        <div><dt>ITEMS</dt><dd>{items}</dd></div>
        <div><dt>STREAK</dt><dd>{streak}</dd></div>
        <div><dt>MISSED</dt><dd>{missed}</dd></div>
      </dl>

      {/* Decorative: the printed barcode, drawn as stripes. */}
      <span className={styles.barcode} aria-hidden="true" />
      <figcaption className={styles.foot}>
        {sealed ? "THANK YOU FOR SHOWING UP" : "AUTO-SEAL AT 23:59"}
      </figcaption>
    </figure>
  )
}
