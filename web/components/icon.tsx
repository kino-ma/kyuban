import styles from "../styles/icon.module.css";

interface IIconProps {
  name?: string;
  size?: number;
}

export const Icon: React.FC<IIconProps> = ({ name, size = 50 }) => {
  let charcter = "";
  if (!name) {
    charcter = "";
  } else {
    charcter = name[0];
  }

  return (
    <div
      className={styles.icon}
      style={{ height: size, width: size, lineHeight: size + "px" }}
    >
      {charcter}
    </div>
  );
};
