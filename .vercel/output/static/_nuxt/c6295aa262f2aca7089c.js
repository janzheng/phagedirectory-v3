(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{463:function(t,e,n){"use strict";var o={components:{},props:{templateClasses:String,mainClasses:{type:String,default:"Template--Main "},gridClasses:{type:String,default:"Template--Main-Sidebar _grid-2-1-sm _grid-gap "},headerClasses:{type:String,default:"Template--Header _section-content _margin-bottom _margin-center _margin-top-none-i"},sidebarClasses:{type:String,default:"_sidebar"},sidebarContainerClasses:{type:String}},layout:"contentframe",middleware:"pageload",data:function(){return{isMounted:!1}},computed:{},beforeCreate:function(){},mounted:function(){this.isMounted=!0},beforeDestroy:function(){},methods:{pathMatch:function(path){return!!this.route.path&&(this.route.path==path||void 0)}}},r=n(6),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"Template-Context _section-page _margin-center _padding-top-2 _padding-bottom-2 ",class:t.templateClasses},[t._t("header-container",[n("div",{class:t.headerClasses},[t._t("header")],2)]),t._v(" "),n("div",{class:t.gridClasses},[t._t("sidebar-container",[n("div",{staticClass:"Template--Sidebar",class:t.sidebarContainerClasses},[n("nav",{class:t.sidebarClasses},[t._t("sidebar"),t._v(" "),t._t("context")],2)])]),t._v(" "),t._t("main-container",[n("div",{class:t.mainClasses},[t._t("default")],2)])],2),t._v(" "),t._t("footer-container",[n("div",{staticClass:"Template--Footer"},[t._t("footer")],2)])],2)}),[],!1,null,null,null);e.a=component.exports},540:function(t,e,n){"use strict";n.r(e);var o=n(463),r={components:{NodeForm:n(464).a,Context:o.a},layout:"contentframe",middleware:"pageload",meta:{tableQuery:"_content-forms"},data:function(){return{intro:this.$cytosis.findField("contact-intro",this.$store.state.Content,"Markdown"),content:this.$cytosis.findField("contact-content",this.$store.state.Content,"Markdown"),form:this.$cytosis.findOne("form-contact",this.$store.state.Content)}},mounted:function(){this.$segmentize&&this.$segmentize({segment:this.$segment,type:"page",event:"Groups",data:{path:this.$route.path}})}},d=n(6),component=Object(d.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"Contact"},[n("Context",{scopedSlots:t._u([{key:"context",fn:function(){return[t.form?n("NodeForm",{attrs:{src:t.form}}):t._e()]},proxy:!0}])},[t._v(" "),n("div",{domProps:{innerHTML:t._s(t.$md.render(t.intro||""))}}),t._v(" "),n("div",{domProps:{innerHTML:t._s(t.$md.render(t.content||""))}})])],1)}),[],!1,null,null,null);e.default=component.exports}}]);