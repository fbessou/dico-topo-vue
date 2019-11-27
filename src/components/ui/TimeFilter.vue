
<script>
/*
import Chart from 'chart.js'
import { Bar, mixins, generateChart } from 'vue-chartjs'

const { reactiveProp } = mixins

Chart.defaults.BoundedBar = Chart.defaults.bar

function drawBB (ctx, meta) {
  const a = meta.start
  const b = meta.end

  const selA = meta.selectionStart
  const selB = meta.selectionEnd

  const startBB = Math.min(a, b)
  const endBB = Math.max(a, b)

  const selectionStart = Math.min(selA, selB)
  const selectionEnd = Math.max(selA, selB)

  const hSize = Math.abs(endBB) - Math.abs(startBB)

  const pStart = startBB === selectionStart ? 0 : parseInt(100 * (Math.abs(selectionStart) - Math.abs(startBB)) / hSize)
  const pEnd = endBB === selectionEnd ? 100 : 100 + parseInt(100 * (Math.abs(selectionEnd) - Math.abs(endBB)) / hSize)

  ctx.save()
  ctx.fillStyle = 'lightgrey'
  ctx.fillRect(pStart * 2 - 2, 0, (pEnd - pStart) * 2, 100)
  ctx.restore()
}

Chart.controllers.BoundedBar = Chart.controllers.bar.extend({
  draw: function (ease) {
    drawBB(this.chart.chart.ctx, this.chart.config.data.datasets['0']._meta)
      Chart.controllers.bar.prototype.draw.call(this)
    }
})

// Generate the vue-chartjs component
const BoundedBar = generateChart('bounded-bar', 'BoundedBar')

export default {
  name: 'TimeFilter',
  extends: BoundedBar,
  mixins: [reactiveProp],
  data: () => {
    return {
      options: {
        legend: { display: false },
        layout: {
          padding: { }
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }]
        },
        animation: {
          duration: 0 // general animation time
        },
        hover: {
          animationDuration: 0 // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0 // animation duration after a resize
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, { responsive: true, maintainAspectRatio: false, ...this.options })
  },
  methods: {

  }
} */
</script>

<style>
</style>
