import { PropsWithChildren, createContext, useState } from 'react';
import { RoutesInfo } from '../interfaces/Delivery';

type DeliveryContextProps = {
  routesInfo: RoutesInfo | null;
  loading: boolean;
  setRoutesInfo: React.Dispatch<React.SetStateAction<RoutesInfo | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeliveryContext = createContext<DeliveryContextProps>({
  routesInfo: null,
  loading: false,
  setRoutesInfo: () => {},
  setLoading: () => {},
});

const DeliveryContextProvider = ({ children }: PropsWithChildren) => {
  const [routesInfo, setRoutesInfo] = useState<RoutesInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <DeliveryContext.Provider value={{ routesInfo, setRoutesInfo, loading, setLoading }}>
      {children}
    </DeliveryContext.Provider>
  );
};

export { DeliveryContextProvider as default, DeliveryContext };
