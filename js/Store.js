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
}
