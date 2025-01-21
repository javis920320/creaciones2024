import React, { ReactElement, useState } from 'react';
import { CustomerType } from '@/Types/Index';
import { customerTypes } from '@/data/mockData';

const Index: React.FC = (): ReactElement => {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<{ factura: string; dataEntrega: string }>({
    factura: "",
    dataEntrega: "",
  });

return(<h1>Index</h1>)
};

export default Index;