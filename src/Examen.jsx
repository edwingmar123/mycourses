import { useEffect, useState } from "react";
import { db } from "./assets/db.js";

function Examen() {
  const preguntas = db.preguntas;
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuación, setPuntuación] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [areDisabled, setAreDisabled] = useState(false);
  const [answersShown, setAnswersShown] = useState(false);

  // Maneja la respuesta del usuario y actualiza el estado
  const handleAnswerSubmit = (isCorrect, e) => {
    if (isCorrect) {
      setPuntuación((prev) => prev + 1);
    }
    e.target.classList.add(isCorrect ? "correct" : "incorrect");

    setTimeout(() => {
      if (preguntaActual === preguntas.length - 1) {
        setIsFinished(true);
      } else {
        nextQuestion();
      }
    }, 1500);
  };

  // Avanza a la siguiente pregunta
  const nextQuestion = () => {
    setPreguntaActual((prev) => prev + 1);
    setTiempoRestante(10);
    setAreDisabled(false);
  };

  // Reinicia el estado del examen
  const resetExam = () => {
    setPreguntaActual(0);
    setPuntuación(0);
    setIsFinished(false);
    setTiempoRestante(10);
    setAreDisabled(false);
    setAnswersShown(false);
  };

  // Temporizador para el tiempo restante
  useEffect(() => {
    const intervalo = setInterval(() => {
      if (tiempoRestante > 0) {
        setTiempoRestante((prev) => prev - 1);
      } else {
        setAreDisabled(true); // Desactiva las opciones cuando el tiempo se acaba
      }
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tiempoRestante]);

  // Componente final del examen
  if (isFinished) {
    return (
      <main className="app">
        <div className="resultado">
          <h2>¡Examen Terminado!</h2>
          <span>
            Obtuviste {puntuación} de {preguntas.length}
          </span>
          <div className="botones">
            <button onClick={resetExam}>Volver a jugar</button>
            <button onClick={() => setAnswersShown(true)}>
              Ver respuestas
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Componente para mostrar respuestas
  if (answersShown) {
    return (
      <main className="app">
        <h2>Respuestas</h2>
        <p>Puntuación: {puntuación || "0"}</p>
        {preguntas.map((pregunta, index) => (
          <div key={index}>
            <h3>{pregunta.titulo}</h3>
            <p>
              Respuesta correcta:{" "}
              {
                pregunta.opciones.find((opcion) => opcion.isCorrect)
                  .textoRespuesta
              }
            </p>
          </div>
        ))}
        <button onClick={resetExam}>Volver a jugar</button>
      </main>
    );
  }

  // Componente de preguntas en progreso
  return (
    <main className="app">
      <p className="dinero">Puntuación: {puntuación || "🪙"}</p>
      <div className="pregunta-actual">
        <div className="numero-pregunta">
          Pregunta {preguntaActual + 1} de {preguntas.length}
        </div>
        <h2>{preguntas[preguntaActual].titulo}</h2>
        <div className="tiempo-restante">
          {!areDisabled ? (
            <span>Tiempo restante: {tiempoRestante} segundos</span>
          ) : (
            <span className="tiempo-agotado">¡Tiempo Agotado!</span>
          )}
        </div>
      </div>
      <div className="opciones">
        {preguntas[preguntaActual].opciones.map((respuesta) => (
          <button
            key={respuesta.textoRespuesta}
            disabled={areDisabled}
            onClick={(e) => handleAnswerSubmit(respuesta.isCorrect, e)}
            className={`opcion ${areDisabled ? "disabled" : ""}`}
          >
            {respuesta.textoRespuesta}
          </button>
        ))}
      </div>
      {areDisabled && <button onClick={nextQuestion}>Continuar</button>}
    </main>
  );
}

export default Examen;
