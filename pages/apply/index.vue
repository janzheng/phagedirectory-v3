<template>
  <div class="Join">
    <Template>
      <template #container>
        <div class="_section-article" v-html="$md.render(intro || '')" />

        <div class="_section-article _grid-2">
          <!-- <nuxt-link to="/apply/research" class="Join-research _card --button --nolink _padding _margin-none">
            <div class="_flex-col _height-100" v-html="$md.render(research || '')" />
          </nuxt-link> -->
          <a href="https://phage.directory/apply/researchers" target="_blank" class="Join-research _card --button --nolink _padding _margin-none">
            <div class="" v-html="$md.render(research || '')" />
          </a>

          <a href="https://phage.directory/apply/labs" target="_blank" class="Join-lab _card --button --nolink _padding _margin-none">
            <div class="" v-html="$md.render(lab || '')" />
          </a>

          <!-- <nuxt-link to="/apply/banks" class="Join-banks _card --button --nolink _padding _margin-none">
            <div class="_flex-col _height-100" v-html="$md.render(banks || '')" />
          </nuxt-link> -->
          <a href="https://phage.directory/apply/phagebanks" target="_blank" class="Join-banks _card --button --nolink _padding _margin-none">
            <div class="" v-html="$md.render(banks || '')" />
          </a>

          <!-- <nuxt-link to="/apply/orgs" class="Join-organization _card --button --nolink _padding _margin-none">
            <div class="_flex-col _height-100" v-html="$md.render(organization || '')" />
          </nuxt-link> -->
          <a href="https://phage.directory/apply/orgs" target="_blank" class="Join-org _card --button --nolink _padding _margin-none">
            <div class="" v-html="$md.render(organization || '')" />
          </a>
          
          <!-- <nuxt-link to="/apply/medical" class="Join-medical _card --button --nolink _padding _margin-none">
            <div class="_flex-col _height-100" v-html="$md.render(medical || '')" />
          </nuxt-link> -->
          <a href="https://phage.directory/apply/medical" target="_blank" class="Join-medical _card --button --nolink _padding _margin-none">
            <div class="" v-html="$md.render(medical || '')" />
          </a>
          
          <span class="Join-other _card --button --nolink _padding _margin-none">
            <div class="" v-html="$md.render(other || '')" />
          </span>

        </div>
        <!-- 
          <div class="_section-article ">
            <div class="Join-other _card --button _padding _margin-top">
              <div class="" v-html="$md.render(other || '')" />
            </div>
          </div> -->

      </template>
    </Template>

  </div>
</template>




<script>

// import { mapState } from 'vuex'
import Template from '~/templates/article.vue'

export default {

  components: {
    Template,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content"],
    refreshOnLoad: true,
  },

  data () {
    return {
      intro: this.$cytosis.findField('join-intro', this.$store.state['Content'], 'Markdown' ),
      research: this.$cytosis.findField('join-researcher', this.$store.state['Content'], 'Markdown' ),
      lab: this.$cytosis.findField('join-lab', this.$store.state['Content'], 'Markdown' ),
      organization: this.$cytosis.findField('join-organization', this.$store.state['Content'], 'Markdown' ),
      banks: this.$cytosis.findField('join-banks', this.$store.state['Content'], 'Markdown' ),
      medical: this.$cytosis.findField('join-medical', this.$store.state['Content'], 'Markdown' ),
      other: this.$cytosis.findField('join-other', this.$store.state['Content'], 'Markdown' ),
      // content: this.$cytosis.find('Content.alerts-content', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      // alertSignup: this.$cytosis.find('Content.footer-alerts', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },

}
</script>

<style>
</style>

