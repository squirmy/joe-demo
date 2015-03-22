Vue.config.debug = true;

var demo = new Vue({
  el: '#page',
  data: {
    images: []
  },

  methods:{
    addImages: function (images){
      images.forEach(function(x, i) {
        x.show = i < 5;
      });

      this.images = images;
      this.pos = 0;
    },

    scrollLeft: function(){
      if (this.pos <= 0) {
        return;
      }

      this.images[this.pos + 4].show = false;
      this.pos -= 1;
      this.images[this.pos].show = true;
    },

    scrollRight: function(){
      if (this.pos + 5 >= this.images.length) {
        return;
      }

      this.images[this.pos].show = false;
      this.pos += 1;
      this.images[this.pos + 4].show = true;
    }
  }
});


var feed = new Instafeed({
  clientId: 'ac5f5e57545b4a909c2b2327d1c7656c',
  get: 'tagged',
  tagName: 'worldsbestdog',
  limit: 20,
  success: function(response) {

    var images = [];
    response.data.forEach(function (x) {
      images.push({url: x.images.thumbnail.url, show: false});
    });

    demo.addImages(images);
  }
});

feed.run();
