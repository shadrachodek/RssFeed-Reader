class ItemContainer extends EventTarget
{

  constructor(selector)
  {
    super();
    this.el = document.querySelector(selector);
    this.items = []
  }

  loadItems(item)
  {
  }

  setActiveItem(item)
  {
    this.items.forEach(thing =>
    {
      thing.active = thing === item;
    });

    let event = new CustomEvent('selectedItemChanged', { detail: item });
    this.dispatchEvent(event);
  }

}

class FeedContainer extends ItemContainer
{

  constructor(selector)
  {
    super(selector);
  }

  loadItems(feeds)
  {
    feeds.forEach((feed) =>
    {
      let obj = new Feed(feed);
      this.items.push(obj);
      obj.addEventListener('activate', (e) =>
      {
        this.setActiveItem(e.target);
      });

      this.el.appendChild(obj.render());
    });
  }

}

class ArticleContainer extends ItemContainer
{

  constructor(selector)
  {
    super(selector);
  }

  loadItems(articles)
  {
    articles.forEach((article) =>
    {
      let obj = new Article(article);
      this.items.push(obj);
      obj.addEventListener('activate', (e) =>
      {
        this.setActiveItem(e.target);
      });

      this.el.appendChild(obj.render());
    });
  }

}