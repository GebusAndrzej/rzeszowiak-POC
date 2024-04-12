import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    Pagination as PaginationUI,
} from '@/components/ui/pagination';
import { useMemo } from 'react';

type Props = {
    currentPage: number;
    pages: number;
    onPageChange?: (newPageNo: number) => void;
    linkGenerator?: (number: string) => string;
    className?: string;
};

const Pagination = ({
    className,
    currentPage,
    linkGenerator,
    onPageChange,
    pages,
}: Props) => {
    const numbers = useMemo(
        () => Array.from({ length: pages }, (_, i) => i + 1)
            .map(number => ({
                href: linkGenerator?.(`${number}`),
                number,
            })),
        [
            linkGenerator,
            pages,
        ],
    );

    const visiblePages = useMemo(
        () => new Set([
            1,
            pages,
            currentPage,
            currentPage - 1,
            currentPage + 1,
        ]),
        [
            currentPage,
            pages,
        ],
    );

    const ellipsis = useMemo(
        () => new Set([
            currentPage - 2,
            currentPage + 2,
        ]),
        [ currentPage ],
    );

    return (
        <div className={className}>
            <PaginationUI>
                <PaginationContent>
                    {currentPage !== 1 && (
                        <PaginationItem>
                            <PaginationPrevious
                                href={currentPage === 1
                                    ? numbers[0].href
                                    : numbers[currentPage - 2].href
                                }
                                onClick={() => currentPage === 1
                                    ? onPageChange?.(1)
                                    : onPageChange?.(currentPage - 1)
                                }
                            />
                        </PaginationItem>
                    )}

                    {numbers.map(({
                        href,
                        number,
                    }) => (
                        visiblePages.has(number)
                            ? (
                                <PaginationItem key={number}>
                                    <PaginationLink
                                        href={href}
                                        isActive={number === currentPage}
                                        onClick={() => onPageChange?.(number)}
                                    >
                                        {number}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                            : ellipsis.has(number) && (
                                <PaginationItem key={number}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )
                    ))}

                    {currentPage !== pages && (
                        <PaginationItem>
                            <PaginationNext
                                href={currentPage < pages
                                    ? numbers[currentPage].href
                                    : numbers[pages - 1].href
                                }
                                onClick={() => currentPage < pages
                                    ? onPageChange?.(currentPage + 1)
                                    : onPageChange?.(currentPage)
                                }
                            />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </PaginationUI>
        </div>
    );
};

export default Pagination;
