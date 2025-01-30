import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Space, Tooltip, Select, Tag, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchTickets, deleteTicketById } from '../../utils/api';
import AddTicket from './AddTicket';

const { Option } = Select;

const Ticket = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [prioridadFiltro, setPrioridadFiltro] = useState('');
  const [showAddTicketModal, setShowAddTicketModal] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
    cargarTickets();
  }, []);

  const cargarTickets = async () => {
    setLoading(true);
    try {
      const data = await fetchTickets();
      setTickets(data);
    } catch (error) {
      console.error('Error al cargar los tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTicketById(id);
      message.success('Ticket eliminado exitosamente.');
      cargarTickets();
    } catch (error) {
      message.error('Error al eliminar el ticket.');
    }
  };

  const ticketsFiltrados = tickets
    .filter(ticket => 
      ticket.asunto.toLowerCase().includes(searchText.toLowerCase()) &&
      (estadoFiltro ? ticket.estado === estadoFiltro : true) &&
      (prioridadFiltro ? ticket.prioridad === prioridadFiltro : true)
    );

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Lista de Tickets</h2>
        <Input
          placeholder="Buscar por asunto"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          style={{ width: '250px', marginRight: '10px' }}
        />
        <Select
          placeholder="Filtrar por estado"
          style={{ width: '150px', marginRight: '10px' }}
          onChange={setEstadoFiltro}
          allowClear
        >
          <Option value="activo">Activo</Option>
          <Option value="inactivo">Inactivo</Option>
        </Select>
        <Select
          placeholder="Filtrar por prioridad"
          style={{ width: '150px', marginRight: '10px' }}
          onChange={setPrioridadFiltro}
          allowClear
        >
          <Option value="alta">Alta</Option>
          <Option value="media">Media</Option>
          <Option value="baja">Baja</Option>
        </Select>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowAddTicketModal(true)}>
          Agregar Ticket
        </Button>
      </div>

      <Table
        columns={[
          { title: 'ID', dataIndex: 'id_ticket', key: 'id_ticket' },
          { title: 'Creador', dataIndex: 'creador', key: 'creador' },
          { title: 'Asunto', dataIndex: 'asunto', key: 'asunto' },
          { title: 'Descripción', dataIndex: 'descripcion', key: 'descripcion' },
          {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            render: estado => (
              <Tag color={estado === 'activo' ? 'green' : 'red'}>
                {estado.toUpperCase()}
              </Tag>
            ),
          },
          {
            title: 'Prioridad',
            dataIndex: 'prioridad',
            key: 'prioridad',
            render: prioridad => {
              let color = prioridad === 'alta' ? 'red' : prioridad === 'media' ? 'orange' : 'green';
              return <Tag color={color}>{prioridad.toUpperCase()}</Tag>;
            },
          },
          { 
            title: 'Fecha Creación', 
            dataIndex: 'fecha_creacion', 
            key: 'fecha_creacion' 
          },
          { 
            title: 'Fecha Cierre', 
            dataIndex: 'fecha_cierre', 
            key: 'fecha_cierre' 
          },
          {
            title: 'Acción',
            key: 'accion',
            render: (text, record) => (
              <Space size="middle">
                <Tooltip title="Ver"><Button icon={<EyeOutlined />} type="primary" /></Tooltip>
                <Tooltip title="Editar"><Button icon={<EditOutlined />} type="default" /></Tooltip>
                <Tooltip title="Eliminar">
                  <Button icon={<DeleteOutlined />} type="danger" onClick={() => handleDelete(record.id_ticket)} />
                </Tooltip>
              </Space>
            ),
          }
        ]}
        dataSource={ticketsFiltrados}
        loading={loading}
        rowKey="id_ticket"
        pagination={{ pageSize: itemsPerPage }}
      />

      {showAddTicketModal && <AddTicket closeModal={() => setShowAddTicketModal(false)} onTicketAdded={cargarTickets} />}
    </div>
  );
};

export default Ticket;
