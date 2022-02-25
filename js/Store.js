import { createNextId } from './helpers.js';
import { TabType } from './views/TabView.js';

const tag = "[Store]";

export default class Store {
  constructor(storage) {
    console.log(tag);

    if (!storage) throw "no storage";

    this.storage = storage;

    this.resetSearch();
    this.resetSelectedTab();
  }

  search(keyword) {
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter((product) => product?.name?.includes(keyword))
    this.addHistory(keyword);
  }

  resetSearch() {
    this.searchKeyword = '';
    this.searchResult = [];
  }

  resetSelectedTab(selectedTab = TabType.KEYWORD) {
    this.selectedTab = selectedTab;
  }

  getKeywordList() {
    return this.storage.keywordData;
  }

  getHistoryList() {
    return this.storage.historyData.sort(this._sortHistory);
  }

  _sortHistory(h1, h2) {
    return h2.date > h1.date;
  }

  addHistory(keyword) {
    keyword = keyword?.trim();

    if (!keyword) {
      return;
    }

    const hasHistory = this.storage.historyData.some((history) => history.keyword === keyword);

    if (hasHistory) {
      this.removeHistory(keyword);
    }

    this.storage.historyData.push({
      id: createNextId(this.storage.historyData),
      keyword,
      date: new Date(),
    });
  }

  removeHistory(keyword) {
    this.storage.historyData = this.storage.historyData
      .filter((history) => history.keyword !== keyword);
  }
}
