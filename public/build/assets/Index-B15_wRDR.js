import{q as c,j as e,Y as l,a as t}from"./app-BIHjIaiO.js";import{A as x}from"./AuthenticatedLayout-DoQCO3vT.js";import{S as i}from"./SecondaryButton-CPR6xCdN.js";import{S as d}from"./Section-BcHkbTES.js";import{P as n}from"./PrimaryButton-C2LkiI9N.js";import"./ApplicationLogo-DsCfsV0d.js";import"./transition-DbiMdWOh.js";const g=({auth:r,empleados:a=null})=>(c(),e.jsxs(x,{user:r.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight",children:"Listado Empleados"}),children:[e.jsx(l,{title:"Lista de Empleados "}),e.jsx(i,{className:"m-4",children:e.jsx(t,{href:"/employees/create",children:"Registrar Empleado"})}),e.jsx(d,{className:"w-3/4",children:e.jsxs("table",{className:" w-full text-sm text-left rtl:text:rigth text-gray-500 dark:text-gray-400",children:[e.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500",children:e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{className:"px-3 py-2",children:"Nombre Completo"}),e.jsx("th",{className:"px-3 py-2",children:"Numero de Identidad"}),e.jsx("th",{className:"px-3 py-2",children:"Genero"}),e.jsx("th",{className:"px-3 py-2",children:"Fecha de nacimiento"}),e.jsx("th",{className:"px-3 py-2",children:"Celular"}),e.jsx("th",{className:"px-3 py-2",children:"Email"}),e.jsx("th",{className:"px-3 py-2",children:"Cargo"}),e.jsx("th",{className:"px-3 py-2",children:"Cargo"}),e.jsx("th",{className:" px-3 py-2",children:"Fecha Contratación"}),e.jsx("th",{children:"Acciones"})]})}),e.jsx("tbody",{className:"dark:to-blue-950 ",children:a?a.data.map(s=>e.jsxs("tr",{className:"p-4 text-gray-400",children:[e.jsx("td",{className:"px-3 py-2",children:s.nombreCompleto}),e.jsx("td",{className:"px-3 py-2",children:s.dni}),e.jsx("td",{className:"px-3 py-2",children:s.genero}),e.jsx("td",{className:"px-3 py-2",children:s.fechaNacimiento}),e.jsx("td",{className:"px-3 py-2",children:s.telefono}),e.jsx("td",{className:"px-3 py-2",children:s.email}),e.jsx("td",{className:"px-3 py-2",children:s.cargo}),e.jsx("td",{className:"px-3 py-2",children:s.fechaContratacion}),e.jsx("td",{className:"px-3 py-2",children:s.fechaContratacion}),e.jsx("td",{className:"px-3 py-2",children:e.jsx(t,{href:route("employees.edit",s.id),children:e.jsx(n,{children:"Editar"})})})]},s.id)):e.jsx("tr",{children:e.jsx("td",{children:'"No hay empleados registrados"'})})})]})})]}));export{g as default};
