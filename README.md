# fluxx
isomorphic flux 

## 簡介
啟發自 
 - https://dl.dropboxusercontent.com/u/3813488/codebeer20150424-isomorphic-goflux.pdf 
 - https://github.com/tomchentw/goflux
 
試著用最簡短的實作解決 react isomorphic 的基本問題
 - How to render after all stores are populated?
 - Singleton issue
 - Checksum mismatch
 
解法
- resolver 由 fluxxx 提供 ready 來檢查
- singleton - 每個 request 都有獨立的 new Fluxxx() store action component 提供方法取得該 flux 的 instance。
- checksum - dehydrate / rehydrate

## usage 

### Action
```js
Fluxxx.action({
  all: function() {
    var flux = this.flux;
    // return promise
    return fetch('/api/list.json').then(function(res) {
      return res.json();
    }).then(function(data) {
      flux.getActions().initial(data);
      return data;
    });
  },
  initial: function(data) {
    this.flux.getActions().initial.dispatch(data);
  }
});
```
### Store
```js
Fluxxx.store('list', function() {
  var flux = this.flux;
  var list = [1, 2, 3];
  return {
    getList: function() {
      return list;
    },
    dehydrate: function() {
      return [list];
    },
    rehydrate: function(state) {
      list = state[0];
    },
    dispatchToken: flux.listenTo('list', function(on) {
      on(actions.pop, 'onPop');
      on(actions.push, 'onPush');      
      on(actions.initial, 'onInitial');
    }
  }
});
```
### Component

```js
var List = React.createClass({
	mixins: [Fluxxx.mixin(React)],
	getInitialState: function() {
		this.list = this.flux().getStore('list');
		return {items: this.list.getItems()};
	}
	render: function() {
	  //...
	}
});
```

### Create context

```js
var flux = new Fluxxx();
flux.rehydrate(window.__dehydrated);
React.render(<App flux={flux} />, document.getElementById('container'));
```

### Create context in server side

```js
var flux = new Fluxxx();
var app = React.createElement(App, {flux: flux});
React.renderToString(app);
flux.ready(function() {
  var html = React.renderToString(app);
  res.render('index', {html: html, dehydratedStr: JSON.stringify(flux.dehydrate())});
});
```
