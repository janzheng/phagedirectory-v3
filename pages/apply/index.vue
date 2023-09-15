<template>
  <div class="Join">
    <Template main-classes="Template--Main _section-article _margin-bottom _margin-center _margin-top-none-i">
      <template #container>
        <div class="_section-article" v-html="$md.render(intro || '')" />

        <div class="_section-article">
          <h2>1. Add your Organization, Company, Non-Profit</h2>
          <p>This will list your organization for others to discover.</p>
          <a href="https://phage.directory/apply/orgs" target="_blank" class="Join-org _card _block --button --nolink _padding _margin-none">
            <div class="" v-html="$md.render(organization || '')" />
          </a>
        </div>
        <div class="_section-article ">
          <h2>2. Add your Lab or Research Group</h2>
          <p>Work at a lab or research group? Does your group work with phages? Add your research group here. This also lets you link your researcher profile with your lab.</p>
          <a href="https://phage.directory/apply/labs" target="_blank"
            class="Join-lab _block _card --button --nolink _padding _margin-none">
            <div class="" v-html="$md.render(lab || '')" />
          </a>
        </div>
        <div class="_section-article ">
          <h2>3. Create a Membership Profile</h2>
          <p>Are you a researcher working with phages? Are you involved in the phage world in other ways? Join Phage Directory as a member!</p>
          <a href="https://phage.directory/apply/researchers" target="_blank"
            class="Join-research _block _card --button --nolink _padding _margin-none">
            <div class="" v-html="$md.render(research || '')" />
          </a>
        </div>
        <div class="_section-article ">
          <h2>Are you a member of the medical community?</h2>
          <p>We are creating a small group for physicians separate from the main Directory. Sign up here if you're interested.</p>
          <a href="https://phage.directory/apply/medical" target="_blank" class="Join-medical _block _card --button --nolink _padding _margin-none">
            <div class="" v-html="$md.render(medical || '')" />
          </a>
        </div>
        <!-- <div class="_section-article _grid-2">
          <a href="https://phage.directory/apply/researchers" target="_blank" class="Join-research _card --button --nolink _padding _margin-none">
            <div class="" v-html="$md.render(research || '')" />
          </a>
          <a href="https://phage.directory/apply/labs" target="_blank" class="Join-lab _card --button --nolink _padding _margin-none">
            <div class="" v-html="$md.render(lab || '')" />
          </a>
          <a href="https://phage.directory/apply/phagebanks" target="_blank" class="Join-banks _card --button --nolink _padding _margin-none">
            <div class="" v-html="$md.render(banks || '')" />
          </a>
          <a href="https://phage.directory/apply/orgs" target="_blank" class="Join-org _card --button --nolink _padding _margin-none">
            <div class="" v-html="$md.render(organization || '')" />
          </a>
          <a href="https://phage.directory/apply/medical" target="_blank" class="Join-medical _card --button --nolink _padding _margin-none">
            <div class="" v-html="$md.render(medical || '')" />
          </a>
          <span class="Join-other _card --button --nolink _padding _margin-none">
            <div class="" v-html="$md.render(other || '')" />
          </span>
        </div> -->
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

