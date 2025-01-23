import React, { useEffect, useState, useCallback } from 'react';
import { Table, Input, Button, Space, Tag, Pagination } from 'antd';
import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { fetchTickets } from '../../../utils/api'; // Importa la función de la API para obtener los tickets

const Tickets = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchText, setSearchText] = useState('');

  // Función para obtener tickets
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchTickets();
      const filteredData = result.tickets.filter(ticket =>
        ticket.usuarioAsociado.toLowerCase().includes(searchText.toLowerCase())
      );
      setData(filteredData);
      setTotalRecords(result.total);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  }, [searchText]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns = [
    {
      title: 'ID Ticket',
      dataIndex: 'idTicket',
      key: 'idTicket',
    },
    {
      title: 'Usuario Asociado',
      dataIndex: 'usuarioAsociado',
      key: 'usuarioAsociado',
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado) => (
        <Tag color={estado === 'Abierto' ? 'green' : 'red'}>{estado}</Tag>
      ),
    },
    {
      title: 'Acción',
      key: 'accion',
      render: (_, record) => (
        <Button type="primary" onClick={() => handleAssist(record.idTicket)}>
          Asistir
        </Button>
      ),
    },
  ];

  // Función para manejar el botón "Asistir"
  const handleAssist = (idTicket) => {
    console.log(`Asistir al ticket con ID: ${idTicket}`);
    // Aquí puedes agregar lógica adicional para actualizar el estado del ticket o redirigir al usuario
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Tickets</h2>
      <Space style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Input
          placeholder="Buscar tickets por usuario"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '300px' }}
        />
        <Space>
          <Button icon={<FilterOutlined />}>Filtrar</Button>
          <Button type="primary" icon={<PlusOutlined />}>Crear Ticket</Button>
        </Space>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        rowKey="idTicket"
      />
      <Pagination
        style={{ marginTop: '20px', textAlign: 'center' }}
        current={currentPage}
        total={totalRecords}
        pageSize={8}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Tickets;
