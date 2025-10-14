import { useState, useEffect } from 'react';
import '../assets/css/ResultadosEst.css';
import Header from '../components/Header';

function ResultadosEst() {
    const [resultados, setResultados] = useState([]);
    const [ensayos, setEnsayos] = useState([]);
    const [mejor, setMejor] = useState(null);
    const [peor, setPeor] = useState(null);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const fetchResultados = async () => {
            try {
                const res = await fetch('http://localhost:3001/api/resultados/listar');
                if (!res.ok) throw new Error('No se pudieron obtener los resultados');
                const data = await res.json();
                setEnsayos(data);

                
                const materias = {};
                data.forEach(intento => {
                    const materia = intento.materia;
                    if (!materias[materia]) materias[materia] = [];
                    materias[materia].push(intento.puntaje / intento.total * 100);
                });

                const promedios = Object.keys(materias).map(materia => ({
                    asignatura: materia.charAt(0).toUpperCase() + materia.slice(1),
                    promedio: Math.round(
                        materias[materia].reduce((a, b) => a + b, 0) / materias[materia].length
                    )
                }));

                setResultados(promedios);

            } catch (err) {
                console.error(err);
                setError('Error al cargar resultados');
            }
        };

        fetchResultados();
    }, []);

    
    useEffect(() => {
        const evaluadas = resultados.filter(r => r.promedio >= 0);
        if (evaluadas.length > 0) {
            const mejorAsignatura = evaluadas.reduce((a, b) => a.promedio > b.promedio ? a : b);
            const peorAsignatura = evaluadas.reduce((a, b) => a.promedio < b.promedio ? a : b);
            setMejor(mejorAsignatura);
            setPeor(peorAsignatura);
        }
    }, [resultados]);

    return (
        <>
            <Header/>
            <div className="resultados-container">
                <h1>Resumen de Rendimiento</h1>

                {error && <p className="error">{error}</p>}

                <div className="contenido-principal">
                    {/* 📊 Ensayos recientes */}
                    <div className="fondo">
                        <h2>Ensayos recientes</h2>
                        {ensayos.length === 0 ? (
                            <p>No hay ensayos registrados aún.</p>
                        ) : (
                            <ul className="lista-ensayos">
                                {ensayos.slice(-5).reverse().map((e, i) => (
                                    <li key={i} className="ensayo-item">
                                        <div className="ensayo-info">
                                            <strong>{e.materia.charAt(0).toUpperCase() + e.materia.slice(1)}</strong>
                                            <span className="fecha">
                                                {new Date(e.fecha).toLocaleDateString('es-CL')}
                                            </span>
                                        </div>
                                        <div className="puntaje">
                                            <span>{Math.round((e.puntaje / e.total) * 100)}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* 📈 Panel derecho */}
                    <div className="columna-derecha">
                        <div className="resumen-destacado">
                            {mejor && (
                                <div className="resumen tarjeta mejor">
                                    <span className='l3'>Mayor rendimiento</span>
                                    <span className='l4'>{mejor.asignatura}</span>
                                    <span className='l4'>Promedio: {mejor.promedio}</span>
                                </div>
                            )}
                            {peor && (
                                <div className="resumen tarjeta peor">
                                    <span className='l3'>Menor rendimiento</span>
                                    <span className='l4'>{peor.asignatura}</span>
                                    <span className='l4'>Promedio: {peor.promedio}</span>
                                </div>
                            )}
                        </div>
                        
                        <div className='fondo'>
                            <div className="tabla-resultados">
                                <h2>Promedio por asignatura</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Asignatura</th>
                                            <th>Promedio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resultados.length === 0 ? (
                                            <tr><td colSpan="2">Sin evaluaciones</td></tr>
                                        ) : (
                                            resultados.map((r, i) => (
                                                <tr key={i}>
                                                    <td>{r.asignatura}</td>
                                                    <td>{r.promedio}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResultadosEst;
