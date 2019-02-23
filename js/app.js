(() => {
  let app = {
    articles: new ArticleContainer('#article-list-container'),
    feeds: new FeedContainer('#feed-list-container'),
    init() {
      this.feeds.addEventListener('selectedItemChanged', (e) => {
        this.loadFeed(e.detail);
      });

      this.fetchFeeds();
    },
    fetchFeeds() {
      axios.get('/js/feeds.json').then((res) =>
      {
        this.loadFeeds(res.data);
      });
    },

    loadFeeds(feedData) {
      this.feeds.loadItems(feedData)
    },

    loadFeed(feeds) {
      let proxy = 'https://cors-anywhere.herokuapp.com/';
      let parser = new RSSParser();
      parser.parseURL(`${proxy}${feeds.url}`).then((result) => {
        this.articles.loadItems(result.items);
      });
    }
  }

  app.init();
})();