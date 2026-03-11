import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import styles from "./pagination.module.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className={styles.container}>

            <span className={styles.info}>
                Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
            </span>

            <div className={styles.controls}>
          
                <button
                    className={styles.button}
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    title="Primeira Página"
                >
                    <ChevronsLeft size={20} />
                </button>

                <button
                    className={styles.button}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    title="Página Anterior"
                >
                    <ChevronLeft size={20} />
                </button>

                <button
                    className={styles.button}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    title="Próxima Página"
                >
                    <ChevronRight size={20} />
                </button>

                <button
                    className={styles.button}
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage >= totalPages}
                    title="Última Página"
                >
                    <ChevronsRight size={20} />
                </button>

            </div>
        </div>
    );
}