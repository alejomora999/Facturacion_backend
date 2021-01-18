const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

const [accesResponse] = await client.accessSecretVersion({
    name: oracle-hr-user,
});

const responsePayload = accesResponse.payload.data.toString('utf-8');
console.info(`Payload ${responsePayload}`);

exports.username = responsePayload;