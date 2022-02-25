import { qs, formatRelativeDate, delegate } from "../helpers.js";
import KeywordListView from "./KeywordListView.js";

export default class HistoryListView extends KeywordListView {
  constructor() {
    super(qs(`#history-list-view`), new Template());

    this.bindEvents();
  }

  bindEvents() {
    delegate(this.element, 'click', 'button.btn-remove', (event) => { this.handleRemove(event); });

    super.bindEvents();
  }

  handleRemove(event) {
    const value = event?.target?.parentElement?.dataset?.keyword;

    this.emit('@remove', { value });
  }
}

class Template {
  getEmptyMessage() {
    return `<div class="empty-box">검색 이력이 없습니다.</div>`;
  }

  getList(data = []) {
    return `
      <ul class="list">
        ${data?.map(this._getItem).join('')}
      </ul>
    `;
  }

  _getItem({ id, keyword, date }) {
    return `
      <li data-keyword="${keyword}">
        ${keyword}
        <span class="date">${formatRelativeDate(date)}</span>
        <button class="btn-remove"></button>
      </li>
    `;
  }
};
