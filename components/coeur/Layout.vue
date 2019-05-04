
<template>
<div class="Coeur Layout">
	<div class="" v-html="$md.render(markdown || '')" />

</div>
</template>


<script>

export default {

  props: {
    atom: Object,
  },

  data: function () {
    return {
    	markdown: 
`
## Layout & Templating {#layout}

Using standardized template structures can help streamline developing lots of different layouts independent of the content — you just need to figure out the goal of the content, and layout will come naturally. Use these templates optionally to structure the document

Layouts and templates are defined under /components/templates, but the layouts are mostly determined by CSS — this allows pages to loosely mimic a template layout (easier if they're defined in markdown)

### Template Sections

Note the use of double dash "-&#8202;-" to define sections

##### Header (.Template-&#8202;-Header)

Use for introductory content (article heading, author, etc.)


##### Body (.Template-&#8202;-Main)

Use for the main body content / the meat of the content


##### Context (.Template-&#8202;-Context)

Use for contextual stuff that describes the content (relevant downloads, links, filters, etc.)

##### Nav (.Template-&#8202;-Nav)

Use for side nav / side menu type stuff



### Template Types

##### Template-Documentation

For showing documentation and long form explanatory content, but NOT as part of a publication. Includes this style guide, services, policies, guidelines, and such.



`
    }
  },

  mounted: async function () {
  },

  methods: {
  }

}
</script>

