/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{461:function(t,e,r){"use strict";var n={components:{},props:{templateClasses:{type:String,default:"Template-Article _section-page _margin-center _margin-top-2 _margin-bottom-2 _padding-top-2 _padding-bottom-2  "},mainClasses:{type:String,default:"Template--Main _section-content _margin-bottom _margin-center "},articleClasses:{type:String,default:"_section-article _margin-center"}},data:function(){return{isMounted:!1}},computed:{},beforeCreate:function(){},mounted:function(){this.isMounted=!0},beforeDestroy:function(){},methods:{pathMatch:function(path){return!!this.route.path&&(this.route.path==path||void 0)}}},o=r(6),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{class:t.templateClasses},[r("div",{class:t.mainClasses},[t._t("container",[r("div",{class:t.articleClasses},[t._t("header"),t._v(" "),t._t("default"),t._v(" "),t._t("footer")],2)])],2)])}),[],!1,null,null,null);e.a=component.exports},550:function(t,e,r){"use strict";r.r(e);var n=r(4),o=r.n(n),c=r(7),l=r.n(c),f=r(3),h=r.n(f),d=r(10),v=r.n(d),y=r(20),article=r(461),m=r(464);function w(){w=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},c=n.iterator||"@@iterator",l=n.asyncIterator||"@@asyncIterator",f=n.toStringTag||"@@toStringTag";function h(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{h({},"")}catch(t){h=function(t,e,r){return t[e]=r}}function d(t,e,r,n){var o=e&&e.prototype instanceof m?e:m,c=Object.create(o.prototype),l=new N(n||[]);return c._invoke=function(t,e,r){var n="suspendedStart";return function(o,c){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw c;return G()}for(r.method=o,r.arg=c;;){var l=r.delegate;if(l){var f=P(l,r);if(f){if(f===y)continue;return f}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var h=v(t,e,r);if("normal"===h.type){if(n=r.done?"completed":"suspendedYield",h.arg===y)continue;return{value:h.arg,done:r.done}}"throw"===h.type&&(n="completed",r.method="throw",r.arg=h.arg)}}}(t,r,l),c}function v(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=d;var y={};function m(){}function _(){}function O(){}var x={};h(x,c,(function(){return this}));var L=Object.getPrototypeOf,j=L&&L(L(A([])));j&&j!==e&&r.call(j,c)&&(x=j);var E=O.prototype=m.prototype=Object.create(x);function k(t){["next","throw","return"].forEach((function(e){h(t,e,(function(t){return this._invoke(e,t)}))}))}function C(t,e){var n;this._invoke=function(c,l){function f(){return new e((function(n,f){!function n(c,l,f,h){var d=v(t[c],t,l);if("throw"!==d.type){var y=d.arg,m=y.value;return m&&"object"==o()(m)&&r.call(m,"__await")?e.resolve(m.__await).then((function(t){n("next",t,f,h)}),(function(t){n("throw",t,f,h)})):e.resolve(m).then((function(t){y.value=t,f(y)}),(function(t){return n("throw",t,f,h)}))}h(d.arg)}(c,l,n,f)}))}return n=n?n.then(f,f):f()}}function P(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,P(t,e),"throw"===e.method))return y;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return y}var n=v(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,y;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,y):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,y)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function T(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function N(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function A(t){if(t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var i=-1,n=function e(){for(;++i<t.length;)if(r.call(t,i))return e.value=t[i],e.done=!1,e;return e.value=void 0,e.done=!0,e};return n.next=n}}return{next:G}}function G(){return{value:void 0,done:!0}}return _.prototype=O,h(E,"constructor",O),h(O,"constructor",_),_.displayName=h(O,f,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===_||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,O):(t.__proto__=O,h(t,f,"GeneratorFunction")),t.prototype=Object.create(E),t},t.awrap=function(t){return{__await:t}},k(C.prototype),h(C.prototype,l,(function(){return this})),t.AsyncIterator=C,t.async=function(e,r,n,o,c){void 0===c&&(c=Promise);var l=new C(d(e,r,n,o),c);return t.isGeneratorFunction(r)?l:l.next().then((function(t){return t.done?t.value:l.next()}))},k(E),h(E,f,"Generator"),h(E,c,(function(){return this})),h(E,"toString",(function(){return"[object Generator]"})),t.keys=function(object){var t=[];for(var e in object)t.push(e);return t.reverse(),function e(){for(;t.length;){var r=t.pop();if(r in object)return e.value=r,e.done=!1,e}return e.done=!0,e}},t.values=A,N.prototype={constructor:N,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(T),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return c.type="throw",c.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],c=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var l=r.call(o,"catchLoc"),f=r.call(o,"finallyLoc");if(l&&f){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(l){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!f)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,e){for(var i=this.tryEntries.length-1;i>=0;--i){var n=this.tryEntries[i];if(n.tryLoc<=this.prev&&r.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var c=o?o.completion:{};return c.type=t,c.arg=e,o?(this.method="next",this.next=o.finallyLoc,y):this.complete(c)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var i=this.tryEntries.length-1;i>=0;--i){var e=this.tryEntries[i];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),T(e),y}},catch:function(t){for(var i=this.tryEntries.length-1;i>=0;--i){var e=this.tryEntries[i];if(e.tryLoc===t){var r=e.completion;if("throw"===r.type){var n=r.arg;T(e)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:A(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),y}},t}function _(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function O(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?_(Object(source),!0).forEach((function(e){v()(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):_(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var x,L={components:{Template:article.a,NodeForm:m.a},layout:"contentframe",middleware:"pageload",meta:{tableQueries:["_content","atoms-alerts"],refreshOnLoad:!0},data:function(){return{activeTab:"Active",content:this.$cytosis.findOne("join-researcher-content",this.$store.state.Content,"Markdown"),form:this.$cytosis.findOne("form-join-researcher",this.$store.state.Content)}},computed:O(O({},Object(y.b)(["Atoms"])),{},{alerts:function(){return this.Atoms.filter((function(t){return"Alert"==t.fields["Atom:Type"]}))},active:function(){return this.alerts.filter((function(t){return"Resolved"!==t.fields["Data:Status"]}))},resolved:function(){return this.alerts.filter((function(t){return"Resolved"===t.fields["Data:Status"]}))}}),asyncData:(x=h()(w().mark((function t(e){return w().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return l()(e),t.abrupt("return",{});case 2:case"end":return t.stop()}}),t)}))),function(t){return x.apply(this,arguments)}),mounted:function(){},methods:{}},j=r(6),component=Object(j.a)(L,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"Join-Research"},[r("Template",{scopedSlots:t._u([{key:"container",fn:function(){return[r("div",{staticClass:"_section-article"},[r("div",{staticClass:"_margin-bottom"},[r("nuxt-link",{staticClass:"_button CTA --join --short ",attrs:{to:"/join"}},[t._v("⬅︎ Go Back")])],1),t._v(" "),r("h1",{staticClass:"_font-normal --title"},[t._v("Researchers")]),t._v(" "),r("div",{domProps:{innerHTML:t._s(t.$md.render(t.content||""))}})]),t._v(" "),r("NodeForm",{attrs:{src:t.form}})]},proxy:!0}])})],1)}),[],!1,null,null,null);e.default=component.exports}}]);