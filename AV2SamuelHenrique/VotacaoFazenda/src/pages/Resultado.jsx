import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  obterVotos,
  calcularTotalVotos,
  calcularResultado,
  zerarVotos,
} from '../services/votacaoService';

function Resultado() {
  const [votos, setVotos] = useState(() => obterVotos());

  const total = calcularTotalVotos(votos);
  const resultado = calcularResultado(votos);

  function handleZerar() {
    if (window.confirm('Apagar todos os votos?')) {
      zerarVotos();
      setVotos({});
    }
  }

  return (
    <main className="pagina">
      <section className="pagina-topo">
        <h1>Parcial da eliminação</h1>
        <p className="total-votos">
          <strong>{total}</strong> {total === 1 ? 'voto computado' : 'votos computados'}
        </p>
      </section>

      {total === 0 ? (
        <div className="sem-votos">
          <p>Nenhum voto ainda. Escolha quem sai da roça para ver a parcial.</p>
          <Link to="/votacao" className="botao botao-principal">Ir para a votação</Link>
        </div>
      ) : (
        <>
          <ol className="placar">
            {resultado.map((p, index) => (
              <li key={p.id} className={index === 0 ? 'placar-item placar-lider' : 'placar-item'}>
                <img src={p.foto} alt={p.nome} className="placar-foto" />
                <div className="placar-info">
                  <h2>
                    {p.nome}
                    {index === 0 && <span className="selo-lider">Sairia hoje</span>}
                  </h2>
                  <div className="barra">
                    <div
                      className="barra-preenchida"
                      style={{ width: `${p.percentual}%` }}
                    />
                  </div>
                  <p className="placar-numeros">
                    {p.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}% ({p.votos}{' '}
                    {p.votos === 1 ? 'voto' : 'votos'})
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <button type="button" className="botao botao-zerar" onClick={handleZerar}>
            Zerar votação
          </button>
        </>
      )}
    </main>
  );
}

export default Resultado;
