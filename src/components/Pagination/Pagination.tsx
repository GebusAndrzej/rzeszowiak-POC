import { useMemo } from 'react'
import { Pagination as PaginationUI, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

type Props = {
    currentPage: number;
    pages: number;
    onPageChange?: (newPageNo: number) => void;
    linkGenerator?: (number: string) => string;
    className?: string;
}

const Pagination = ({
    currentPage,
    pages,
    onPageChange,
    linkGenerator,
    className,
}: Props) => {
    const numbers = useMemo(
        () => Array.from({length: pages}, (_, i) => i + 1)
            .map(number => ({
                number,
                href: linkGenerator?.(`${number}`),
            })),
        [pages]
    )

    const visiblePages = useMemo(
        () => new Set([
            1,
            pages,
            currentPage,
            currentPage - 1,
            currentPage + 1
        ]),
        [currentPage, pages]
    )

    const ellipsis = useMemo(
        () => new Set([
            currentPage - 2,
            currentPage + 2
        ]),
        [currentPage]
    )

  return (
    <div className={className}>
        <PaginationUI>
            <PaginationContent>
                {currentPage !== 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => currentPage === 1
                                ? onPageChange?.(1)
                                : onPageChange?.(currentPage - 1)
                            }
                            href={currentPage === 1
                                ? numbers[0].href
                                : numbers[currentPage - 2].href
                            }
                            />
                    </PaginationItem>
                )}

                {numbers.map(({number, href}) => (
                    visiblePages.has(number) 
                        ? (
                            <PaginationItem key={number}>
                                <PaginationLink 
                                    isActive={number === currentPage}
                                    href={href}
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
                            onClick={() => currentPage < pages
                                ? onPageChange?.(currentPage + 1)
                                : onPageChange?.(currentPage)
                            }
                            href={currentPage < pages
                                ? numbers[currentPage].href
                                : numbers[pages - 1].href
                            }
                            />
                    </PaginationItem>
                )}
            </PaginationContent>
        </PaginationUI>
    </div>
  )
}

export default Pagination