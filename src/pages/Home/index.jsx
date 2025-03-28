import { useState } from "react";
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

function Calculator() {
  const modeloParcela = {
    "tabelaLabel": "tab01",
    "data": [
      { "type": "Debito", "VisaMaster": 0.9887, "ELO": 0.9851, "numParcela": 1 },
      { "type": "Cred a vista", "VisaMaster": 0.9689, "ELO": 0.9661, "numParcela": 1 },
      { "type": "2x", "VisaMaster": 0.9571, "ELO": 0.9521, "numParcela": 2 },
      { "type": "3x", "VisaMaster": 0.9488, "ELO": 0.9438, "numParcela": 3 },
      { "type": "4x", "VisaMaster": 0.9405, "ELO": 0.9355, "numParcela": 4 },
      { "type": "5x", "VisaMaster": 0.9322, "ELO": 0.9272, "numParcela": 5 },
      { "type": "6x", "VisaMaster": 0.9239, "ELO": 0.9189, "numParcela": 6 },
      { "type": "7x", "VisaMaster": 0.9156, "ELO": 0.9089, "numParcela": 7 },
      { "type": "8x", "VisaMaster": 0.9037, "ELO": 0.9006, "numParcela": 8 },
      { "type": "9x", "VisaMaster": 0.8954, "ELO": 0.8923, "numParcela": 9 },
      { "type": "10x", "VisaMaster": 0.8871, "ELO": 0.884, "numParcela": 10 },
      { "type": "11x", "VisaMaster": 0.8788, "ELO": 0.8757, "numParcela": 11 },
      { "type": "12x", "VisaMaster": 0.8705, "ELO": 0.8674, "numParcela": 12 },
      { "type": "13x", "VisaMaster": 0.8589, "ELO": 0.8568, "numParcela": 13 },
      { "type": "14x", "VisaMaster": 0.8506, "ELO": 0.8485, "numParcela": 14 },
      { "type": "15x", "VisaMaster": 0.8423, "ELO": 0.8402, "numParcela": 15 },
      { "type": "16x", "VisaMaster": 0.834, "ELO": 0.8319, "numParcela": 16 },
      { "type": "17x", "VisaMaster": 0.8257, "ELO": 0.8236, "numParcela": 17 },
      { "type": "18x", "VisaMaster": 0.8174, "ELO": 0.8153, "numParcela": 18 }
    ]
  };

  const [valorReceber, setValorReceber] = useState('');
  const [bandeira, setBandeira] = useState('VisaMaster');
  const [calculatedData, setCalculatedData] = useState([]);  // Store calculated data

  const handleInputChange = (event) => {
    setValorReceber(event.target.value);
  };

  const handleBandeiraChange = (newBandeira) => {
    setBandeira(newBandeira);
  };

  const handleCalculate = () => {
    const valorReceberNumerico = parseFloat(valorReceber);
    if (!isNaN(valorReceberNumerico)) {
      const updatedData = modeloParcela.data.map((modelo) => {
        const porcentagem = modelo[bandeira];
        const valorTotal = valorReceberNumerico / porcentagem;
        const valorParcela = (valorTotal / modelo.numParcela).toFixed(2);  // Calculating installment
        return { ...modelo, valorTotal: valorTotal.toFixed(2), valorParcela };
      });

      setCalculatedData(updatedData);  // Update the state with the calculated data
    }
  };

  return (
    <div className="container">
      <form>
        <h1 className="text-primary">PLANO TAB01</h1>
        <h2>Cálculo de Parcelas</h2>

        <div className="button-upper">
          <button 
            type="button" 
            className={`button-card ${bandeira === 'VisaMaster' ? 'active' : ''}`} 
            onClick={() => handleBandeiraChange('VisaMaster')}
          >
            Visa/MasterCard
          </button>
          <button 
            type="button" 
            className={`button-card ${bandeira === 'ELO' ? 'active' : ''}`} 
            onClick={() => handleBandeiraChange('ELO')}
          >
            ELO
          </button>
        </div>

        <div className="button-down">
          <input
            placeholder="Valor a Receber"
            name="valorReceber"
            value={valorReceber}
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleCalculate}>
            Calcular
          </button>
        </div>
      </form>

      <table className="table table-bordered mt-4">
        <thead className="table-primary">
          <tr>
            <th>Descrição</th>
            <th>Valor Total</th>
            <th>Valor Parcela</th>
          </tr>
        </thead>
        <tbody>
          {calculatedData.map((modelo, index) => (
            <tr key={index}>
              <td>{modelo.type}</td>
              <td>R$ {modelo.valorTotal}</td>
              <td>R$ {modelo.valorParcela}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer style={{ marginTop: '20px', textAlign: 'center', padding: '10px', backgroundColor: '#f8f9fa', borderTop: '1px solid #ddd' }}>
        <p>&copy; 2025 Leandro Sena Zuza</p>
      </footer>
    </div>
  );
}

export default Calculator;
