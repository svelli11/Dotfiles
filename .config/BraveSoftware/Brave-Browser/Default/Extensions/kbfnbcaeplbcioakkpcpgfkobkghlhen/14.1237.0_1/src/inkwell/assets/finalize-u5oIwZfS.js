import{at as u,au as o,aD as f,ai as i}from"./start-BFd-djfI.js";function p(r){return u(function(a,n){var t=[];return a.subscribe(o(n,function(e){return t.push(e)},function(){n.next(t),n.complete()})),f(r).subscribe(o(n,function(){var e=t;t=[],n.next(e)},i)),function(){t=null}})}function l(r){return u(function(a,n){try{a.subscribe(n)}finally{n.add(r)}})}export{p as b,l as f};
//# sourceMappingURL=finalize-u5oIwZfS.js.map
