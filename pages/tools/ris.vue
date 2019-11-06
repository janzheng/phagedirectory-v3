

<template>
  <div class="Ris">

    <Template 
      grid-classes="Template--Main-Sidebar _grid-2-1-sm _grid-gap"
      header-classes="Template--Header _section-page _margin-bottom _margin-center _margin-top-none-i _padding-none-i" 
    >

      <template #header>
        <div class="Ris-intro _section-article _margin-center" v-html="$md.render(intro ||'')" />

        <div class="Ris-input _section-article _margin-bottom-2 _margin-center">

          <label 
            class="_form-label " 
            v-html="$md.render(`Paste your RIS here:` || '')" 
          />
          <textarea ref="textarea"
                    v-model.trim="data"
                    rows="8"
                    class="_form-input _block" 
                    type="text" 
                    @input="emit"
          />
        </div>

        <div class="Ris-output _section-article _margin-center ">
          <p>
            Output:
          </p>
          <textarea ref="textarea"
                    v-model.trim="output"
                    rows="20"
                    class="_form-input _block" 
                    type="text"
          />
        </div>

      </template>

      <template #default>

        <!-- <Recently v-if="behind" class="About-Behind _margin-top-2" header="Behind the scenes" :items="behind" /> -->

      </template>

    </Template>

  </div>
</template>




<script>

// based on: https://pypi.org/project/RISparser/

import { mapState } from 'vuex'

import Template from '~/templates/context.vue'
import axios from 'axios'


export default {

  components: {
    Template,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  // meta: {
  //   tableQueries: ["_content","_internal"],
  //   refreshOnLoad: true,
  // },

  data () {

    return {
      intro: `### RIS to Library
This brings in bookmarks from Meta.org. How this works: 
1. Hit "export" in meta
2. Paste RIS text
4. Get CSV
5. Paste CSV into Airtable
6. (In the future, it'll merge to the library as unpublished)
`,
      data: '',
      output: '',
      keymap: {
        'A1': 'first_authors',
        'A2': 'secondary_authors',
        'A3': 'tertiary_authors',
        'A4': 'subsidiary_authors',
        'AB': 'abstract',
        'AD': 'author_address',
        'AN': 'accession_number',
        'AU': 'authors',
        'C1': 'custom1',
        'C2': 'custom2',
        'C3': 'custom3',
        'C4': 'custom4',
        'C5': 'custom5',
        'C6': 'custom6',
        'C7': 'custom7',
        'C8': 'custom8',
        'CA': 'caption',
        'CN': 'call_number',
        'CY': 'place_published',
        'DA': 'date',
        'DB': 'name_of_database',
        'DO': 'doi',
        'DP': 'database_provider',
        'EP': 'end_page',
        'ER': 'end_of_reference',
        'ET': 'edition',
        'ID': 'id',
        'IS': 'number',
        'J2': 'alternate_title1',
        'JA': 'alternate_title2',
        'JF': 'alternate_title3',
        'JO': 'journal_name',
        'KW': 'keywords',
        'L1': 'file_attachments1',
        'L2': 'file_attachments2',
        'L4': 'figure',
        'LA': 'language',
        'LB': 'label',
        'M1': 'note',
        'M3': 'type_of_work',
        'N1': 'notes',
        'N2': 'abstract',
        'NV': 'number_of_Volumes',
        'OP': 'original_publication',
        'PB': 'publisher',
        'PY': 'year',
        'RI': 'reviewed_item',
        'RN': 'research_notes',
        'RP': 'reprint_edition',
        'SE': 'version',
        'SN': 'issn',
        'SP': 'start_page',
        'ST': 'short_title',
        'T1': 'primary_title',
        'T2': 'secondary_title',
        'T3': 'tertiary_title',
        'TA': 'translated_author',
        'TI': 'title',
        'TT': 'translated_title',
        'TY': 'type_of_reference',
        'UK': 'unknown_tag',
        'UR': 'url',
        'VL': 'volume',
        'Y1': 'publication_year',
        'Y2': 'access_date'
      }
    }
  },
  
  computed: {
    ...mapState([
      // 'Internal',
      ]),
  },

  watch: {
    $route () {
    }
  },


  mounted () {
  },

  methods: {
    async emit() {
      let data = this.data
      let keymap = this.keymap
      let lines = data.split('\n')
      let entries = []

      let entry = {}
      lines.map((lineStr) => {
        let line = lineStr.split('-')

        if(line == '') {
          entries.push(entry)
          entry = {}
        } else {
          if(line[1]) {
            entry[keymap[line[0].trim()]] = line[1].trim()
          }
        }
      })

      console.log('final', entries)
      let output = ''

      let citation = await this.getDoiCitation(entries[0]['doi'])
      console.log('citation:', citation)

      this.output = output
    },

    async getDoiCitation(doi) {

      let cite_url = process.env.api_url + '/api/cite'

      let citation = await axios.get(cite_url + '/' + doi)
      return citation
    }
  }

}
</script>

<style>
</style>

