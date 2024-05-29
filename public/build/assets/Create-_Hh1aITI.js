import{W as o,j as e,Y as c,a as x}from"./app-ruRgAQWH.js";import{T as r,I as i}from"./TextInput-DR7Mmb93.js";import{I as n}from"./InputLabel-Dzin1UvR.js";import{P as h}from"./PrimaryButton-DdWB8K58.js";import{A as u}from"./AuthenticatedLayout-BTxz_0VR.js";import"./ApplicationLogo-CaJxUGOe.js";import"./transition-IH4nROTk.js";const _=({auth:l})=>{const{data:j,errors:a,setData:t,processing:g,recentlySuccessful:p,post:d}=o(),m=s=>{s.preventDefault(),d(route("client.store"))};return e.jsxs(u,{user:l.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight",children:"Crear Cliente"}),children:[e.jsx(c,{title:"Crear Cliente "}),e.jsx(x,{className:"text-indigo-400 hover:text-indigo-600",href:"/clients",children:"Clientes"}),e.jsx("span",{className:"text-indigo-400 font-medium",children:"/"}),e.jsxs("section",{className:"p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg",children:[e.jsxs("header",{children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900 dark:text-gray-100",children:"Informacion Personal"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600 dark:text-gray-400",children:"Realiza la actualizacion de datos, los campos son requeridos."})]}),e.jsxs("form",{onSubmit:m,children:[e.jsxs("div",{children:[e.jsx(n,{children:"Nombre Completo"}),e.jsx(r,{onChange:s=>t("full_name",s.target.value),required:!0,isFocused:!0,autoComplete:"full_name"}),e.jsx(i,{className:"mt-2",message:a.full_name})]}),e.jsxs("div",{children:[e.jsx(n,{children:"Identificación"}),e.jsx(r,{onChange:s=>t("identification_number",s.target.value)}),e.jsx(i,{className:"mt-2",message:a.identification_number})]}),e.jsxs("div",{children:[e.jsx(n,{children:"Celular"}),e.jsx(r,{onChange:s=>t("phone",s.target.value),required:!0,isfocused:!0}),e.jsx(i,{className:"mt-2",message:a.phone})]}),e.jsxs("div",{children:[e.jsx(n,{children:"Email"}),e.jsx(r,{type:"email",onChange:s=>t("email",s.target.value)}),e.jsx(i,{className:"mt-2",message:a.email})]}),e.jsxs("div",{children:[e.jsx(n,{children:"Dirección"}),e.jsx(r,{onChange:s=>t("address",s.target.value)}),e.jsx(i,{className:"mt-2",message:a.address})]}),e.jsxs("div",{children:[e.jsx(n,{children:"Ciudad"}),e.jsx(r,{onChange:s=>t("city",s.target.value)}),e.jsx(i,{className:"mt-2",message:a.city})]}),e.jsxs("div",{children:[e.jsx(n,{children:"Fecha Nacimiento"}),e.jsx(r,{type:"date",onChange:s=>t("birthday",s.target.value)}),e.jsx(i,{className:"mt-2",message:a.birthday})]}),e.jsx(h,{children:"Nuevo Cliente"})]})]})]})};export{_ as default};
