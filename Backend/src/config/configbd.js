const oracledb = require('oracledb');

cns = {
    user: "test",
    password: "1234",
    connectString: "172.17.0.2/ORCL18"
}


cns_gcp = {
    user: "hr",
    password: "oracle2021",
    connectString: "35.224.188.248/XEPDB1",
}

async function Open(sql, binds, autoCommit) {
    let cnn = await oracledb.getConnection(cns_gcp);
    //let cnn = await oracledb.getConnection(cns);
    let result = await cnn.execute(sql, binds, { autoCommit });
    cnn.release();
    return result;
}

exports.Open = Open;