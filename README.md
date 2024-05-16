## Express API

### Authorization

> IMPORTANT: 🚫 Do not modify imported request configurations without explicit instructions.

1. Create the following two protected routes for all authenticated users:

- Implement a route for users to like or dislike a movie at `/movies/:id/like`
- Implement another route and configure the endpoint for users to add or remove a movie from their favorites list.

(In both cases, ensure that a user cannot like a movie or mark it as a favorite on behalf of another user.)

2. Update the GET requests for movies to also include a "likes" property in the response, containing the usernames of users who have liked the movie.

3. Additionally, create a route at GET /api/users/:userId/movies/favorites to retrieve the favorite movies of the authenticated user.

```bash
git checkout exercise9
```
