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
- resolver 希望由 fluxx 內部提供方法（未實作）
- singleton - 每個 request 都有獨立的 new Fluxx() store action component 提供方法取得該 flux 的 instance。
- checksum - dehydrate / rehydrate

## usage 

### action
```js
Fluxx.action({
  all: function() {
    var flux = this;
    flux.dispatch({actionType: 'all'});
  }
});
```
### store
```js
Fluxx.store('list', function() {
  var flux = this;
  flux.register(function(payload) {
    //...
  });
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
    }
  }
});
```
### component

```js
var List = React.createClass({
	mixins: [Fluxx.mixin(React)],
	getInitialState: function() {
		this.list = this.flux().getStore('list');
		return {items: this.list.getItems()};
	}
	render: function() {
	  //...
	}
});
```

### create context

```js
var flux = new Fluxx();
flux.rehydrate(window.__dehydrated);
React.render(<App flux={flux} />, document.getElementById('container'));
```
