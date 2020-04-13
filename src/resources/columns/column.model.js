const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'COLUMN', order = null } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  update({ title, order }) {
    this.order = order;
    this.title = title;
  }
}

module.exports = Column;
