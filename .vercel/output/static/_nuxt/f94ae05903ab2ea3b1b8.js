(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{461:function(t,e,o){"use strict";var n={components:{},props:{templateClasses:{type:String,default:"Template-Article _section-page _margin-center _margin-top-2 _margin-bottom-2 _padding-top-2 _padding-bottom-2  "},mainClasses:{type:String,default:"Template--Main _section-content _margin-bottom _margin-center "},articleClasses:{type:String,default:"_section-article _margin-center"}},data:function(){return{isMounted:!1}},computed:{},beforeCreate:function(){},mounted:function(){this.isMounted=!0},beforeDestroy:function(){},methods:{pathMatch:function(path){return!!this.route.path&&(this.route.path==path||void 0)}}},r=o(6),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{class:t.templateClasses},[o("div",{class:t.mainClasses},[t._t("container",[o("div",{class:t.articleClasses},[t._t("header"),t._v(" "),t._t("default"),t._v(" "),t._t("footer")],2)])],2)])}),[],!1,null,null,null);e.a=component.exports},557:function(t,e,o){"use strict";o.r(e);var n=o(10),r=o.n(n),l=o(20);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}function c(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){r()(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var _={components:{Template:o(461).a},layout:"contentframe",middleware:"pageload",meta:{tableQueries:["_content-copy","atoms-jobs-preview"],refreshOnLoad:!0},data:function(){return{atom:this.$cytosis.findOne("Eligo Bacteriophage Formulation Scientist",this.$store.state.Atoms)}},computed:c(c({},Object(l.b)(["Atoms"])),{},{isExpired:function(){if("Expired"==this.atom.fields["Data:Status"])return!0},getCover:function(){if(this.atom.fields.Cover)return this.atom.fields.Cover[0].url}}),mounted:function(){},methods:{tabClick:function(t,e){this.activeTab=e}}},m=o(6),component=Object(m.a)(_,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"Jobs"},[o("Template",{scopedSlots:t._u([{key:"container",fn:function(){return[o("div",{staticClass:"_section-article _margin-center"},[o("div",{staticClass:"Job _card _padding ",class:t.atom.fields["Data:Status"]},[t.atom.fields["Data:Categories"]?o("div",{staticClass:"Job-header "},[o("div",{staticClass:"_grid-1-auto _align-vertically _margin-bottom _grid-gap-small"},[o("div",[t.atom.fields["Data:Type"]?o("span",{staticClass:"Job-type _tag --highlight --nowrap _margin-bottom-none-i"},[t._v(t._s(t.atom.fields["Data:Type"]))]):t._e(),t.atom.fields["Data:Categories"]?o("span",{staticClass:"Job-type _tag --nowrap _margin-bottom-none-i"},[t._v("\n                  "+t._s(t.atom.fields["Data:Categories"][0])+"\n                ")]):t._e()]),t._v(" "),o("div",{staticClass:"Job-date _right-sm _font-small"},[o("span",[t._v("Posted "+t._s(t._f("dateTo")(t.atom.fields["Data:Date"])))])])]),t._v(" "),t.getCover?o("div",{staticClass:"Job-logo _margin-bottom-2"},[o("img",{staticStyle:{"max-width":"240px"},attrs:{src:t.getCover,alt:"Job logo"}})]):t._e(),t._v(" "),o("div",{staticClass:"Job-title _font-bold _margin-top-half "},[t.atom.fields["Data:Title"]?o("h5",{staticClass:"_inline _md-p_fix _padding-bottom-half",domProps:{innerHTML:t._s(t.$md.strip(t.$md.render(t.atom.fields["Data:Title"]||"")))}}):t._e()]),t._v(" "),o("div",{staticClass:"Job-tags _margin-bottom-half"},t._l(t.atom.fields["Data:Tags"],(function(e){return o("span",{key:t.atom.id+e,staticClass:"Job-tag _tag --nowrap"},[t._v(t._s(e))])})),0),t._v(" "),o("div",{staticClass:"Job-info _margin-bottom _margin-top"},[t.atom.fields["Data:Source"]?o("div",[o("strong",[t._v(t._s(t.atom.fields["Data:Source"]))])]):t._e(),t._v(" "),t.atom.fields["Data:Subtitle"]?o("div",{domProps:{innerHTML:t._s(t.$md.render(t.atom.fields["Data:Subtitle"]||""))}}):t._e()]),t._v(" "),o("div",{staticClass:"Job-info _margin-bottom _margin-top"},[t.atom.fields.URL?o("div",[o("span",[t._v("Website:")]),t._v(" "),o("a",{staticClass:"_wordbreak --url --none",attrs:{target:"_blank",href:t.atom.fields.URL+"?utm_source=phage-directory"}},[t._v(t._s(t.atom.fields.URL))])]):t._e()]),t._v(" "),o("div",{staticClass:"Job-apply-cta _margin-top-2 _margin-bottom"},[o("a",{staticClass:"CTA --bright --outline",attrs:{target:"_blank",href:t.atom.fields.URL+"?utm_source=phage-directory"}},[t._v("Apply here")])])]):t._e(),t._v(" "),o("div",{staticClass:"Job-content"},[t.atom.fields["Data:Categories"]?o("div",{domProps:{innerHTML:t._s(t.$md.render(t.atom.fields["Data:Content"]||""))}}):t._e(),t._v(" "),t.atom.fields["Data:Categories"]?t._e():o("div",{domProps:{innerHTML:t._s(t.$md.strip(t.$md.render(t.atom.fields["Data:Content"]||"")))}})]),t._v(" "),!t.isExpired&&t.atom.fields.URL?o("div",{staticClass:"Job-action _margin-top"},[t.atom.fields.URL?o("a",{staticClass:"Job-action-apply _button CTA --bright --outline _margin-top _margin-bottom-none-i _margin-right-half",attrs:{href:t.atom.fields.URL+"?utm_source=phage-directory-jobs",target:"_blank"}},[t._v("Apply here")]):t._e(),t._v(" "),t.atom.fields["Data:DateEnd"]?o("span",{staticClass:"Job-expiry _font-small --nowrap"},[t._v("\n              Last day to apply: "),o("span",{staticClass:"_font-bold"},[t._v(t._s(t._f("niceDate")(t.atom.fields["Data:DateEnd"]))+" ")])]):t._e()]):o("div",[t.atom.fields.URL?o("span",{staticClass:"Job-action-apply _button --short --disabled --outline _margin-bottom-none _margin-right-half"},[t._v("Job expired")]):t._e()])])])]},proxy:!0}])})],1)}),[],!1,null,null,null);e.default=component.exports}}]);