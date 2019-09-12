
<!-- 

  Used by Timeline to display an event

 -->
<template>

  <div class="TimelineCard _grid-auto-1 ">

    <div class="TimelineCard-sidebar" >
      <!-- <slot name="sidebar" /> -->
      <div v-if="author" class="TimelineCard-sidebar _margin-bottom-half-xs" >
        <img v-if="profile" :src="profile" class="_block _left _margin-center --profile" style="border-radius: 100%" >
      </div>
    </div>


    <div class="TimelineCard-main" >
      <!-- <slot name="main" /> -->
      <div v-if="author" class="TimelineCard-header _margin-bottom-half" >
        <div class="TimelineCard-post-meta _grid-3-2 _grid-gap-small">
          <div>
            <!--<span v-if="author.fields['Twitter']">
              <!~~ <span class="TimelineCard-author" target="_blank">{{ author.fields['Name'] }}</span> ~~>
              <a :href="'https://twitter.com/'+author.fields['Twitter']" class="TimelineCard-header-twitter" target="_blank">{{ author.fields['Twitter'] }}</a>
            </span>-->
            <span v-if="author.fields['Slug']">
              <!-- <span class="TimelineCard-author" target="_blank">{{ author.fields['Name'] }}</span> -->
              <nuxt-link :to="'/people/#'+author.fields['Slug']" class="TimelineCard-author-slug" target="_blank">{{ author.fields['Name'] }}</nuxt-link>
            </span>
            <span v-else class="TimelineCard-author">{{ author.fields['Name'] }}</span>
          </div>
          <div v-if="post" class="_right-sm">
            <span class="TimelineCard-header-meta">{{ post.fields['Time:Nice'] }} </span>
          </div>
        </div>
      </div>

      <div v-if="post" class="TimelineCard-content _card --transparent _md-p_fix" >
        <div v-if="post.fields['Data:Markdown']" class="TimelineCard-markdown" v-html="$md.render(post.fields['Data:Markdown'] || '')" />

        <div v-if="post.fields['Data:Twitter']" class="TimelineCard-twitter" >
          <span class="twitter-tweet" data-width="100%" data-lang="en">
            <blockquote class="twitter-tweet" data-lang="en">
              <a :href="post.fields['Data:Twitter']">Twitter</a>
            </blockquote>
            <!-- required to render twitter embeds properly -->
          </span>
          <script async src="https://platform.twitter.com/widgets.js" charset="utf-8" />
        </div>

        <div v-if="post.fields['Data:Attachments']" class="TimelineCard-images" >
          <div v-for="image of post.fields['Data:Attachments']" :key="image['url']"> <img :src="image['url']" ></div>
        </div>
      </div>

    </div>
  </div>

</template>


<script>


export default {


  components: {
  },

  props: {
    'post': Object, 
    'author': Object, 
  },

  data: function () {
    return {
      // intro: this.$cytosis.find('Content.capsid-intro', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      // banner: this.$cytosis.find('Content.capsid-banner', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      // placeholder: this.$cytosis.find('Content.capsid-placeholder', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
    }
  },

  computed: {

    profile() {
      // if (!this.post && !this.post.fields['Author'])
      //   return false

      if(!this.author)
        return false

      if (this.author.fields['ProfileImage'] && this.author.fields['ProfileImage'][0] && this.author.fields['ProfileImage'][0]['thumbnails']) {
          return this.author.fields['ProfileImage'][0]['thumbnails']['large']['url']
      }
      return false
      // url": "https://dl.airtable.com/.attachments/7f459a1f1437b787c232b774c8f21be0/b4df0ae6/801bdb80", "filename": "801bdb80", "size": 41508, "type": "image/jpeg", "thumbnails": { "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/695ca06cffaed869538cff6414a35ccf/743d6845", "width": 54, "height": 36 }, 
    },
  },
  methods: {
    handleSubmit() {
      // todo: use axios w/ the mailchimp API instead of default mailchimp
      return false
    }
  }

}
</script>

