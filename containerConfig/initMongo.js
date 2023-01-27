// /* global db */
db.createUser(
  {
    user: 'andrea',
    pwd: 'password123',
    roles: [
      {
        role: 'readWrite',
        db: 'milk',
      },
    ],
  },
);