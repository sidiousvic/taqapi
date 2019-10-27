# TaqAPI 🌮

_This was created during my time as a student at [Code Chrysalis](https://www.codechrysalis.io/)._

Get taquería info through GraphQL queries.

## How to use

### Find your favorite 🧡 taquería.

```

  {
    taqueria(name: "La Cubanita") {
      name
      specialty
      rating
    }
  }
```

### Search by rating to find the firest 🔥 tacos in town.

```
{
  taqueriasByRating(rating:3) {
    name
    rating
    specialty
  }
}
```

### Or simply order all taquerias. 🤟🏽

```

    {
      taquerias {
        name
        rating
        specialty
      }
    }

```

## Run it!

```
yarn
```

```
yarn dev
```
