
<script>
  import { Bar } from 'vue-chartjs'
  
  export default {
    name: "TimeFilter",
    extends: Bar,
    props: [],
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
      this.renderChart(this.barData, { responsive: true, maintainAspectRatio: false, ...this.options })
    },
    computed: {
      barData () {
        return {
          labels: ['', '', '', '', '', '', '', '', '', '', '', '', '',],
          datasets: [
            {
              backgroundColor: '#d32f2f',
              data: [150, 500, 561, 878, 879, 920, 900, 1200, 1300, 1100, 1300, 760, 30]
            }
          ]
        }
      }
    }
  }
</script>

<style>
</style>
