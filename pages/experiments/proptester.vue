

<!-- 

  Summarizes lessons from: https://adamwathan.me/renderless-components-in-vuejs/
  and vue-mastery render components

 -->


 -->
<template>
  <div class="_padding-2">
    <h3>Testing Render props </h3>
    <products-list :products="products"></products-list>
    <products-list :products="products" :product-renderer="imageRenderer"></products-list>


    <h3>Testing Renderless components </h3>
    <tags-input v-model="tags">
      <div slot="tester" slot-scope="{ childData, sayHello, events,  }" >
        <!-- these run whatever the child has -->
        {{ childData }}
        {{ sayHello() }}
        <div v-on="events">Click here, check console</div>
      </div>
    </tags-input>


    <h3>Renderless </h3>
    <Renderless>
      <div slot-scope="{ exampleProp }">Hello there, {{ exampleProp }}</div>
    </Renderless>

    <Renderless v-model="tags">
      <div slot-scope="{ tags, removeTag, inputAttrs, inputEvents, addTags }" class="tags-input">
        <span class="tags-input-tag">
          <span class="_tag _margin-right-half" v-for="tag in tags">
            {{ tag }}
            <span class="tags-input-remove" @click="removeTag(tag)">&times;</span>
          </span>
        </span>
        <input class="tags-input-text" placeholder="Add tag..."
          v-bind="inputAttrs"
          v-on="inputEvents"
        >
      </div>
    </Renderless>


    <Renderless v-model="tags">
      <div slot-scope="{ inputEvents, inputAttrs, addTag }" class="tags-input">
        <input class="tags-input-text" placeholder="Type a tag" v-on="inputEvents" v-bind="inputAttrs"
        >
        <div @click="addTag">Add it</div>
      </div>
    </Renderless>




    <h3>Renderless Wrapper</h3>
    <Taglist v-model="tags">
    </Taglist>


  </div>

</template>

<script>

import ProductsList from '~/components/experiments/Productslist.vue'
import TagsInput from '~/components/experiments/Tagsinput.vue'
import Renderless from '~/components/experiments/Renderless.vue'
import Taglist from '~/components/experiments/Taglist.vue'

export default {

  components: {
    ProductsList,
    TagsInput,
    Renderless,
    Taglist,
  },
  layout: 'contentframe',
  middleware: 'pageload',

  data: function () {
    return {
      someInput: '',
      products: [{
          name: 'Magnifying Glass',
          image: 'magnify.png'
        }, {
          name: 'Light Bulb',
          image: 'bulb.png'
        }],
      imageRenderer(h, product) { // <-- The imageRenderer I'm passing in
        return [
          h('img', {
            attrs: {
              src: product.image
            }
          }),
          ' ',
          product.name.toUpperCase()
        ]
      },

      tags: [
        'Testing',
        'Design',
      ],
    }
  }
}
</script>
