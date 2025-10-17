import React from 'react';
import styles from "./Bagde.module.scss";

interface BadgeProps {
    count: number;
}

const Badge: React.FC<BadgeProps> = ({count}) => {
    return (
        <span className={styles.badge}>
            {count}
        </span>
    );
}

export default Badge;
