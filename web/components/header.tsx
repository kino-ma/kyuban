import Url from "node:url";
import React from "react";
import Link, { LinkProps } from "next/link";

import styles from "../styles/Home.module.css";
import headerStyle from "../styles/header.module.css";

const HeaderItem: React.FC = (props) => {
  return <span {...props} className={headerStyle.header__item}></span>;
};

const HeaderItemLinking: React.FC<LinkProps & { href: string }> = ({
  href,
  ...props
}) => {
  return (
    <Link href={href}>
      <a {...props} className={headerStyle.header__item}></a>
    </Link>
  );
};

const Header = () => {
  return (
    <React.Fragment>
      <div className={styles.header}>
        <HeaderItemLinking href="/home">けいじばん</HeaderItemLinking>
        <HeaderItemLinking href="/thread/create">
          スレッドを作る
        </HeaderItemLinking>
      </div>
    </React.Fragment>
  );
};

export default Header;
