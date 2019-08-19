import React from 'react';
import styles from './ProfilePicture.scss';

function getImage(props) {
    return <img onClick={props.onTouchTap} className={styles.profilePic} alt="" src="http://coolspotters.com/files/photos/12377/guy-berryman-profile.jpg" />;
}

export default function ProfilePic(props) {
    if (props.className) {
        return (
            <span className={props.className}>
                {/* {getImage(props)}  */}
            </span>
        );
    }

    return getImage(props);
}
