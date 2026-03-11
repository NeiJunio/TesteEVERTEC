import { useEffect, useState } from 'react';

import { useEstados } from '../../hooks/useEstados';
import { useCidades } from '../../hooks/useCidades';

import { Save, X, MapPin, AlignLeft, Type, Info, Home } from 'lucide-react';

import styles from './PontoTuristicoForm.module.css';

export default function PontoTuristicoForm({ initialData, onSubmit, onCancel, isEditing }) {

    const { estados, fetchEstados } = useEstados();
    const { cidades, loadingCidades, fetchCidades } = useCidades();

    const [formData, setFormData] = useState(() => {
        const regex = /^(?<tipo>\w+)\s+(?<nome>[^,]+),\s*Nº\s*(?<numero>.*)/i;
        const match = initialData?.localizacao?.match(regex);

        return {
            nome: initialData?.nome || '',
            descricao: initialData?.descricao || '',
            tipoLogradouro: match?.groups.tipo || 'Rua',
            logradouro: match?.groups.nome || '',
            numero: match?.groups.numero || '',
            cidade: initialData?.cidade || '',
            estado: initialData?.estado || '',
            referencia: initialData?.referencia || ''
        };
    });

    useEffect(() => {
        fetchEstados();
    }, [fetchEstados]);

    useEffect(() => {
        if (formData.estado) {
            fetchCidades(formData.estado);
        }
    }, [formData.estado, fetchCidades]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const localizacaoFinal = `${formData.tipoLogradouro} ${formData.logradouro}, Nº ${formData.numero}`;
        const payload = { ...formData, localizacao: localizacaoFinal };

        delete payload.tipoLogradouro;
        delete payload.logradouro;
        delete payload.numero;

        onSubmit(payload);
    };

    console.log("Estados disponíveis   ww:", estados); // Log para verificar os estados carregados

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <header className={styles.header}>
                <div className={styles.headerTitle}>
                    <div className={styles.iconCircle}>
                        <MapPin size={20} />
                    </div>
                    <h2>{isEditing ? 'Editar Ponto Turístico' : 'Novo Registro'}</h2>
                </div>
                <button type="button" onClick={onCancel} className={styles.closeBtn} aria-label="Fechar">
                    <X size={20} />
                </button>
            </header>

            <div className={styles.body}>
                <div className={styles.inputGroup}>
                    <label><Type size={14} /> Nome do Local</label>
                    <input name="nome" value={formData.nome} onChange={handleChange} required placeholder="Ex: Cristo Redentor" />
                </div>

                <div className={styles.inputGroup}>
                    <label><AlignLeft size={14} /> Descrição</label>
                    <textarea name="descricao" value={formData.descricao} onChange={handleChange} required rows="3" maxLength={100} placeholder="Conte um pouco sobre este lugar..." />
                </div>

                <div className={styles.addressGrid}>
                    <div className={styles.inputGroup}>
                        <label><Home size={14} /> Endereço</label>
                        <div className={styles.inlineRow}>
                            <select name="tipoLogradouro" value={formData.tipoLogradouro} onChange={handleChange} className={styles.selectType}>
                                <option value="">Selecione...</option>
                                <option value="Rua">Rua</option>
                                <option value="Avenida">Avenida</option>
                                <option value="Praça">Praça</option>
                                <option value="Rodovia">Rodovia</option>
                            </select>
                            <input name="logradouro" value={formData.logradouro} onChange={handleChange} required placeholder="Nome da via" className={styles.inputStreet} />
                        </div>
                    </div>
                </div>

                <div className={styles.locationGrid}>
                    <div className={styles.inputGroup}>
                        <label>Número</label>
                        <input name="numero" value={formData.numero} onChange={handleChange} required placeholder="Nº" className={styles.inputNumberField} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Estado (UF)</label>
                        <select
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                            required
                            className={styles.selectField}
                        >
                            <option value="">Selecione...</option>
                            {estados.map((est) => (
                                <option key={est.id} value={est.sigla}>
                                    {est.sigla}
                                </option>
                            ))}
                        </select>
                        {/* <input name="estado" value={formData.estado} onChange={handleChange} maxLength="2" required placeholder="SP" className={styles.upperCase} /> */}
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Cidade</label>
                        <select
                            name="cidade"
                            value={formData.cidade}
                            onChange={handleChange}
                            required
                            disabled={!formData.estado || loadingCidades}
                            className={styles.selectField}
                        >
                            <option value="">{loadingCidades ? 'Carregando...' : 'Selecione'}</option>
                            {cidades.map(cid => (
                                <option key={cid.id} value={cid.nome}>{cid.nome}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label><Info size={14} /> Referência</label>
                    <input name="referencia" value={formData.referencia} onChange={handleChange} placeholder="Ex: Próximo ao metrô" />
                </div>
            </div>

            <footer className={styles.footer}>
                <button type="button" onClick={onCancel} className={styles.cancelBtn}>Cancelar</button>
                <button type="submit" className={styles.saveBtn}>
                    <Save size={18} /> {isEditing ? 'Atualizar Dados' : 'Criar Registro'}
                </button>
            </footer>
        </form>
    );
}