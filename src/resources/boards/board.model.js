const uuid = require('uuid');
const Column = require('../columns/column.model');

class Board {
  constructor({ id = uuid(), title = 'Board title', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(col => {
      return new Column({ ...col });
    });
  }

  update({ title, columns }) {
    this.title = title;
    this.columns = columns.map(col => {
      return new Column({ ...col });
    });
  }

  static toResponse(board) {
    const { id, name, title, columns } = board;
    return { id, name, title, columns };
  }
}

module.exports = Board;
