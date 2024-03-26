import { NavLink } from 'react-router-dom';
import styles from './PageCard.module.css';

type Props = {
    name: string;
    url: string;
};

const PageCard = ({
    name,
    url,
}: Props) => {
    return (
        <NavLink
            className={styles.wrapper}
            to={url}
        >
            {name}
        </NavLink>
    );
};

export default PageCard;
