import Guest from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useMemo, useState } from "react";
import Section from "@/Components/Section";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import useClient from "@/hooks/useClient";
import { Container } from "@mui/material";
import Alert from "@/Components/Alerts/Alert";

const Index = ({ auth, clients }) => {
    const [rowsData, setRowData] = useState(clients);
    const { updateStatusClient, updateDataClient,errorsCLient,setErrorsClient } = useClient();
    const [loading, setLoading] = useState();

    const rowSelection = useMemo(() => {
        return {
            mode: "multiRow",
        };
    });

    const handleChangeEventCell = (event) => {
        
        const { colDef, data, newValue } = event;
        if (colDef.field === "status") {
            const cliente = updateStatusClient(event.data.id, event.value);
        } else {
            updateDataClient(data.id, data);
        }
    };

    const StatusActiveRender = ({ value }) => (
        <span
            style={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
                alignItems: "center",
            }}
        >
            {
                <img
                    alt={`${value}`}
                    src={`https://www.ag-grid.com/example-assets/icons/${
                        value === "active"
                            ? "tick-in-circle"
                            : "cross-in-circle"
                    }.png`}
                    style={{ width: "auto", height: "auto" }}
                />
            }
        </span>
    );

    const defaultColumnDef = useMemo(() => {
        return {
            editable: true,
            filter: true,
        };
    });
    const [columnDefs, setColDefs] = useState([
        { field: "id", flex: 3, editable: false },
        { field: "full_name" },
        { field: "email" },
        { field: "phone" },
        { field: "address" },
        { field: "identification_number", editable: false },
        {
            field: "status",
            flex: 6,
            editable: true,
            cellRenderer: StatusActiveRender,
            cellEditor: "agSelectCellEditor",
            cellEditorParams: {
                values: ["active", "inactive"],
            },
        },
    ]);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Listado de Clientes
                </h2>
            }
        >
            <Head title="Clientes" />

            <Container sx={{ alignContent: "center" }}>
                <Link
                    className="px-6 py-3  rounded bg-indigo-600 my-4  dark:text-gray-200 text-gray-400 text-sm  leading-4 font-bold whitespace-nowrap hover:bg-orange-400 focus:bg-orange-400"
                    href={route("client.create")}
                >
                    <span>+Crear Cliente</span>
                </Link>
             
                
                {errorsCLient && (
                <Alert
                    type="error"
                    message={JSON.stringify(errorsCLient)}
                    onClose={() => setErrorsClient("")}
                />
            )}

                <div className="ag-theme-quartz  " style={{ height: 700 }}>
                    <AgGridReact
                        pagination={true}
                        paginationPageSize={20}
                        rowData={rowsData}
                        columnDefs={columnDefs}
                        rowSelection={rowSelection}
                        defaultColDef={defaultColumnDef}
                        // onCellKeyDown={(event) => console.log(event)}
                        onCellValueChanged={handleChangeEventCell}
                    />
                </div>
            </Container>
        </AuthenticatedLayout>
    );
};

export default Index;
