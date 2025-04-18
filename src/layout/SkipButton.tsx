import styles from "./SkipButton.module.scss";

type skipButtonProps = {
  isDisable?: boolean;
  onClick?: () => void;
};

export const SkipButton = ({ isDisable, onClick }: skipButtonProps) => {
  return (
    <div
      className={`${styles.container} ${isDisable && styles.disable}`}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <div className={styles.text}>skip</div>
    </div>
  );
};
