const getFromToQuery = (request) => {
  const from = new Date(request.query.from || Date.now());
  const to = new Date(request.query.to || Date.now());
  from.setHours(0);
  from.setMinutes(0);
  from.setSeconds(0);
  from.setMilliseconds(0);
  to.setDate(to.getDate() + 1);
  to.setHours(0);
  to.setMinutes(0);
  to.setSeconds(0);
  to.setMilliseconds(0);

  return { createdAt: { $gte: from, $lte: to } };
};

module.exports.getFromToQuery = getFromToQuery;
