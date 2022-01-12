import Link from "next/link";
import { UserData } from "../common/types";

import styles from "../styles/icon.module.css";

interface IIconProps {
  user: UserData;
  size?: number;
}

export const Icon: React.FC<IIconProps> = ({ user, size = 50 }) => {
  const charcter = user.name[0];

  return (
    <Link href={`/user/${user.id}`}>
      <div
        className={styles.icon}
        style={{
          height: size,
          width: size,
          fontSize: size / 2 + "px",
          lineHeight: size + "px",
        }}
      >
        {charcter}
      </div>
    </Link>
  );
};
