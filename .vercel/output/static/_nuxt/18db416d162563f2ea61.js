/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{463:function(t,e,r){"use strict";var n={components:{},props:{templateClasses:String,mainClasses:{type:String,default:"Template--Main "},gridClasses:{type:String,default:"Template--Main-Sidebar _grid-2-1-sm _grid-gap "},headerClasses:{type:String,default:"Template--Header _section-content _margin-bottom _margin-center _margin-top-none-i"},sidebarClasses:{type:String,default:"_sidebar"},sidebarContainerClasses:{type:String}},layout:"contentframe",middleware:"pageload",data:function(){return{isMounted:!1}},computed:{},beforeCreate:function(){},mounted:function(){this.isMounted=!0},beforeDestroy:function(){},methods:{pathMatch:function(path){return!!this.route.path&&(this.route.path==path||void 0)}}},o=r(6),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"Template-Context _section-page _margin-center _padding-top-2 _padding-bottom-2 ",class:t.templateClasses},[t._t("header-container",[r("div",{class:t.headerClasses},[t._t("header")],2)]),t._v(" "),r("div",{class:t.gridClasses},[t._t("sidebar-container",[r("div",{staticClass:"Template--Sidebar",class:t.sidebarContainerClasses},[r("nav",{class:t.sidebarClasses},[t._t("sidebar"),t._v(" "),t._t("context")],2)])]),t._v(" "),t._t("main-container",[r("div",{class:t.mainClasses},[t._t("default")],2)])],2),t._v(" "),t._t("footer-container",[r("div",{staticClass:"Template--Footer"},[t._t("footer")],2)])],2)}),[],!1,null,null,null);e.a=component.exports},533:function(t,e,r){"use strict";r.r(e);var n=r(4),o=r.n(n),l=r(3),c=r.n(l),d=r(10),h=r.n(d),f=r(20),v=r(90),_={props:{lab:Object,phageCollections:Array},computed:{getTwitter:function(){var t=this.lab.fields["Social:Twitter"];if(t)return"@"==t.substring(0,1)?"https://twitter.com/"+t:"http"==t.substring(0,4)?t:"https://twitter.com/"+t},getCleanTwitter:function(){if(this.getTwitter){var t=this.getTwitter.lastIndexOf("@")||this.getTwitter.lastIndexOf("/");return"@"+this.getTwitter.substring(t+1)}},url:function(){var t=this.lab.fields.URL;if(t)return"http"!=t.substring(0,4)&&(t="https://"+t),t},roles:function(){var t=this.lab.fields.Roles;if(t)return t.join(", ")},PIs:function(){var t=this;if(this.lab.fields["People:Supervisor"]){var e=[];return this.lab.fields["People:Supervisors::Names"].map((function(r,i){e.push({name:t.lab.fields["People:Supervisors::Names"][i],slug:t.lab.fields["People:Supervisors::Slugs"]?t.lab.fields["People:Supervisors::Slugs"][i]:""})})),e}},contactPersons:function(){var t=this;if(this.lab.fields["People:Contact::Names"]){var e=[];return this.lab.fields["People:Contact::Names"].map((function(r,i){var n="";t.lab.fields["People:Contact::Slugs"]&&(n=t.lab.fields["People:Contact::Slugs"][i]),e.push({name:t.lab.fields["People:Contact::Names"][i],slug:n})})),e}},members:function(){var t=this;if(this.lab.fields["People:LabMembers::Names"]){var e=[];return this.lab.fields["People:LabMembers::Names"].map((function(r,i){var n="";t.lab.fields["People:LabMembers::Slugs"]&&(n=t.lab.fields["People:LabMembers::Slugs"][i]),e.push({name:t.lab.fields["People:LabMembers::Names"][i],slug:n})})),e}},linkedPhageCollections:function(){return this.$cytosis.getLinkedRecords(this.lab.fields.PhageCollections,this.phageCollections,!0).reverse()}},methods:{sortHostNames:function(t){var e=t.fields["Hosts::Names"],r=t.fields["Hosts::Slugs"],n=e.map((function(t,i){return[t,r[i]]}));return n=n.sort((function(a,b){return(""+a[0]).localeCompare(b[0])}))}}},m=r(6),y=Object(m.a)(_,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"Lab Lab-Card Dir-card ",attrs:{id:t.lab.fields.Slug}},[r("div",{staticClass:"Lab-container"},[r("div",{staticClass:"Lab-info _width-100"},[r("div",{staticClass:" Dir-section _flex-row _flex-vertically"},[r("div",{staticClass:"Dir-title _flex-1"},[r("span",[t._v(t._s(t.lab.fields.Name))])]),t._v(" "),r("div",{staticClass:"Dir-social "},[t.lab.fields["Social:Twitter"]?r("a",{staticClass:"Dir-icon --url",attrs:{href:""+t.getTwitter}},[r("span",{staticClass:"_font-phage icon-twitter"})]):t._e(),t._v(" "),t.lab.fields["Social:Linkedin"]?r("a",{staticClass:"Dir-icon --url",attrs:{href:""+t.lab.fields["Social:Linkedin"]}},[r("span",{staticClass:"_font-phage icon-linkedin"})]):t._e()])]),t._v(" "),r("div",{staticClass:"Dir-body _grid-1-2 _grid-gap-large"},[r("div",{staticClass:"Dir-section Dir-basic"},[t.lab.fields.Markdown?r("div",{staticClass:"Dir-description Dir-block"},[t._v("\n            "+t._s(t.lab.fields.Markdown)+"\n          ")]):t._e(),t._v(" "),t.lab.fields["Orgs:Parent:Name"]?r("div",{staticClass:"Lab-parent Dir-block"},[r("div",{staticClass:"Dir-label"},[t._v("University")]),t._v(" "),r("span",[t._v(t._s(t.lab.fields["Orgs:Parent:Name"]+""))])]):t._e(),t._v(" "),t.url?r("div",{staticClass:"Dir-link Dir-block"},[r("div",{staticClass:"Dir-label"},[t._v("Website")]),t._v(" "),r("a",{staticClass:"_wordbreak --url",attrs:{href:t.url}},[t._v(t._s(t.url))])]):t._e(),t._v(" "),t.lab.fields["Social:Twitter"]?r("div",{staticClass:"Dir-link Dir-block"},[r("div",{staticClass:"Dir-label"},[t._v("Twitter")]),t._v(" "),r("a",{staticClass:"_wordbreak --url",attrs:{href:""+t.getTwitter}},[t._v(t._s(t.getCleanTwitter))])]):t._e(),t._v(" "),t.PIs?r("div",{staticClass:"Dir-block"},[r("div",{staticClass:"Dir-label"},[t._v("Principal Investigator"),t.PIs.length>1?r("span",[t._v("s")]):t._e()]),t._v(" "),t._l(t.PIs,(function(e){return r("span",{key:e.name},[e.slug?r("a",{staticClass:"_wordbreak --url _block",attrs:{href:"/people#"+e.slug}},[t._v(t._s(e.name))]):r("div",[t._v(t._s(e.name))])])}))],2):t._e(),t._v(" "),t.contactPersons?r("div",{staticClass:"Dir-block"},[r("div",{staticClass:"Dir-label"},[t._v("Lab Contact"),t.contactPersons.length>1?r("span",[t._v("s")]):t._e()]),t._v(" "),t._l(t.contactPersons,(function(e){return r("span",{key:e.name},[e.slug?r("a",{staticClass:"_wordbreak --url _block",attrs:{href:"/people#"+e.slug}},[t._v(t._s(e.name))]):r("div",[t._v(t._s(e.name))])])}))],2):t._e(),t._v(" "),t.members?r("div",{staticClass:"Dir-block"},[r("div",{staticClass:"Dir-label"},[t._v("\n              Lab Member"),t.members.length>1?r("span",[t._v("s")]):t._e()]),t._v(" "),t._l(t.members,(function(e){return r("div",{key:e.name},[e.slug?r("a",{staticClass:"_wordbreak --url _block",attrs:{href:"/people#"+e.slug}},[t._v(t._s(e.name)+"\n              ")]):r("div",[t._v(t._s(e.name))])])}))],2):t._e()]),t._v(" "),r("div",{staticClass:"Dir-phages"},[t._m(0),t._v(" "),0==t.linkedPhageCollections.length?r("div",{staticClass:"Dir-miniCard"},[t._v("\n            No phage hosts added yet\n          ")]):t._e(),t._v(" "),t._l(t.linkedPhageCollections,(function(e){return r("div",{key:e.id,staticClass:"Dir-miniCard"},[r("div",{},[r("div",{staticClass:"Dir-row"},[t._v(t._s(e.fields["Name:Nice"]))]),t._v(" "),r("div",{staticClass:"Dir-row"},[e.fields["Owners:People::Name"][0]?r("nuxt-link",{staticClass:"--url",attrs:{to:"/people#"+e.fields["Owners:People::Slug"]}},[t._v(t._s(e.fields["Owners:People::Name"][0])+", ")]):t._e(),t._v(t._s(e.fields["Owners:People::Roles"].join(", "))+"\n              ")],1)]),t._v(" "),r("div",{staticClass:"Dir-block"},t._l(t.sortHostNames(e),(function(e){return r("div",{key:e[0]},[r("nuxt-link",{staticClass:"_organism",attrs:{to:"/hosts#"+e[1]}},[t._v(t._s(e[0]))])],1)})),0),t._v(" "),r("div",{staticClass:"Dir-block _font-small Dir-disabled"},[t._v("Phage hosts: "+t._s(t.sortHostNames(e).length))])])}))],2)])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("span",{staticClass:"Dir-label"},[this._v("Phage Collections")])])}],!1,null,null,null).exports,C=r(48),w=r(12),k=r.n(w);function L(){L=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},l=n.iterator||"@@iterator",c=n.asyncIterator||"@@asyncIterator",d=n.toStringTag||"@@toStringTag";function h(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{h({},"")}catch(t){h=function(t,e,r){return t[e]=r}}function f(t,e,r,n){var o=e&&e.prototype instanceof m?e:m,l=Object.create(o.prototype),c=new T(n||[]);return l._invoke=function(t,e,r){var n="suspendedStart";return function(o,l){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw l;return $()}for(r.method=o,r.arg=l;;){var c=r.delegate;if(c){var d=O(c,r);if(d){if(d===_)continue;return d}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var h=v(t,e,r);if("normal"===h.type){if(n=r.done?"completed":"suspendedYield",h.arg===_)continue;return{value:h.arg,done:r.done}}"throw"===h.type&&(n="completed",r.method="throw",r.arg=h.arg)}}}(t,r,c),l}function v(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=f;var _={};function m(){}function y(){}function C(){}var w={};h(w,l,(function(){return this}));var k=Object.getPrototypeOf,S=k&&k(k(E([])));S&&S!==e&&r.call(S,l)&&(w=S);var P=C.prototype=m.prototype=Object.create(w);function D(t){["next","throw","return"].forEach((function(e){h(t,e,(function(t){return this._invoke(e,t)}))}))}function x(t,e){var n;this._invoke=function(l,c){function d(){return new e((function(n,d){!function n(l,c,d,h){var f=v(t[l],t,c);if("throw"!==f.type){var _=f.arg,m=_.value;return m&&"object"==o()(m)&&r.call(m,"__await")?e.resolve(m.__await).then((function(t){n("next",t,d,h)}),(function(t){n("throw",t,d,h)})):e.resolve(m).then((function(t){_.value=t,d(_)}),(function(t){return n("throw",t,d,h)}))}h(f.arg)}(l,c,n,d)}))}return n=n?n.then(d,d):d()}}function O(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,O(t,e),"throw"===e.method))return _;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return _}var n=v(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,_;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,_):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,_)}function N(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(N,this),this.reset(!0)}function E(t){if(t){var e=t[l];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var i=-1,n=function e(){for(;++i<t.length;)if(r.call(t,i))return e.value=t[i],e.done=!1,e;return e.value=void 0,e.done=!0,e};return n.next=n}}return{next:$}}function $(){return{value:void 0,done:!0}}return y.prototype=C,h(P,"constructor",C),h(C,"constructor",y),y.displayName=h(C,d,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,C):(t.__proto__=C,h(t,d,"GeneratorFunction")),t.prototype=Object.create(P),t},t.awrap=function(t){return{__await:t}},D(x.prototype),h(x.prototype,c,(function(){return this})),t.AsyncIterator=x,t.async=function(e,r,n,o,l){void 0===l&&(l=Promise);var c=new x(f(e,r,n,o),l);return t.isGeneratorFunction(r)?c:c.next().then((function(t){return t.done?t.value:c.next()}))},D(P),h(P,d,"Generator"),h(P,l,(function(){return this})),h(P,"toString",(function(){return"[object Generator]"})),t.keys=function(object){var t=[];for(var e in object)t.push(e);return t.reverse(),function e(){for(;t.length;){var r=t.pop();if(r in object)return e.value=r,e.done=!1,e}return e.done=!0,e}},t.values=E,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(j),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return l.type="throw",l.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],l=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var c=r.call(o,"catchLoc"),d=r.call(o,"finallyLoc");if(c&&d){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!d)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,e){for(var i=this.tryEntries.length-1;i>=0;--i){var n=this.tryEntries[i];if(n.tryLoc<=this.prev&&r.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var l=o?o.completion:{};return l.type=t,l.arg=e,o?(this.method="next",this.next=o.finallyLoc,_):this.complete(l)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),_},finish:function(t){for(var i=this.tryEntries.length-1;i>=0;--i){var e=this.tryEntries[i];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),j(e),_}},catch:function(t){for(var i=this.tryEntries.length-1;i>=0;--i){var e=this.tryEntries[i];if(e.tryLoc===t){var r=e.completion;if("throw"===r.type){var n=r.arg;j(e)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:E(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),_}},t}function S(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function P(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?S(Object(source),!0).forEach((function(e){h()(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):S(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var D,x={components:{Card:y,Template:r(463).a},layout:"contentframe",middleware:"pageload",meta:{tableQueries:["_content-copy"],refreshOnLoad:!0},data:function(){return{intro:this.$cytosis.findField("directory-labs",this.$store.state.Content,"Markdown")}},computed:P(P({},Object(f.b)(["search"])),{},{searchString:{get:function(){return this.$store.state.search.string},set:function(t){this.$store.dispatch("updateCreate",{search:{string:t,url:this.$router.currentRoute.fullPath}})}},filterLabs:function(){if(!this.search.string)return this.labs;var t=this.search.string.toLowerCase(),e=[];return this.labs.map((function(r){r.fields["Data:Search"].toLowerCase().includes(t)&&e.push(r)})),e}}),watch:{},asyncData:(D=c()(L().mark((function t(e){var r,n,o,l,data,c,d;return L().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.app,n=e.env,o=e.store,l="stage"==n.pd_env?"Labs-preview":"Labs-index",t.next=4,Object(v.a)({useDataCache:!0,_key:n.db_api,_base:n.db_base,store:o,routeName:"labs-all",query:l});case 4:return data=t.sent,console.log("Data Size:",r.$sizeup(JSON.stringify(data))),data.tables.Organizations&&data.tables.PhageCollections&&(c=data.tables.Organizations,d=data.tables.PhageCollections),t.abrupt("return",{labs:c,phageCollections:d});case 8:case"end":return t.stop()}}),t)}))),function(t){return D.apply(this,arguments)}),mounted:function(){this.$segmentize&&this.$segmentize({segment:this.$segment,type:"page",event:"Directory/Labs",data:{path:this.$route.path}})},methods:{doSearch:new k.a.debounce((function(){Object(C.a)(this),this.$scrollTo("#content-top")}),300,{trailing:!0}),doClear:function(){this.searchString="",Object(C.a)(this)},doneScrolling:function(t){this.$router.push({path:this.$route.path+"#"+t.id})}}},O=Object(m.a)(x,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"Labs Dir-category"},[r("no-ssr",[r("Template",{attrs:{"grid-classes":"Template--Main-Sidebar _grid-3-1-sm _grid-gap","sidebar-classes":"Dir-sidebar --sticky _top-1"},scopedSlots:t._u([{key:"header-container",fn:function(){return[r("h1",{staticClass:"--title"},[r("span",{staticClass:"_color-mono-60"},[t._v("Phage ")]),t._v("Labs")]),t._v(" "),t.search.string?r("h1",{staticClass:"--title _padding-bottom-half"},[r("span",{staticClass:"_color-mono-60"},[t._v("Search: ")]),t._v(t._s(t.search.string))]):t._e(),t._v(" "),t.search.string?r("h2",{staticClass:"--title _padding-bottom-2"},[r("span",{staticClass:"_color-mono-60"},[t._v("Results: ")]),t._v(t._s(t.filterLabs.length))]):t._e()]},proxy:!0},{key:"default",fn:function(){return[r("div",[t.search.string?t._e():r("div",{staticClass:"Dir-notice _grid-3-1 _grid-gap-large _align-vertically"},[r("div",[r("div",{domProps:{innerHTML:t._s(t.$md.render(t.intro||""))}}),t._v(" "),r("p",{staticClass:"_font-small"},[t._v("\n                Number of labs: "),r("strong",[t._v(t._s(t.labs.length))]),t._v(" "),r("br"),t._v("\n                If you'd like your information updated, "),r("a",{staticClass:"--url",attrs:{href:"mailto:hello@phage.directory"}},[t._v("please let us know")]),t._v(".\n              ")])]),t._v(" "),r("div",{staticClass:"_right-sm"},[r("a",{staticClass:"_button CTA --inverse _width-100 _center",attrs:{href:"https://phage.directory/apply/labs"}},[t._v("Sign Up")])])]),t._v(" "),r("div",{staticClass:"Labs-list",attrs:{id:"content-top"}},[t.search.string&&0==t.filterLabs.length?r("div",{staticClass:"Dir-notice"},[r("h1",{},[t._v("No results found.")])]):t._e(),t._v(" "),t._l(t.filterLabs,(function(e){return r("div",{key:e.id},[r("Card",{staticClass:"Labs-list-item",attrs:{lab:e,"phage-collections":t.phageCollections}})],1)}))],2)])]},proxy:!0},{key:"context",fn:function(){return[r("div",{staticClass:"Dir-sidebar"},[r("label",{staticClass:"_form-label-search _padding-left-half _padding-bottom-none _height-100",attrs:{for:"dirSearch"}},[r("span",{staticClass:"_font-phage icon-search"})]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.searchString,expression:"searchString",modifiers:{trim:!0}}],ref:"dirSearch",staticClass:"Dir-search _padding-left-2 _form-input",attrs:{id:"Dir-searchbar",type:"text",name:"dir_searchbar",placeholder:"Search"},domProps:{value:t.searchString},on:{input:[function(e){e.target.composing||(t.searchString=e.target.value.trim())},t.doSearch],blur:function(e){return t.$forceUpdate()}}}),t._v(" "),t.searchString&&t.searchString.length>0?r("span",{staticClass:"_form-label-cancel _padding-left-half _padding-right-half _padding-bottom-none _height-100",attrs:{role:"button"},on:{click:t.doClear}},[r("span",{staticClass:"_font-phage icon-cancel"})]):t._e()]),t._v(" "),r("nuxt-link",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:{el:"#top",onDone:function(element){t.doneScrolling(element)}},expression:"{el: '#top', onDone: (element) => { doneScrolling(element) }}"}],staticClass:"_font-small --url _margin-top _inline-block _hidden-xs",attrs:{to:"#top"}},[t._v("\n          Back to top\n        ")])]},proxy:!0}])})],1)],1)}),[],!1,null,null,null);e.default=O.exports}}]);