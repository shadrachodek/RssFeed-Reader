class Item extends EventTarget {
  constructor() {
    super();
    this.text = '';
    this.url = '';
    this.el = document.createElement('a');
    this.el.classList.add('list-group-item', 'list-group-item-action');
    this.el.addEventListener('click', (e) =>
    {
      e.preventDefault();
      let event = new CustomEvent('activate');
      this.dispatchEvent(event);
    });
  }

  render()
  {
    this.el.innerHTML = this.text;
    this.el.href = this.url;
    return this.el;
  }

  set active(value)
  {
    let method = value ? 'add' : 'remove';
    this.el.classList[method]('active');
  }


}

class Feed extends Item{
  constructor(feed) {
    super();
    this.text = feed.name;
    this.url = feed.url;
  }
}

class Article extends Item
{
  constructor(article)
  {
    super();
    this.text = article.title;
    this.url = article.link;
  }
}