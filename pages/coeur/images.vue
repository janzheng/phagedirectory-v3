<template>
  <div class="Images">
  	Try uploading an image!
  	<!-- <input type="file" @change="encodeImageFileAsURL(this)" /> -->
  	<input type="file" name="saveImage" @change="saveImage($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            accept="image/*" class="input-file">


    rendering base64:

    <div>
    	<img :src="`${image64}`">
    	{{ image64 }}

    	Image object:
    	{{ b64img }}
    </div>

  </div>
</template>




<script>


export default {

  components: {
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    // tableQuery: "_content"
    tableQueries: ['_content', 'capsid-previews', 'atoms-featured', 'atoms-latest']
  },

  data () {
    return {
    	image64: "",
    	image: "",
    }
  },
  
  computed: {
  	b64img() {
  		if(this.image64 != '') {
		    const img = new Image()
				img.src = this.image64

		    const canvas = document.createElement('canvas');
		    canvas.width = img.width;
		    canvas.height = img.height;

		    const ctx = canvas.getContext('2d');
		    ctx.drawImage(img, 0, 0);
		    const dataURL = canvas.toDataURL('image/png');
		    return dataURL;
  		}
	}

    
  },

  async asyncData({env}) {
  },

  mounted() {
  },

  methods: {

		saveImage(fieldName, fileList) {
			const _this = this
		  var file = fileList[0];
		  var reader = new FileReader()
		  reader.onloadend = function() {
		    console.log('RESULT', reader.result)
		    _this.image64 = reader.result
		  }
		  reader.readAsDataURL(file)
		},
  },



}
</script>

<style>
</style>

