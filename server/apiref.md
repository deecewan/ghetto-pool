## Locations

### Update current location

POST `/api/locations/current`

Req
```json
{
  "data": {
    "lat": 12.34,
    "lng": -56.78
  }
}
```

## Trips

### List trips you created

GET `/api/trips`

Res
```json
{
  "trips": [
    {
      "id": 1,
      "user_id": "123",
      "destination": "My House",
      "depart_at": 1503724220,
      "passengers": [
        {
          "id": "456",
          "first_name": "John",
          "last_name": "Smith",
          "accepted": false
        }
      ]
    }
  ]
}
```

### List trips you are part of

GET `/api/trips/journeys`

Res
```json
{
  "trips": [
    {
      "id": 1,
      "user_id": "456",
      "destination": "John's House",
      "depart_at": 1503724220,
      "passengers": [ // List contains all passengers including self
        {
          "id": "123",
          "first_name": "Sally",
          "last_name": "Buckets",
          "accepted": true
        }
      ]
    }
  ]
}
```

### Create a trip

POST `/api/trips`

Req
```json
{
  "data": {
    "destination": "My House",
    "depart_at": 1503724220 // Unix date time
  }
}
```

Res
```json
{
  "trip_id": 1,
  "inviteable_facebook_ids": [
    "123",
    "456"
  ]
}
```

### Invite friends on the trip

PUT `/api/trips/:trip_id/invite`

Req
```json
{
  "data": {
    "invited_facebook_ids": [
      "123"
    ]
  }
}
```

### Accept a trip

POST `/api/trips/:trip_id`
