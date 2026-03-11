import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { 
  X, MapPin, Calendar, Hash, AlignLeft, 
  Navigation, Globe, Info, Clock 
} from 'lucide-react';
import styles from './detailsModal.module.css';
import { usePontoTuristico } from '../../hooks/usePontoTuristico';

export default function DetailsModal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ponto, loading, fetchPontoById } = usePontoTuristico();

  useEffect(() => {
    fetchPontoById(id);
  }, [id, fetchPontoById]);

  if (loading) return (
    <div className={styles.overlay}>
      <div className={styles.loader}></div>
    </div>
  );
  
  if (!ponto) return null;

  return (
    <div className={styles.overlay} onClick={() => navigate('/')}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        <header className={styles.header}>
          <div className={styles.titleWrapper}>
            <div className={styles.iconBadge}>
              <Globe size={20} />
            </div>
            <div>
              <span className={styles.idTag}>#{ponto.id}</span>
              <h2 className={styles.title}>{ponto.nome}</h2>
            </div>
          </div>
          <button onClick={() => navigate('/')} className={styles.closeBtn} aria-label="Fechar">
            <X size={20} />
          </button>
        </header>

        <main className={styles.body}>
          {/* Seção Principal: Descrição */}
          <section className={styles.section}>
            <label className={styles.label}>
              <AlignLeft size={16} /> Descrição Completa
            </label>
            <p className={styles.description}>{ponto.descricao}</p>
          </section>

          <div className={styles.divider} />

          {/* Grid de Informações Geográficas */}
          <div className={styles.infoGrid}>
            <section className={styles.section}>
              <label className={styles.label}>
                <MapPin size={16} /> Cidade / UF
              </label>
              <p className={styles.value}>{ponto.cidade} - {ponto.estado}</p>
            </section>

            <section className={styles.section}>
              <label className={styles.label}>
                <Navigation size={16} /> Logradouro/Endereço
              </label>
              <p className={styles.value}>{ponto.localizacao || "Não informado"}</p>
            </section>
          </div>

          {/* Seção de Referência */}
          <section className={styles.section}>
            <label className={styles.label}>
              <Info size={16} /> Ponto de Referência
            </label>
            <div className={styles.referenceBox}>
              {ponto.referencia || "Nenhuma referência fornecida para este local."}
            </div>
          </section>

          {/* Rodapé Interno com Datas */}
          <footer className={styles.modalFooter}>
            <div className={styles.dateInfo}>
              <Clock size={14} />
              <span>Cadastrado em {new Date(ponto.dataInclusao).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}