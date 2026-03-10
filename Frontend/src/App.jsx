import { useState, useEffect, } from 'react'

import './App.css'

import { usePontosTuristicos } from './hooks/usePontosTuristicos';

import { Input } from './components/ui/input/input';
import { Card } from './components/card/card';

import { Search, PlusCircle } from 'lucide-react';

function App() {
    const { pontosTuristicos,
        loading,
        page,
        totalPages,
        error,
        fetchPontosTuristicos,
    } = usePontosTuristicos();

    useEffect(() => {
        // Passa os valores padrão, ex: ordenando por ID decrescente
        fetchPontosTuristicos("", 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchPontosTuristicos]);
    return (
        <div className='main-wrapper'> {/* Substituí body por div */}
            <div className="container">
                <h1 className='title'>Pontos Turísticos</h1>
                <div className="search-area">
                    <div className="search-input-container"> {/* Nova div para controlar o flex */}
                        <Input
                            label="Pesquisar"
                            placeholder="Pesquise por nome, cidade ou estado..."
                            onChange={(e) => fetchPontosTuristicos(e.target.value, 1)}
                        />
                    </div>
                    <button className="add-button"
                    >
                        <PlusCircle size={20} />
                        <span>Adicionar Novo</span>
                    </button>
                </div>

                <div className="grid">
                    {pontosTuristicos.map((ponto) => (
                        <Card key={ponto.id} ponto={ponto} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App;
