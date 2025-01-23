import React, { useEffect, useState, useCallback } from 'react';
import { Table, Input, Button, Space, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined, FilterOutlined } from '@ant-design/icons';
import { fetchInvestments } from '../../../utils/api'; 

const Inversiones = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchText, setSearchText] = useState('');

  // Función para obtener inversiones
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchInvestments();
      const filteredData = result.investments.filter(investment =>
        investment.idProyecto.toLowerCase().includes(searchText.toLowerCase())
      );
      setData(filteredData);
      setTotalRecords(result.total);
    } catch (error) {
      console.error('Error fetching investments:', error);
    } finally {
      setLoading(false);
    }
  }, [searchText]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns = [
    {
      title: 'ID Proyecto',
      dataIndex: 'idProyecto',
      key: 'idProyecto',
    },
    {
      title: 'ID Prestamista',
      dataIndex: 'idPrestamista',
      key: 'idPrestamista',
    },
    {
      title: 'Monto Invertido',
      dataIndex: 'montoInvertido',
      key: 'montoInvertido',
    },
    {
      title: 'Tipo Retorno',
      dataIndex: 'tipoRetorno',
      key: 'tipoRetorno',
    },
    {
      title: 'Método de Pago',
      dataIndex: 'metodoPago',
      key: 'metodoPago',
    },
    {
      title: 'Términos y Condiciones',
      dataIndex: 'terminos',
      key: 'terminos',
    },
    {
      title: 'Acción',
      key: 'accion',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} />
          <Button icon={<EyeOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Inversiones</h2>
      <Space style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Input
          placeholder="Buscar inversiones por ID Proyecto"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '300px' }}
        />
        <Space>
          <Button icon={<FilterOutlined />}>Filtrar</Button>
          <Button type="primary" icon={<PlusOutlined />}>Crear Inversión</Button>
        </Space>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        rowKey="idProyecto"
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

export default Inversiones;
