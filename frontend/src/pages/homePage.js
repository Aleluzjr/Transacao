import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import Navbar from '../components/navBar'
import api from '../api'

const HomePage = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        api.get('/transactions').then(response => {
            setTransactions(response.data.transactions);
        });
    }, []);
//api.post('/transactions',
    const generatePDF = () => {
        const doc = new jsPDF();
        let y = 10;
        transactions.forEach(tx => {
            doc.text(`ID: ${tx.id}, Tipo: ${tx.type}, Valor: ${tx.amount}, Data: ${tx.date}`, 10, y);
            y += 10;
        });
        doc.save('transactions.pdf');
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Fluxo de Caixa</h1>
                <button onClick={generatePDF}>Gerar Relatório PDF</button>
                <ul>
                    {transactions.map(tx => (
                        <li key={tx.id}>{`ID: ${tx.id}, Tipo: ${tx.type}, Valor: ${tx.amount}, Data: ${tx.date}`}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HomePage;
