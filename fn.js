var query = require("./query");
var q = require("q");

exports.getAllCabinet = async floor => {
  let defer = q.defer();
  let sql = `SELECT * FROM cabinets WHERE floor=${floor}`;
  query.selectDB(sql).then(res => {
    defer.resolve(res.data);
  });
  return defer.promise;
};

exports.FindRoute = async params => {
  let defer = q.defer();
  let sql = `SELECT * FROM route WHERE start='${params.start}' AND end='${params.end}' OR start='${params.end}' AND end='${params.start}'`;
  query.selectDB(sql).then(res => {
    defer.resolve(res.data);
  });
  return defer.promise
};
 

exports.getData = async cab =>{
  let defer = q.defer();
  let sql = `SELECT par FROM rasp WHERE aud=${cab}`;
  console.log("sql", sql)
  query.selectDB2(sql).then(res => {

    defer.resolve(res.data);
  });
  return defer.promise;
};