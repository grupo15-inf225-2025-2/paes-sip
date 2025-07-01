import { useState, useEffect } from 'react';
import '../assets/css/ResultadosEst.css';
import Header from '../components/Header';

function ResultadosEst() {
    const [resultados, setResultados] = useState([
        { asignatura: 'Matemáticas', promedio: 85 },
        { asignatura: 'Lenguaje', promedio: 54 },
        { asignatura: 'Ciencias', promedio: 70 },
        { asignatura: 'Historia', promedio: -1 }
    ])

    const [ensayos, setEnsayos] = useState([
        { titulo: 'Matemáticas', fecha: '2024-04-01', resultado: 80 },
        { titulo: 'Lenguaje', fecha: '2024-03-21', resultado: 60  },
        { titulo: 'Ciencias', fecha: '2024-03-10', resultado: 70 }
    ])

    const [mejor, setMejor] = useState(null)
    const [peor, setPeor] = useState(null)

    useEffect(() => {
        const evaluadas = resultados.filter(r => r.promedio !== -1)
        if (evaluadas.length > 0) {
            const mejorAsignatura = evaluadas.reduce((a, b) => a.promedio > b.promedio ? a : b)
            const peorAsignatura = evaluadas.reduce((a, b) => a.promedio < b.promedio ? a : b)
            setMejor(mejorAsignatura)
            setPeor(peorAsignatura)
        }
    }, [resultados])

    return (
    <>

    <div className="resultados-container">
        <h1>Resumen de Rendimiento</h1>

        <div className="contenido-principal">
            <div className="fondo">
                <h2>Ensayos recientes</h2>
                <ul className="lista-ensayos">
                    {ensayos.map((e, i) => (
                    <li key={i} className="ensayo-item">
                    <div className="ensayo-info">
                        <strong>{e.titulo}</strong>
                        <span className="fecha">{e.fecha}</span>
                    </div>
                    <div className="puntaje">
                        <span>{e.resultado}</span>
                    </div>
                    </li>
                ))}
                </ul>
            </div>

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
                            {resultados.map((r, i) => (
                            <tr key={i}>
                                <td>{r.asignatura}</td>
                                <td>
                                {r.promedio >= 0
                                    ? `${r.promedio}`
                                    : <span className="sin-eval">Sin evaluaciones</span>}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
      </div>
    </div>
    </>
    )
}

export default ResultadosEst