import { Button } from "../ui/button";
import { ReactNode } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import styles from './DataLoader.module.css';

type QueryProps = Partial<Pick<UseQueryResult, 'isFetching' | 'isError' | 'refetch' | 'failureCount'>>;

type Props = {
    children?: ReactNode;
    skeleton?: ReactNode;
} & QueryProps;

const DataLoader = ({
    children,
    failureCount,
    isError,
    isFetching,
    refetch,
    skeleton,
}: Props) => {
    return (
        <div className={styles.wrapper}>
            {isFetching
                ? (
                    <>
                        {skeleton}

                        <div className={styles.loaderContainer}>
                            {failureCount && failureCount > 0
                                ? "Ponowna próba"
                                : "Pobieranie danych..."
                            }
                        </div>
                    </>
                )
                : (<>
                    {isError
                        ? (
                            <div>
                                Wystapił błąd pobierania danych

                                {refetch && (
                                    <Button onClick={() => refetch()}>
                                        Kliknij aby spróbowac ponownie
                                    </Button>
                                )}
                            </div>
                        )
                        : children
                    }
                </>)
            }
        </div>
    );
};

export default DataLoader;
