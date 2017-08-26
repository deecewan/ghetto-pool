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

### List trips you created or are part of

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
      "passengers": [ // List includes all passengers including self (but excluding organiser)
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

### Create a trip

POST `/api/trips`

Req
```json
{
  "data": {
    "lat": 12.34, // Current location
    "lng": -56.78,
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