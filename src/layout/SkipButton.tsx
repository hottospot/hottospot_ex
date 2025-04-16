import styles from "./SkipButton.module.scss";

type skipButtonProps = {
  isDisable?: boolean;
};

export const SkipButton = ({ isDisable }: skipButtonProps) => {
  return (
    <div className={`${styles.container} ${isDisable && styles.disable}`}>
      <div className={styles.text}>skip</div>
    </div>
  );
};
