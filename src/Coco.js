import './Coco.css';
import React, { useEffect, useState } from 'react';

const EditableTitle = ({ initialTitle }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialTitle || 'Click to Edit');
  
    const handleTitleClick = () => {
      setIsEditing(true);
    };
  
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };
  
    const handleTitleBlur = () => {
      setIsEditing(false);
    };
  
    return (
      <div class="editable-title">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
          />
        ) : (
          <h2 onClick={handleTitleClick}>{title}</h2>
        )}
      </div>
    );
  };

const Coco = () => {
    const [backgroundColor, setBackgroundColor] = useState('#ffffbf');
    const [estateCost, setEstateCost] = useState(200000);
    const [renovationCost, setRenovationCost] = useState(0);
    const [downpayment, setDownpayment] = useState(30000);
    const [notaryFees, setNotaryFees] = useState(0);
    const [loan, setLoan] = useState(125000);
    const [loanYears, setLoanYears] = useState(25);
    const [interestRatePercent, setInterestRatePercent] = useState(3);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [costOfLoan, setCostOfLoan] = useState(0);

    const handleColorChange = (color) => {
        setBackgroundColor(color);
    };

    const handleEstateCostChange = (e) => {
        const value = parseFloat(e.target.value);
        setEstateCost(isNaN(value) ? 0 : value);
    };

    const handleRenovationCostChange = (e) => {
        const value = parseFloat(e.target.value);
        setRenovationCost(isNaN(value) ? 0 : value);        
    };

    const handleDownpaymentChange = (e) => {
        const value = parseFloat(e.target.value);
        setDownpayment(isNaN(value) ? 0 : value);
    };

    const handleLoanYearsChange = (e) => {
        const value = parseFloat(e.target.value);
        setLoanYears(isNaN(value) ? 0 : value);
    };

    const handleInterestRatePercent = (e) => {
        const value = parseFloat(e.target.value);
        setInterestRatePercent(isNaN(value) ? 0 : value);
    };

    // Calculate sum whenever numbers change
    useEffect(() => {
        // = LOAN * INTEREST_RATE / 12 / (1 - POW(1 + INTEREST_RATE / 12, -12 * NUM_YEARS))
        // TODO: make notary fee rate a parameter.
        setNotaryFees(estateCost * 0.07);
        setLoan(estateCost + renovationCost + notaryFees - downpayment);
        let interestRate = interestRatePercent / 100;
        let monthlyPayment = loan * (interestRate / 12) / (1 - Math.pow(1 + (interestRate / 12), -12 * loanYears));
        setMonthlyPayment(monthlyPayment);
        setCostOfLoan(monthlyPayment * 12 * loanYears - loan);
    }, [estateCost, renovationCost, downpayment, notaryFees, loan, loanYears, interestRatePercent]);

    return (
        <div class="Coco" style={{ backgroundColor }}>
            <div className="color-button-container">
                <button onClick={() => handleColorChange('#ffb1b0')} className="red-button"></button>
                <button onClick={() => handleColorChange('#ffdfbe')} className="orange-button"></button>
                <button onClick={() => handleColorChange('#ffffbf')} className="yellow-button"></button>
                <button onClick={() => handleColorChange('#c7ffbd')} className="green-button"></button>
                <button onClick={() => handleColorChange('#a9d1ff')} className="blue-button"></button>
            </div>
            <EditableTitle initialTitle="Mon bien" />
            <table>
                <tr>
                    <td colSpan={2} class="section">Basiques</td>
                </tr>
                <tr>
                    <td class="label"><label htmlFor="estate-cost">Prix du bien:</label></td>
                    <td class="value">
                        <input
                            type="number"
                            id="estate-cost"
                            value={estateCost}
                            onChange={handleEstateCostChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td class="label"><label htmlFor="renovation-cost">Coût des travaux:</label></td>
                    <td class="value">
                        <input
                            type="number"
                            id="renovation-cost"
                            value={renovationCost}
                            onChange={handleRenovationCostChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td class="label"><label htmlFor="downpayment">Apport:</label></td>
                    <td class="value">
                        <input
                            type="number"
                            id="downpayment"
                            value={downpayment}
                            onChange={handleDownpaymentChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} class="section">Le coût du pret:</td>
                </tr>
                <tr>
                    <td class="label"><label>Frais notaire:</label></td>
                    <td class="value">{notaryFees.toFixed(2)}€</td>
                </tr>
                <tr>
                    <td class="label"><label>Le prêt:</label></td>
                    <td class="value">{loan.toFixed(2)}€</td>
                </tr>
                <tr>
                    <td colSpan={2} class="section">Options du pret</td>
                </tr>
                <tr>
                    <td class="label"><label htmlFor="loan-years">Nombre d'années:</label></td>
                    <td class="value"><input
                        type="number"
                        id="loan-years"
                        value={loanYears}
                        onChange={handleLoanYearsChange}
                    /></td>
                </tr>
                <tr>
                    <td class="label"><label htmlFor="interest-rate">Taux d'interet:</label></td>
                    <td class="value"><input
                        type="number"
                        id="interest-rate"
                        value={interestRatePercent}
                        onChange={handleInterestRatePercent}
                    /></td>
                </tr>
                <tr>
                    <td colSpan={2} class="section">La vérité</td>
                </tr>
                <tr>
                    <td class="label"><label>Coup du prêt:</label></td>
                    <td class="value">{costOfLoan.toFixed(2)}€</td>
                </tr>
                <tr>
                    <td class="label"><label>Mensualités:</label></td>
                    <td class="value">{monthlyPayment.toFixed(2)}€</td>
                </tr>
            </table>
        </div>
    );
};

export default Coco;