import * as React from 'react';
import classnames from 'classnames';
const styles = require('./BulletNavigation.module.scss');

interface Props {
    amount: number;
    activeIndex: number;
    onClick: (index: number) => void;
}

export default function BulletNavigation(props: Props) {
    const amount = new Array(props.amount).fill(null);

    return (
        <div className={styles.BulletNavigation}>
            {amount.map((item, index) => {
                const bulletClassName = classnames(styles.bullet, {
                    [styles.active]: props.activeIndex === index,
                })

                return (
                    <button key={index} className={styles.bulletWrapper} onClick={() => props.onClick(index)}>
                        <span className={bulletClassName} />
                    </button>
                );
            })}
        </div>
    );
}
