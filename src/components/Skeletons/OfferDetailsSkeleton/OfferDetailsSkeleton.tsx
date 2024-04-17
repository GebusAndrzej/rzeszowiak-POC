import { Skeleton } from "@/components/ui/skeleton";
import styles from './OfferDetailsSkeleton.module.css';

const OfferDetailsSkeleton = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.row}>
                <Skeleton className="h-[400px] w-1/2 rounded-xl" />
                <Skeleton className="h-[400px] w-1/2 rounded-xl" />
            </div>

            <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
    );
};

export default OfferDetailsSkeleton;
