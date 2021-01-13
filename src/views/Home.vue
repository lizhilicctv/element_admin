<template>
    <div>
        1
    </div>
</template>
<style lang="scss">

</style>
<script>


export default {
  name: "Dashboard",
  data() {
    return {
      data: [
        {
          date: "2018-1-1",
          value: Math.ceil(Math.random() * 10)
        },
        {
          date: "2018-1-2",
          value: Math.ceil(Math.random() * 10)
        },
        {
          date: "2018-1-3",
          value: Math.ceil(Math.random() * 10)
        },
        {
          date: "2018-1-4",
          value: Math.ceil(Math.random() * 10)
        },
        {
          date: "2018-1-5",
          value: Math.ceil(Math.random() * 10)
        },
        {
          date: "2018-1-6",
          value: Math.ceil(Math.random() * 10)
        },
        {
          date: "2018-1-7",
          value: Math.ceil(Math.random() * 10)
        }
      ],
      userChart: null,
      uvChart: null,
      pvChart: null,
      orderChart: null
    };
  },
  methods: {
    drawUserChart: function() {
     
    },
    drawUvChart: function() {
     
    },
    drawPvChart: function() {
      
    },
    drawOrderChart: function() {
      
    }
  },
  mounted() {
    this.drawUserChart();
    this.drawUvChart();
    this.drawPvChart();
    this.drawOrderChart();
  }
};
</script>
