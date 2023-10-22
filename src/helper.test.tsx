import { convertRouteToGoogleLatLng } from './helper/mapHelper';

test('Valid coordinates', async () => {
  const googleCoordinates1 = convertRouteToGoogleLatLng(['11.234515', '23.412555']);
  expect(googleCoordinates1).toMatchObject({ lat: 11.234515, lng: 23.412555 });

  const googleCoordinates2 = convertRouteToGoogleLatLng(['-11.234515', '23.412555']);
  expect(googleCoordinates2).toMatchObject({ lat: -11.234515, lng: 23.412555 });

  const googleCoordinates3 = convertRouteToGoogleLatLng(['0', '0']);
  expect(googleCoordinates3).toMatchObject({ lat: 0, lng: 0 });

  expect(() => convertRouteToGoogleLatLng(['123.1233'])).toThrow('Invalid route.');

  expect(() => convertRouteToGoogleLatLng(['11.213', '123.333', '12.12333'])).toThrowError('Invalid route.');
});