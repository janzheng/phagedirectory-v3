/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{461:function(t,e,r){"use strict";var n={components:{},props:{templateClasses:{type:String,default:"Template-Article _section-page _margin-center _margin-top-2 _margin-bottom-2 _padding-top-2 _padding-bottom-2  "},mainClasses:{type:String,default:"Template--Main _section-content _margin-bottom _margin-center "},articleClasses:{type:String,default:"_section-article _margin-center"}},data:function(){return{isMounted:!1}},computed:{},beforeCreate:function(){},mounted:function(){this.isMounted=!0},beforeDestroy:function(){},methods:{pathMatch:function(path){return!!this.route.path&&(this.route.path==path||void 0)}}},o=r(6),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{class:t.templateClasses},[r("div",{class:t.mainClasses},[t._t("container",[r("div",{class:t.articleClasses},[t._t("header"),t._v(" "),t._t("default"),t._v(" "),t._t("footer")],2)])],2)])}),[],!1,null,null,null);e.a=component.exports},466:function(t,e,r){"use strict";var n=r(10),o=r.n(n);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){o()(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={components:{},props:{activeTab:String,left:Object,right:Object,tabAttrs:{type:String,default:"_grid-3-1-sm Tabbed-mobile"},tabOuterAttrs:{type:String,default:"_margin-bottom-2"}},data:function(){return{}},computed:{both:function(){return l(l({},this.left),this.right)},contents:function(){var t=this;return Object.keys(this.both).filter((function(e){return e==t.activeTab}))}},methods:{clickHandler:function(t,e){this.$emit("".concat(e),t),this.$emit("tabClick",t,e),this.$router.push({path:this.$router.currentRoute.path,query:{tab:this.$slugify(e)}})},classes:function(t,e){var r=t.attrs;return(t.active||this.activeTab==e)&&(r+=" --active"),r}}},d=r(6),component=Object(d.a)(f,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"Tabbed",class:t.tabOuterAttrs},[r("div",{staticClass:"Tabbed-container"},[r("div",{staticClass:"Tabbed-menu",class:t.tabAttrs},[t._t("left",[t.left?r("div",{staticClass:"Tabbed-links Tabbed-left"},t._l(Object.keys(t.left),(function(e){return r("div",{key:e,staticClass:"Tabbed-tab _relative",class:t.classes(t.left[e],e),attrs:{id:e}},[t.left[e].link?r("nuxt-link",{staticClass:" _relative",class:t.classes(t.left[e]),attrs:{to:t.left[e].link}},[t._v(t._s(e))]):r("span",{staticClass:" _relative",class:t.classes(t.left[e]),on:{click:function(r){return t.clickHandler(t.left[e],e)}}},[t._v(t._s(e))])],1)})),0):t._e()]),t._v(" "),t._t("right",[t.right?r("div",{staticClass:"Tabbed-links Tabbed-right"},t._l(Object.keys(t.right),(function(e){return r("div",{key:e,staticClass:"Tabbed-tab _relative",class:t.classes(t.right[e],e),attrs:{id:e}},[t.right[e].link?r("nuxt-link",{staticClass:" _relative",class:t.classes(t.right[e]),attrs:{to:t.right[e].link}},[t._v(t._s(e))]):r("span",{staticClass:" _relative",class:t.classes(t.right[e]),on:{click:function(r){return t.clickHandler(t.right[e],e)}}},[t._v(t._s(e))])],1)})),0):t._e()])],2)]),t._v(" "),t._t("default",[r("div",{staticClass:"Tabbed-contents"},t._l(t.contents,(function(e){return r("div",{key:e+"_content",staticClass:"Tabbed-contents-block _relative",attrs:{id:e+"_content"}},[t._t(e)],2)})),0)])],2)}),[],!1,null,"5f0aa3b6",null);e.a=component.exports},530:function(t,e,r){"use strict";r.r(e);var n=r(10),o=r.n(n),c=r(20),l=r(90),f=r(4),d=r.n(f),h=r(3);function v(){v=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",c=n.asyncIterator||"@@asyncIterator",l=n.toStringTag||"@@toStringTag";function f(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(t){f=function(t,e,r){return t[e]=r}}function h(t,e,r,n){var o=e&&e.prototype instanceof y?e:y,c=Object.create(o.prototype),l=new $(n||[]);return c._invoke=function(t,e,r){var n="suspendedStart";return function(o,c){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw c;return M()}for(r.method=o,r.arg=c;;){var l=r.delegate;if(l){var f=x(l,r);if(f){if(f===_)continue;return f}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var d=m(t,e,r);if("normal"===d.type){if(n=r.done?"completed":"suspendedYield",d.arg===_)continue;return{value:d.arg,done:r.done}}"throw"===d.type&&(n="completed",r.method="throw",r.arg=d.arg)}}}(t,r,l),c}function m(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=h;var _={};function y(){}function w(){}function O(){}var C={};f(C,o,(function(){return this}));var k=Object.getPrototypeOf,E=k&&k(k(S([])));E&&E!==e&&r.call(E,o)&&(C=E);var j=O.prototype=y.prototype=Object.create(C);function L(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function D(t,e){var n;this._invoke=function(o,c){function l(){return new e((function(n,l){!function n(o,c,l,f){var h=m(t[o],t,c);if("throw"!==h.type){var v=h.arg,_=v.value;return _&&"object"==d()(_)&&r.call(_,"__await")?e.resolve(_.__await).then((function(t){n("next",t,l,f)}),(function(t){n("throw",t,l,f)})):e.resolve(_).then((function(t){v.value=t,l(v)}),(function(t){return n("throw",t,l,f)}))}f(h.arg)}(o,c,n,l)}))}return n=n?n.then(l,l):l()}}function x(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,x(t,e),"throw"===e.method))return _;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return _}var n=m(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,_;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,_):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,_)}function T(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function P(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function $(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(T,this),this.reset(!0)}function S(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var i=-1,n=function e(){for(;++i<t.length;)if(r.call(t,i))return e.value=t[i],e.done=!1,e;return e.value=void 0,e.done=!0,e};return n.next=n}}return{next:M}}function M(){return{value:void 0,done:!0}}return w.prototype=O,f(j,"constructor",O),f(O,"constructor",w),w.displayName=f(O,l,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===w||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,O):(t.__proto__=O,f(t,l,"GeneratorFunction")),t.prototype=Object.create(j),t},t.awrap=function(t){return{__await:t}},L(D.prototype),f(D.prototype,c,(function(){return this})),t.AsyncIterator=D,t.async=function(e,r,n,o,c){void 0===c&&(c=Promise);var l=new D(h(e,r,n,o),c);return t.isGeneratorFunction(r)?l:l.next().then((function(t){return t.done?t.value:l.next()}))},L(j),f(j,l,"Generator"),f(j,o,(function(){return this})),f(j,"toString",(function(){return"[object Generator]"})),t.keys=function(object){var t=[];for(var e in object)t.push(e);return t.reverse(),function e(){for(;t.length;){var r=t.pop();if(r in object)return e.value=r,e.done=!1,e}return e.done=!0,e}},t.values=S,$.prototype={constructor:$,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(P),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return c.type="throw",c.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],c=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var l=r.call(o,"catchLoc"),f=r.call(o,"finallyLoc");if(l&&f){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(l){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!f)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,e){for(var i=this.tryEntries.length-1;i>=0;--i){var n=this.tryEntries[i];if(n.tryLoc<=this.prev&&r.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var c=o?o.completion:{};return c.type=t,c.arg=e,o?(this.method="next",this.next=o.finallyLoc,_):this.complete(c)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),_},finish:function(t){for(var i=this.tryEntries.length-1;i>=0;--i){var e=this.tryEntries[i];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),P(e),_}},catch:function(t){for(var i=this.tryEntries.length-1;i>=0;--i){var e=this.tryEntries[i];if(e.tryLoc===t){var r=e.completion;if("throw"===r.type){var n=r.arg;P(e)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:S(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),_}},t}var m,_={props:{atom:Object},data:function(){return{}},computed:{},mounted:(m=r.n(h)()(v().mark((function t(){return v().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)}))),function(){return m.apply(this,arguments)}),methods:{}},y=r(6),w=Object(y.a)(_,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"Event _card _padding "},[r("div",{staticClass:"Event-header "},[r("div",{staticClass:"Event-date _font-small"},[r("span",[t._v(t._s(t._f("niceDate")(t.atom.fields["Data:Date"])))]),t._v(" "),t.atom.fields["Data:DateEnd"]?r("span",[t._v(" – "+t._s(t._f("niceDate")(t.atom.fields["Data:DateEnd"])))]):t._e()]),t._v(" "),r("h5",{staticClass:"Event-title _font-bold _margin-top-half _padding-bottom-half"},[t.atom.fields.URL?r("a",{attrs:{href:t.atom.fields.URL,target:"_blank"}},[t.atom.fields["Data:Title"]?r("h4",{staticClass:"_inline _md-p_fix _padding-bottom-half",domProps:{innerHTML:t._s(t.$md.strip(t.$md.render(t.atom.fields["Data:Title"]||"")))}}):t._e()]):r("h4",{staticClass:"_inline _md-p_fix _padding-bottom-half",domProps:{innerHTML:t._s(t.$md.strip(t.$md.render(t.atom.fields["Data:Title"]||"")))}})]),t._v(" "),r("div",{staticClass:"Event-info _margin-bottom _margin-top-half"},[t.atom.fields["Data:Subtitle"]?r("div",{staticClass:"_font-bold _md-pfix",domProps:{innerHTML:t._s(t.$md.render(t.atom.fields["Data:Subtitle"]||""))}}):t._e(),t._v(" "),t.atom.fields["Data:Source"]?r("div",{staticClass:"_margin-top _margin-bottom _padding _card _md-pfix",domProps:{innerHTML:t._s(t.$md.render(t.atom.fields["Data:Source"]||""))}}):t._e()])]),t._v(" "),r("div",{staticClass:"Event-content"},[r("div",[t.atom.fields["Meta:Name"]&&t.atom.fields["Meta:Name"][0]?r("div",{staticClass:" _grid-1-6-xs _align-vertically"},[r("span",{staticClass:"Dir-label "},[t._v("Website ")]),r("a",{staticClass:"--wordbreak",attrs:{href:t.atom.fields.URL,target:"_blank"}},[t._v(t._s(t.atom.fields.URL))]),t._v(" "),r("span",{staticClass:"Dir-label"},[t._v("Location ")]),r("span",[t._v(t._s(t.atom.fields["Meta:Name"][0]))])]):t._e()]),t._v(" "),t.atom.fields.Markdown?r("div",{staticClass:"_margin-top",domProps:{innerHTML:t._s(t.$md.render(t.atom.fields.Markdown||""))}}):t._e()])])}),[],!1,null,null,null).exports,O=r(466),C=r(464);function k(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function E(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?k(Object(source),!0).forEach((function(e){o()(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):k(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var j={components:{Event:w,Template:r(461).a,Tabbed:O.a,NodeForm:C.a},layout:"contentframe",middleware:"pageload",meta:{tableQueries:["_content-copy","atoms-events"],refreshOnLoad:!0},data:function(){var t=this;return Object(l.a)({_key:"keyAe6M1KoPfg25aO",_base:"appYvj7j9Ta5I15ks",store:this.$store,routeName:"{events}",query:"_content-slug",keyword:"form-event"}).then((function(data){data.tables.Content&&data.tables.Content[0]&&(t.form=data.tables.Content[0])})),{activeTab:"Upcoming Events",leftData:{"Upcoming Events":{},"Past Events":{}},rightData:{"Add an Event":{}},intro:this.$cytosis.findField("events-intro",this.$store.state.Content,"Markdown"),form:null}},computed:E(E({},Object(c.b)(["Atoms"])),{},{events:function(){return this.Atoms.filter((function(t){return"Event"==t.fields["Atom:Type"]}))},featured:function(){return this.events.filter((function(t){return t.fields["Data:Date"]})).reverse()},past:function(){var t=this;return this.events.filter((function(e){var r=e.fields["Data:Date"];return!t.$dayjs().isBefore(t.$dayjs(String(r)))})).reverse()},upcoming:function(){var t=this;return this.events.filter((function(e){var r=e.fields["Data:Date"];return t.$dayjs().isBefore(t.$dayjs(String(r)))}))}}),mounted:function(){this.$router.currentRoute.query&&this.$router.currentRoute.query.tab&&(this.activeTab=this.$router.currentRoute.query.tab.replace(/[-]/g," ")),this.$segmentize({segment:this.$segment,type:"page",event:"Events",data:{path:this.$route.path}})},methods:{tabClick:function(t,e){this.activeTab=e}}},L=Object(y.a)(j,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"Events"},[r("Template",{attrs:{"template-classes":"_margin-center"},scopedSlots:t._u([{key:"container",fn:function(){return[r("div",{staticClass:"_section-article _margin-center"},[r("div",{staticClass:"_padding-bottom-2",domProps:{innerHTML:t._s(t.$md.render(t.intro||""))}}),t._v(" "),r("Tabbed",t._g({attrs:{left:t.leftData,right:t.rightData,"active-tab":t.activeTab}},{tabClick:t.tabClick}),[r("template",{slot:"Upcoming Events"},[r("div",{staticClass:"_padding-top"},[r("no-ssr",[t.upcoming?r("div",[r("div",{staticClass:"Leaflet _hidden-xs _margin-bottom",staticStyle:{height:"50vh"},attrs:{id:"map-wrap"}},[r("l-map",{staticClass:"Leaflet-map",attrs:{zoom:1,center:[47.41322,-1.219482]}},[r("l-tile-layer",{attrs:{url:"http://{s}.tile.osm.org/{z}/{x}/{y}.png",attribution:"Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a>"}}),t._v(" "),t._l(t.upcoming,(function(e){return r("l-marker",{key:e.id,staticClass:"Leaflet-marker",attrs:{"lat-lng":e.fields["Meta:LatLng"][0].split(",")}},[r("l-tooltip",{staticClass:"Leaflet-tooltip"},[t._v("\n                          "+t._s(e.fields.Name)+"\n                          "),r("div",{staticClass:"_font-small"},[r("span",[t._v(t._s(t._f("niceDate")(e.fields["Data:Date"])))]),t._v(" "),e.fields["Data:DateEnd"]?r("span",[t._v(" – "+t._s(t._f("niceDate")(e.fields["Data:DateEnd"])))]):t._e()])])],1)})),t._v(" "),r("l-tile-layer",{attrs:{url:"http://{s}.tile.osm.org/{z}/{x}/{y}.png"}})],2)],1),t._v(" "),t._l(t.upcoming,(function(t){return r("Event",{key:t.id,attrs:{atom:t}})}))],2):t._e()])],1)]),t._v(" "),r("template",{slot:"Past Events"},[r("div",{staticClass:" _padding-top"},t._l(t.past,(function(t){return r("Event",{key:t.id,attrs:{atom:t}})})),1)]),t._v(" "),r("template",{slot:"Add an Event"},[r("div",{staticClass:" _padding-top"},[t.form?r("NodeForm",{attrs:{src:t.form}}):t._e()],1)])],2)],1)]},proxy:!0}])})],1)}),[],!1,null,null,null);e.default=L.exports}}]);