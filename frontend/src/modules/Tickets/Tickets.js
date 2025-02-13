// TicketSystem.js
import React, { useState, useEffect } from 'react';
import {
  Layout,
  Card,
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  Table,
  Modal,
  Drawer,
  Space,
  Checkbox,
  message,
  Descriptions,
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

// Estilos en línea (idénticos a CategoryDashboard.js)
const containerStyle = {
  minHeight: "100vh",
  background: "#f0f2f5",
};

const headerStyle = {
  background: "#001529",
  padding: "0 24px",
};

const headerTitleStyle = {
  color: "#fff",
  fontSize: "24px",
  lineHeight: "64px",
  margin: 0,
};

const contentStyle = {
  margin: "24px",
};

const cardStyle = {
  marginBottom: "24px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
};

const TicketSystem = () => {
  // Estados principales
  const [tickets, setTickets] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filteredTickets, setFilteredTickets] = useState([]);

  // Estados para el Drawer (agregar/editar)
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerMode, setDrawerMode] = useState('add'); // 'add' o 'edit'
  const [currentTicket, setCurrentTicket] = useState(null);

  // Estado para el Modal de visualización
  const [viewModalVisible, setViewModalVisible] = useState(false);

  // Estado para selección masiva
  const [selectedIds, setSelectedIds] = useState([]);

  // Referencia al formulario del Drawer
  const [form] = Form.useForm();

  // Cargar datos desde localStorage o datos de ejemplo al iniciar
  useEffect(() => {
    const storedTickets = localStorage.getItem('tickets');
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    } else {
      // Datos de ejemplo
      const sampleTickets = [
        {
          id: 1,
          creador: 'Juan Perez',
          asunto: 'Problema de acceso',
          descripcion: 'No puedo acceder al sistema',
          estado: 'Abierto',
          prioridad: 'Alta',
          fechaCreacion: '2025-01-01',
          fechaCierre: ''
        },
        {
          id: 2,
          creador: 'Maria Lopez',
          asunto: 'Error en formulario',
          descripcion: 'El formulario no guarda la información',
          estado: 'En Proceso',
          prioridad: 'Media',
          fechaCreacion: '2025-01-02',
          fechaCierre: ''
        }
      ];
      setTickets(sampleTickets);
      localStorage.setItem('tickets', JSON.stringify(sampleTickets));
    }
  }, []);

  // Actualiza la lista filtrada cada vez que cambien los tickets o los filtros
  useEffect(() => {
    const filtered = tickets.filter(ticket => {
      const searchMatch =
        ticket.creador.toLowerCase().includes(searchText.toLowerCase()) ||
        ticket.asunto.toLowerCase().includes(searchText.toLowerCase());
      const priorityMatch = filterPriority
        ? ticket.prioridad === filterPriority
        : true;
      return searchMatch && priorityMatch;
    });
    setFilteredTickets(filtered);
  }, [tickets, searchText, filterPriority]);

  // Actualiza el localStorage
  const updateLocalStorage = newTickets => {
    localStorage.setItem('tickets', JSON.stringify(newTickets));
  };

  // Abre el Drawer para agregar un nuevo ticket
  const onAddTicket = () => {
    setDrawerMode('add');
    setCurrentTicket(null);
    form.resetFields();
    setDrawerVisible(true);
  };

  // Abre el Drawer para editar un ticket existente
  const onEditTicket = ticket => {
    setDrawerMode('edit');
    setCurrentTicket(ticket);
    form.setFieldsValue({
      creador: ticket.creador,
      asunto: ticket.asunto,
      descripcion: ticket.descripcion,
      prioridad: ticket.prioridad,
      estado: ticket.estado
    });
    setDrawerVisible(true);
  };

  // Abre el Modal para visualizar un ticket
  const onViewTicket = ticket => {
    setCurrentTicket(ticket);
    setViewModalVisible(true);
  };

  // Función para eliminar un ticket individual
  const onDeleteTicket = ticket => {
    Modal.confirm({
      title: '¿Está seguro de eliminar este ticket?',
      onOk: () => {
        const newTickets = tickets.filter(t => t.id !== ticket.id);
        setTickets(newTickets);
        updateLocalStorage(newTickets);
        message.success('Ticket eliminado');
      }
    });
  };

  // Eliminación masiva
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) {
      message.warning('No hay tickets seleccionados');
      return;
    }
    Modal.confirm({
      title: 'Eliminar Tickets',
      content: `¿Está seguro de eliminar los ${selectedIds.length} tickets seleccionados?`,
      onOk: () => {
        const newTickets = tickets.filter(t => !selectedIds.includes(t.id));
        setTickets(newTickets);
        updateLocalStorage(newTickets);
        setSelectedIds([]);
        message.success('Tickets eliminados');
      }
    });
  };

  // Manejo de la selección (checkbox)
  const handleSelect = (id, checked) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(item => item !== id));
    }
  };

  // Manejo del envío del formulario (agregar o editar)
  const onFinish = values => {
    if (drawerMode === 'add') {
      const newTicket = {
        id: Date.now(), // id único simple
        creador: values.creador,
        asunto: values.asunto,
        descripcion: values.descripcion,
        prioridad: values.prioridad,
        estado: 'Abierto',
        fechaCreacion: new Date().toLocaleDateString(),
        fechaCierre: ''
      };
      const newTickets = [...tickets, newTicket];
      setTickets(newTickets);
      updateLocalStorage(newTickets);
      message.success('Ticket agregado');
    } else if (drawerMode === 'edit') {
      const updatedTicket = {
        ...currentTicket,
        creador: values.creador,
        asunto: values.asunto,
        descripcion: values.descripcion,
        prioridad: values.prioridad,
        estado: values.estado
      };
      if (values.estado === 'Cerrado' && !currentTicket.fechaCierre) {
        updatedTicket.fechaCierre = new Date().toLocaleDateString();
      }
      if (values.estado !== 'Cerrado') {
        updatedTicket.fechaCierre = '';
      }
      const newTickets = tickets.map(t =>
        t.id === updatedTicket.id ? updatedTicket : t
      );
      setTickets(newTickets);
      updateLocalStorage(newTickets);
      message.success('Ticket actualizado');
    }
    setDrawerVisible(false);
  };

  // Definición de las columnas de la tabla, agregando la columna de selección como primera columna
  const columns = [
    {
      title: '',
      key: 'select',
      render: (_, record) => (
        <Checkbox
          checked={selectedIds.includes(record.id)}
          onChange={e => handleSelect(record.id, e.target.checked)}
        />
      ),
      width: 50,
    },
    {
      title: 'Creador',
      dataIndex: 'creador',
      key: 'creador'
    },
    {
      title: 'Asunto',
      dataIndex: 'asunto',
      key: 'asunto'
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
      ellipsis: true
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado'
    },
    {
      title: 'Prioridad',
      dataIndex: 'prioridad',
      key: 'prioridad'
    },
    {
      title: 'Fecha Creación',
      dataIndex: 'fechaCreacion',
      key: 'fechaCreacion'
    },
    {
      title: 'Fecha Cierre',
      dataIndex: 'fechaCierre',
      key: 'fechaCierre'
    },
    {
      title: 'Acción',
      key: 'accion',
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => onViewTicket(record)} />
          <Button icon={<EditOutlined />} onClick={() => onEditTicket(record)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => onDeleteTicket(record)} />
        </Space>
      )
    }
  ];

  return (
    <Layout style={containerStyle}>
      <Header style={headerStyle}>
        <Row align="middle">
          <Col>
            <FileTextOutlined style={{ fontSize: "32px", color: "#fff", marginRight: "16px" }} />
          </Col>
          <Col>
            <h1 style={headerTitleStyle}>Sistema de Tickets</h1>
          </Col>
        </Row>
      </Header>
      <Content style={contentStyle}>
        <Card title="Administrar Tickets" style={cardStyle}>
          <Row gutter={16} style={{ marginBottom: "16px" }}>
            <Col xs={24} md={8}>
              <Input.Search
                placeholder="Buscar por Creador o Asunto"
                allowClear
                onSearch={value => setSearchText(value)}
                onChange={e => setSearchText(e.target.value)}
                style={{ width: 250 }}
              />
            </Col>
            <Col xs={24} md={6}>
              <Select
                placeholder="Filtrar por Prioridad"
                allowClear
                onChange={value => setFilterPriority(value)}
                style={{ width: "100%" }}
              >
                <Option value="Alta">Alta</Option>
                <Option value="Media">Media</Option>
                <Option value="Baja">Baja</Option>
              </Select>
            </Col>
            <Col xs={24} md={10} style={{ textAlign: "right" }}>
              <Button type="primary" onClick={onAddTicket}>
                Agregar nuevo ticket
              </Button>
            </Col>
          </Row>
          {selectedIds.length > 0 && (
            <Row justify="end" style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                danger
                onClick={handleBulkDelete}
                icon={<DeleteOutlined />}
              >
                Eliminar Seleccionados
              </Button>
            </Row>
          )}
          <Table dataSource={filteredTickets} columns={columns} rowKey="id" />
        </Card>
      </Content>

      {/* Drawer para Agregar / Editar Ticket */}
      <Drawer
        title={drawerMode === 'add' ? 'Agregar Ticket' : 'Editar Ticket'}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={400}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Creador"
            name="creador"
            rules={[{ required: true, message: 'Por favor ingrese el creador' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Asunto"
            name="asunto"
            rules={[{ required: true, message: 'Por favor ingrese el asunto' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Descripción"
            name="descripcion"
            rules={[{ required: true, message: 'Por favor ingrese la descripción' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Prioridad"
            name="prioridad"
            rules={[{ required: true, message: 'Por favor seleccione la prioridad' }]}
          >
            <Select placeholder="Seleccione la prioridad">
              <Option value="Alta">Alta</Option>
              <Option value="Media">Media</Option>
              <Option value="Baja">Baja</Option>
            </Select>
          </Form.Item>
          {drawerMode === 'edit' && (
            <Form.Item
              label="Estado"
              name="estado"
              rules={[{ required: true, message: 'Por favor seleccione el estado' }]}
            >
              <Select placeholder="Seleccione el estado">
                <Option value="Abierto">Abierto</Option>
                <Option value="En Proceso">En Proceso</Option>
                <Option value="Cerrado">Cerrado</Option>
              </Select>
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {drawerMode === 'add'
                ? 'Agregar Ticket'
                : 'Actualizar Ticket'}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      {/* Modal para Visualizar Ticket */}
      <Modal
        visible={viewModalVisible}
        title="Detalles del Ticket"
        footer={[
          <Button key="close" type="primary" onClick={() => setViewModalVisible(false)}>
            Cerrar
          </Button>
        ]}
        onCancel={() => setViewModalVisible(false)}
      >
        {currentTicket && (
          <Card bordered={false} style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <Descriptions title="Información del Ticket" bordered column={1}>
              <Descriptions.Item label="Creador">
                {currentTicket.creador}
              </Descriptions.Item>
              <Descriptions.Item label="Asunto">
                {currentTicket.asunto}
              </Descriptions.Item>
              <Descriptions.Item label="Descripción">
                {currentTicket.descripcion}
              </Descriptions.Item>
              <Descriptions.Item label="Prioridad">
                {currentTicket.prioridad}
              </Descriptions.Item>
              <Descriptions.Item label="Estado">
                {currentTicket.estado}
              </Descriptions.Item>
              <Descriptions.Item label="Fecha Creación">
                {currentTicket.fechaCreacion}
              </Descriptions.Item>
              <Descriptions.Item label="Fecha Cierre">
                {currentTicket.fechaCierre || 'N/A'}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}
      </Modal>
    </Layout>
  );
};

export default TicketSystem;
