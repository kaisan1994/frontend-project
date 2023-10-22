type DeliveryRequest = {
  startingPoint: string;
  dropOffPoint: string;
};

type DeliveryResponse = {
  status: string;
  path?: string[][];
  error?: string;
  total_distance?: number;
  total_time?: number;
};

type RoutesInfo = {
  routes: string[][];
  totalDistance?: number;
  totalTime?: number;
};

export type { DeliveryRequest, RoutesInfo, DeliveryResponse };
