
<script>
  import Chart from 'chart.js'
  import { Bar, mixins, generateChart } from 'vue-chartjs'
  
  const { reactiveProp } = mixins

  Chart.defaults.BoundedBar = Chart.defaults.bar;
  Chart.controllers.BoundedBar = Chart.controllers.bar.extend({
   
    draw: function (ease) {
      
      const startBB = this.chart.config.data.datasets["0"]._meta.start;
      const endBB = this.chart.config.data.datasets["0"]._meta.end;
      
      var ctx = this.chart.chart.ctx;
      ctx.save();
      ctx.fillStyle = 'lightgrey';
      ctx.fillRect(startBB*0.1, 0, (endBB-startBB)*0.1, 100);
      ctx.restore();
      
      Chart.controllers.bar.prototype.draw.call(this, ease);
    }
  });
  
  // Generate the vue-chartjs component
  const BoundedBar = generateChart('bounded-bar', 'BoundedBar')
  
  export default {
    name: "TimeFilter",
    extends: BoundedBar,
    mixins: [reactiveProp],
    props: {
      start: {type: Number},
      end: {type: Number}
    },
    data: () => {
      return {
        options : {
          legend: {display: false},
          layout: {
            padding: {  }
          },
          scales: {
            xAxes:[{
              display: false,
            }],
            yAxes: [{
              display: false,
            }]
          }
        }
      }
    },
    mounted () {
      this.renderChart(this.chartData, { responsive: true, maintainAspectRatio: false, ...this.options })
    },
    methods: {
    
    }
  }
</script>

<style>
</style>
