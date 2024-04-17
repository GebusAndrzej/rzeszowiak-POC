import { Skeleton } from "@/components/ui/skeleton";
import styles from './ListViewSkeleton.module.css';

const ListViewSkeleton = () => {
    return (
        <div className={styles.wrapper}>
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <Skeleton className="h-[200px] w-full rounded-xl" />
        </div>
    );
};

export default ListViewSkeleton;
