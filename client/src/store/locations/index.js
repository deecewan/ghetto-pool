function addLocations(state, locations) {
  return {
    ...state,
    ...locations.map(location => (
      {
        [location.id]: {
          lat: location.lat,
          lng: location.lng,
        }
      }
    )).reduce((acc, curr) => ({...acc, ...curr}), {}),
  }
}

export default function reducer(state = {}, { type, payload }) {
  switch (type) {
    case '@LOCATIONS/ADD':
      return addLocations(state, payload);
    default:
      return state;
  }
}
