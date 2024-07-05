// src/pages/TransactionListPage.js
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination.js';
import Navbar from '../components/navBar';
import { Toaster, toast } from 'sonner';

let PageSize = 10;

const TransactionListPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/transactions')
      .then(response => {
        setTransactions(response.data.transactions);
        setTotalCount(response.data.totalCount);
      })
      .catch(error => {
        console.error('Erro ao buscar transações:', error);
        toast.error('Erro ao buscar transações.');
      });
  }, []);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return transactions.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, transactions]);

  return (
    <>
      <Navbar />
      <Toaster position="top-right" richColors />
      <div>
        <h1>Visualização de Transações</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map(tx => (
              <tr key={tx.id}>
                <td>{tx.id}</td>
                <td>{tx.type}</td>
                <td>R$ {parseFloat(tx.amount).toFixed(2).replace('.', ',')}</td>
                <td>{new Date(tx.date).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={PageSize}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
    </>
  );
};

export default TransactionListPage;
