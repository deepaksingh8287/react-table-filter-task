
import React, { useState, useRef } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const AdminTable = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const data = [
        {
            key: '1',
            userName: 'Deepak Singh',
            email: 'deepaksingh@gmail.com',
            phoneNumber: '1234567890',
            designation: 'Manager',
            accessStatus: 'Active',
            userId: 'U001',
        },
        {
            key: '2',
            userName: 'Monika',
            email: 'monika@gmail.com',
            phoneNumber: '7789089898',
            designation: 'Developer',
            accessStatus: 'Inactive',
            userId: 'U002',
        },
        {
            key: '3',
            userName: 'Akash',
            email: 'akash@gmail.com',
            phoneNumber: '9306426871',
            designation: 'tester',
            accessStatus: 'active',
            userId: 'U003',
        },
        {
            key: '4',
            userName: 'Himanshu',
            email: 'himanshu@gmail.com',
            phoneNumber: '8287518896',
            designation: 'devops',
            accessStatus: 'Inactive',
            userId: 'U004',
        },
        {
            key: '5',
            userName: 'Jyoti',
            email: 'jyoti@gmail.com',
            phoneNumber: '8181818181',
            designation: 'Developer',
            accessStatus: 'Inactive',
            userId: 'U005',
        },
        {
            key: '6',
            userName: 'Vikas',
            email: 'vikas@gmail.com',
            phoneNumber: '8888888888',
            designation: 'frontend developer',
            accessStatus: 'Inactive',
            userId: 'U006',
        },
        {
            key: '7',
            userName: 'Rajan',
            email: 'rajan@gmail.com',
            phoneNumber: '8787876678',
            designation: 'Developer',
            accessStatus: 'Inactive',
            userId: 'U007',
        },
        // Add more data as needed
    ];

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const columns = [
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
            ...getColumnSearchProps('userName'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            ...getColumnSearchProps('phoneNumber'),
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
            ...getColumnSearchProps('designation'),
        },
        {
            title: 'Access Status',
            dataIndex: 'accessStatus',
            key: 'accessStatus',
            ...getColumnSearchProps('accessStatus'),
        },
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
            ...getColumnSearchProps('userId'),
        },
    ];

    return <Table columns={columns} dataSource={data} />;
};

export default AdminTable;

