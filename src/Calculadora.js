import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Calculadora() {
  const [display, setDisplay] = useState("");
  const [historico, setHistorico] = useState([]);

  const handleClick = (valor) => {
    if (valor === "=") {
      try {
        const resultado = eval(display).toString();
        setHistorico([...historico, `${display} = ${resultado}`]);
        setDisplay(resultado);
      } catch {
        setDisplay("Erro");
      }
    } else if (valor === "C") {
      setDisplay("");
    } else {
      const ultimoCaractere = display.slice(-1);
      const operadores = ["+", "-", "*", "/"];
      if (operadores.includes(valor) && operadores.includes(ultimoCaractere)) {
        return;
      }
      setDisplay(display + valor);
    }
  };

  const botoes = [
    "7", "8", "9", "+",
    "4", "5", "6", "-",
    "1", "2", "3", "*",
    "0", ".", "=", "/",
    "C"
  ];

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key;
      if ((/\d/.test(key) || ["+", "-", "*", "/", "."].includes(key))) {
        setDisplay((prev) => prev + key);
      } else if (key === "Enter") {
        handleClick("=");
      } else if (key === "Backspace") {
        setDisplay((prev) => prev.slice(0, -1));
      } else if (key === "Escape") {
        handleClick("C");
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [display]);

  const reutilizarExpressao = (expressaoCompleta) => {
    const [expressao] = expressaoCompleta.split("=");
    setDisplay(expressao.trim());
  };

  return (
    <div className="container mt-5">
      <div className="card bg-dark text-white">
        <div className="card-body">
          <div className="mb-3 p-3 bg-black text-end rounded fs-3">
            {display || "0"}
          </div>
          <div className="row g-2 mb-3">
            {botoes.map((btn, index) => (
              <div key={index} className="col-3">
                <button
                  onClick={() => handleClick(btn)}
                  className="btn btn-secondary w-100"
                >
                  {btn}
                </button>
              </div>
            ))}
          </div>
          <div className="bg-secondary text-white p-2 rounded">
            <strong>Histórico:</strong>
            <ul className="list-unstyled mb-0">
              {historico.slice(-5).reverse().map((item, idx) => (
                <li
                  key={idx}
                  role="button"
                  onClick={() => reutilizarExpressao(item)}
                  className="text-light cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
