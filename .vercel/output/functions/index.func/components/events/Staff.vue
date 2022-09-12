<template>
  <div class="Events-staff" >
    <slot name="default" />
    <div v-for="item of people" :key="item.id" class="">
      <!-- -- {{ item.fields }} -->
      <Card :person="item" class="People-list-item" />
    </div>
  </div>
</template>


<script>

// import Toggle from '~/components/Toggle.vue'
import { loadQuery } from '~/other/loaders'
import Card from '~/components/dir/PeopleCard.vue'

export default {

  components: {
    // Toggle,
    Card
  },

  props: {
    staff: Array,
  },

  data: function () {
    this.getAuthors()

    return {
      people: Array,
    }
  },


  computed: {
  },

  created: async function () {

  },

  mounted: function () {
  },

  methods: {
    async getAuthors() {
      let authorSlugs = [], authorObj = {}
      this.staff.map((person) => {
        authorSlugs.push(person.fields['Slug'])
        authorObj[person.fields['Slug']||person.fields['Name']] = person
      })

      let authorPromises = await loadQuery({
        _key: process.env.db_api, 
        _base: process.env.db_base, 
        store: this.$store, 
        routeName: 'Capsid-router-people', 
        query: process.env.pd_env == 'stage' ? 'People-profile-preview' : 'People-profile',
        // keyword: slug,
        options: {
          // create a custom filter that looks like
          // IF(OR({Slug}="jan-zheng", {Slug}="jessica-sacher"), TRUE())
          filter: this.$cytosis.filter_or(authorSlugs, "Slug")
        }
      })

      // console.log('AUTHORS:::', authorPromises.tables['People'])
      let _people = authorPromises.tables['People']

      _people.map((person) => {
        authorObj[person.fields['Slug']] = person
      })

      this.people = authorObj
    }
  }

}

</script>

<style lang="scss" scoped>

</style>

