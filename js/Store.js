const tag = "[Store]";

export default class Store {
  constructor(storage) {
    console.log(tag);

    if (!storage) throw "no storage";

    this.storage = storage;

    this.reset();
  }

  search(keyword) {
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter((product) => product?.name?.includes(keyword))
  }

  reset() {
    this.searchKeyword = '';
    this.searchResult = [];
  }
}
