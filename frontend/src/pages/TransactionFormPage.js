import React, { useState } from 'react';
import NumericInput from 'react-numeric-input';
import api from '../api/index';
import '../styles/TransactionFormPage.scss';
import logo from '../assets/logo.png';
import { Toaster, toast } from 'sonner';
import Navbar from '../components/navBar.js'; // Certifique-se que o nome do arquivo está correto

const TransactionFormPage = () => {
  const [type, setType] = useState('entrada');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/transactions', { type, amount, date, description });
      toast.success('Transação cadastrada com sucesso!');
      setType('entrada'); // Redefinindo os campos do formulário
      setAmount('');
      setDate('');
      setDescription('');
    } catch (error) {
      console.error('Erro ao cadastrar transação:', error);
      toast.error('Erro ao cadastrar transação.');
    }
  };

  return (
    <div>
      <Navbar /> 
      <div className="transaction-form-container">
        <Toaster 
          position='top-right'
          richColors 
        />
        <img src={logo} alt="Logo" className="logo" />
        <h1>Cadastrar Transação</h1>
        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group">
            <label htmlFor="type">Tipo de Transação</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição da transação"
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Valor</label>
            <NumericInput
              id="amount"
              value={amount}
              onChange={(valueAsNumber) => setAmount(valueAsNumber)}
              precision={2}
              step={0.01}
              decimalSeparator=","
              thousandSeparator="."
              prefix="R$ "
              className="numeric-input"
              strict={false}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Data</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default TransactionFormPage;
