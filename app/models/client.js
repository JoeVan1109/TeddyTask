import 'dotenv/config';
import { Sequelize } from 'sequelize';

const { 
    PGUSER: user,
    PGDATABASE: database,
    PGPASSWORD: password,
    PGHOST: host,
    PGPORT: port,
} = process.env;

export const client = new Sequelize(`postgres://${user}:${password}@${host}:${port}/${database}`,{
    define: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    logging: false,
});


client.authenticate()
    .then(
        () => console.log(`🚀 database ${database} connected`),
        () => console.log(`❌ unable to connect to database ${database}`)
);