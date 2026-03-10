import styles from './input.module.css';

export const Input = ({ label, ...props }) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input 
        className={styles.inputField} 
        {...props} 
      />
    </div>
  );
};