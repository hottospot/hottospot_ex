import Img from '../../../public/img/error.svg';
import styles from './errorPage.module.scss';

const ErrorPage = ({ error, message }) => {
  const isNumber = typeof error === 'number';
  return (
    <div className={styles.container}>
      <img src={Img} alt="error" className={styles.erroricon} />
      <p className={isNumber ? styles.errornumber : styles.errortext}>
        {error || null}
      </p>
      <p className={styles.message}>{message || null}</p>
    </div>
  );
};
export default ErrorPage;
