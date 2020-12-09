const oracledb = require('oracledb');

cns = {
    user: "test",
    password: "1234",
    connectString: "172.17.0.2/ORCL18"
}


cns_gcp = {
    user: "hr",
    password: "oracle",
    connectString: "35.193.213.152/XEPDB1",
}

async function Open(sql, binds, autoCommit) {
    let cnn = await oracledb.getConnection(cns_gcp);
    //let cnn = await oracledb.getConnection(cns);
    let result = await cnn.execute(sql, binds, { autoCommit });
    cnn.release();
    return result;
}

exports.Open = Open;