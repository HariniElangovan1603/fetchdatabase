import mysql2 from 'mysql2';

export const connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin123',
  database: 'harini',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Database connected successfully');
  }
});
