export const questionBanks = {
        matematicas: [
            {
                formula: '0,25+0,355-1,2+3,123-0,315',
                options: [
                    { key: 'a', text: '2,213' },
                    { key: 'b', text: '2,843' },
                    { key: 'c', text: '3,728' },
                    { key: 'd', text: '4,530' },
                    { key: 'skip', text: 'Omitida' }
                ],
                correctAnswer: 'a', // 2,213
                score: 1
            },
            {
                formula: '\\frac{2}{3} + \\frac{1}{4}',
                options: [
                    { key: 'a', text: '\\frac{11}{12}' },
                    { key: 'b', text: '\\frac{3}{7}' },
                    { key: 'c', text: '\\frac{5}{6}' },
                    { key: 'd', text: '\\frac{7}{8}' },
                    { key: 'skip', text: 'Omitida' }
                ],
                correctAnswer: 'a', // 11/12
                score: 1
            },
            {
                formula: '2x + 5 = 13',
                question: 'Encuentra el valor de x en la ecuación:',
                options: [
                    { key: 'a', text: 'x = 3' },
                    { key: 'b', text: 'x = 4' },
                    { key: 'c', text: 'x = 5' },
                    { key: 'd', text: 'x = 6' },
                    { key: 'skip', text: 'Omitida' }
                ],
                correctAnswer: 'b', // x = 4
                score: 1
            }
        ],
        lenguaje: [
            {
                question: '¿Cuál es el sujeto en la oración "Los estudiantes prepararon sus ensayos"?',
                options: [
                    { key: 'a', text: 'Los estudiantes' },
                    { key: 'b', text: 'prepararon' },
                    { key: 'c', text: 'sus ensayos' },
                    { key: 'd', text: 'estudiantes' },
                    { key: 'skip', text: 'Omitida' }
                ],
                correctAnswer: 'a', // Los estudiantes
                score: 1
            },
            {
                question: 'Identifica la figura literaria en: "Sus ojos eran dos luceros"',
                options: [
                    { key: 'a', text: 'Metáfora' },
                    { key: 'b', text: 'Símil' },
                    { key: 'c', text: 'Hipérbole' },
                    { key: 'd', text: 'Personificación' },
                    { key: 'skip', text: 'Omitida' }
                ],
                correctAnswer: 'a', // Metáfora
                score: 1
            },
            {
                question: '¿Cuál es la función de la coma en "María, ven acá"?',
                options: [
                    { key: 'a', text: 'Separar elementos de una serie' },
                    { key: 'b', text: 'Indicar vocativo' },
                    { key: 'c', text: 'Separar oraciones' },
                    { key: 'd', text: 'Indicar pausa larga' },
                    { key: 'skip', text: 'Omitida' }
                ],
                correctAnswer: 'b', // Indicar vocativo
                score: 1
            }
        ],
        ciencias: [
            {
                question: '¿Cuál es la fórmula química del agua?',
                options: [
                    { key: 'a', text: 'H₂O' },
                    { key: 'b', text: 'CO₂' },
                    { key: 'c', text: 'NaCl' },
                    { key: 'd', text: 'O₂' },
                    { key: 'skip', text: 'Omitida' }
                ],
                correctAnswer: 'a', // H₂O
                score: 1
            },
            {
                question: '¿Qué organelo celular es responsable de la respiración celular?',
                options: [
                    { key: 'a', text: 'Núcleo' },
                    { key: 'b', text: 'Mitocondria' },
                    { key: 'c', text: 'Cloroplasto' },
                    { key: 'd', text: 'Ribosoma' },
                    { key: 'skip', text: 'Omitida' }
                ],
                correctAnswer: 'b', // Mitocondria
                score: 1
            },
            {
                question: '¿Cuál es la velocidad de la luz en el vacío?',
                options: [
                    { key: 'a', text: '300.000 km/s' },
                    { key: 'b', text: '150.000 km/s' },
                    { key: 'c', text: '450.000 km/s' },
                    { key: 'd', text: '200.000 km/s' },
                    { key: 'skip', text: 'Omitida' }
                ],
                correctAnswer: 'a', // 300.000 km/s
                score: 1
            }
        ]
};