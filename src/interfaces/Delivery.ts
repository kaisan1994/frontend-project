type DeliveryRequest = {
  startingPoint: string;
  dropOffPoint: string;
};

type RoutesInfo = {
  routes: string[][]
  totalDistance: number;
  totalTime: number;
}

export type { DeliveryRequest, RoutesInfo };
