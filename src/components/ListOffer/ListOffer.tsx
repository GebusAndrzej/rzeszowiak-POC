import { NavLink } from 'react-router-dom';
import styles from './ListOffer.module.css';

export type TListOffer = {
    imageUrl?: string;
    title: string;
    description: string;
    localUrl: string;
    meta: {
        price?: string;
        place?: string;
        phone?: string;
        originalUrl: string;
        date?: string;
    };
};

const ListOffer = ({
    description,
    imageUrl,
    localUrl,
    meta,
    title,
}: TListOffer) => {
    return (
        <div className={styles.wrapper}>
            <figure className={styles.imageWrapper}>
                <img src={imageUrl} />
            </figure>

            <div className={styles.offerContent}>
                <NavLink to={localUrl}>
                    <h2 className={styles.title}>
                        {title}
                    </h2>
                </NavLink>

                <div className={styles.date}>
                Dodano: {meta.date}
                </div>

                <div className={styles.description}>
                    {description}
                </div>

                <div className={styles.meta}>
                    <span className={styles.price}>
                        {meta.price}
                    </span>

                    <span>
                        {meta.place}
                    </span>

                    <span>
                        {meta.phone}
                    </span>

                    <a
                        href={meta.originalUrl}
                        rel="noreferrer"
                        target="_blank"
                    >
                    Zobacz na oficjalnej stronie
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ListOffer;
