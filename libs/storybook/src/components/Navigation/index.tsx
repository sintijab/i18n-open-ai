import React from "react";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";

interface Items {
  label: string;
  href: string;
}

export const NavigationBar = ({
  items = [],
  i18next = false,
}: {
  items: Items[];
  i18next?: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <nav className={styles.nav}>
      {items?.map((item, i) => (
        <a className={styles.nav_item} href={item.href} key={`nav-item-${i}`}>
          {i18next ? t(item.label) : item.label}
        </a>
      ))}
    </nav>
  );
};
