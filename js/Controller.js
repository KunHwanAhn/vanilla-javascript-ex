import { on } from './helpers.js';
import { TabType } from './views/TabView.js';

const tag = '[Controller]';

export default class Controller {
  constructor(store, {
    searchFormView,
    searchResultView,
    tabView,
    keywordListView,
  }) {
    console.log(tag);

    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;
    this.keywordListView = keywordListView;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    this.searchFormView
      .on('@submit', (event) => { this.search(event?.detail?.value); })
      .on('@reset', () => this.reset() );

    this.tabView
      .on('@change', (event) => { this.changeTab(event?.detail); });

    this.keywordListView
      .on('@click', (event) => { this.search(event?.detail?.value); });
  }

  search(keyword) {
    this.store.search(keyword);
    this.render();
  }

  reset() {
    this.store.resetSearch();
    this.render();
  }

  changeTab(tab) {
    this.store.resetSelectedTab(tab);
    this.render();
  }

  render() {
    if (this.store.searchKeyword?.length > 0) {
      this.renderSearchResult();
      return;
    }

    this.tabView.show(this.store.selectedTab);
    if (this.store.selectedTab === TabType.KEYWORD) {
      this.keywordListView.show(this.store.getKeywordList());
    } else  if (this.store.selectedTab === TabType.HISTORY) {
      this.keywordListView.hide();
    } else {
      throw '사용할 수 없는 탭입니다.';
    }

    this.searchResultView.hide();
  }

  renderSearchResult() {
    this.searchFormView.show(this.store.searchKeyword);
    this.tabView.hide();
    this.keywordListView.hide();
    this.searchResultView.show(this.store.searchResult);
  }
}
