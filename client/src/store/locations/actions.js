export function addLocations(locations) {
  return {
    type: '@LOCATIONS/ADD',
    payload: locations,
  };
}
