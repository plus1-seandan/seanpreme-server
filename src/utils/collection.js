const models = require("../models");

//setting up number of items to be fetched per page
const getPagination = (_page, _limit) => {
  const limit = _limit ? +_limit : 12;
  const offset = _page ? _page * limit : 0;

  return { limit, offset };
};

//get paginated data and organise it into totalItems, items, totalPages, currentPage
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, items, totalPages, currentPage };
};

const getSort = (sort) => {
  if (!sort) {
    return null;
  }
  if (sort === "new") {
    return ["createdAt", "DESC"];
  }
  if (sort === "pricelowhigh") {
    return ["price", "ASC"];
  }
  if (sort === "pricehighlow") {
    return ["price", "DESC"];
  }
};
module.exports = { getPagination, getPagingData, getSort };
