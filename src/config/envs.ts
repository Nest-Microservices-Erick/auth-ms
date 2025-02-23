import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    JWT_SECRET: string;
    NATS_SERVERS: string[];
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),  // A strong secret key for JWT authentication
    NATS_SERVERS: joi.array().items(joi.string()).required(),  // Array of strings, each representing a NATS server URL
})
.unknown(true);

const { error, value } = envsSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if ( error) {
    throw new Error(`Config validation error ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    jwtSecret: envVars.JWT_SECRET,
    natsServers: envVars.NATS_SERVERS,
}