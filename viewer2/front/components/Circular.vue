<template>
  <div>
    <figure class="chart animate" :style="styles">
      <svg role="img" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g1" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="var(--primary-color)" />
            <stop offset="50%" stop-color="var(--primary-color-d1)" />
            <stop offset="100%" stop-color="var(--primary-color-d2)" />
          </linearGradient>
        </defs>
        <title>soilmoisture</title>
        <desc>soil moisture percentage</desc>
        <circle class="circle-background" />
        <circle class="circle-foreground1" />
      </svg>
      <figcaption />
    </figure>
  </div>
</template>
<script>
export default {
  props: {
    percentage: { type: Number, default: 0 },
    fontSize: { type: String, default: '2.5rem' },
    radius: { type: String, default: '87.5px' }
  },
  computed: {
    styles() {
      return {
        '--percentage': this.percentage,
        '--percentage-font-size': this.fontSize,
        '--circle-radius': this.radius
      }
    }
  }
}
</script>
<style>
:root {
  --circle-bg: #d6e2f8;
  --percentage-font-size: 2.5rem;
  --percentage: 0;
  --circle-radius: 87.5px;
}
.chart {
  width: calc(var(--circle-radius) * 2 + 25px);
  height: calc(var(--circle-radius) * 2 + 25px);
  margin: 0;
  position: relative;
}
.chart.animate svg .circle-foreground1 {
  --webkit-animation: offset 1s ease-in-out forwards;
  animation: offset 1s ease-in-out forwards;
  --webkit-animation-delay: 1s;
  animation-delay: 1s;
}
.chart.animate figcaption:after {
  --webkit-animation: chart-label 1s steps(var(--percentage)) forwards;
  animation: chart-label 1s steps(var(--percentage)) forwards;
  --webkit-animation-delay: 1s;
  animation-delay: 1s;
}
.chart svg {
  width: 100%;
  height: 100%;
}
.chart svg .circle-background,
.chart svg .circle-foreground1 {
  r: var(--circle-radius);
  cx: 50%;
  cy: 50%;
  fill: none;
  stroke: var(--circle-bg);
  stroke-width: 25px;
}
.chart svg .circle-foreground1 {
  stroke: url(#g1);
  stroke-dasharray: calc(
      var(--circle-radius) * var(--percentage) * 0.01 * 2 * 3.14
    )
    calc(var(--circle-radius) * 2 * 3.14);
  stroke-dashoffset: calc(
    var(--circle-radius) * var(--percentage) * 0.01 * 2 * 3.14
  );
  stroke-linecap: round;
  --webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  --webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
}
.chart figcaption {
  display: inline-block;
  width: 100%;
  height: var(--percentage-font-size);
  overflow: hidden;
  text-align: center;
  color: var(--primary-font);
  position: absolute;
  top: calc(50% - var(--percentage-font-size) / 2);
  left: 0;
  font-size: 0;
}
.chart figcaption:after {
  display: inline-block;
  content: '0%\a 1%\a 2%\a 3%\a 4%\a 5%\a 6%\a 7%\a 8%\a 9%\a 10%\a 11%\a 12%\a 13%\a 14%\a 15%\a 16%\a 17%\a 18%\a 19%\a 20%\a 21%\a 22%\a 23%\a 24%\a 25%\a 26%\a 27%\a 28%\a 29%\a 30%\a 31%\a 32%\a 33%\a 34%\a 35%\a 36%\a 37%\a 38%\a 39%\a 40%\a 41%\a 42%\a 43%\a 44%\a 45%\a 46%\a 47%\a 48%\a 49%\a 50%\a 51%\a 52%\a 53%\a 54%\a 55%\a 56%\a 57%\a 58%\a 59%\a 60%\a 61%\a 62%\a 63%\a 64%\a 65%\a 66%\a 67%\a 68%\a 69%\a 70%\a 71%\a 72%\a 73%\a 74%\a 75%\a 76%\a 77%\a 78%\a 79%\a 80%\a 81%\a 82%\a 83%\a 84%\a 85%\a 86%\a 87%\a 88%\a 89%\a 90%\a 91%\a 92%\a 93%\a 94%\a 95%\a 96%\a 97%\a 98%\a 99%\a 100%\a';
  white-space: pre;
  font-size: var(--percentage-font-size);
  line-height: var(--percentage-font-size);
}
@--webkit-keyframes chart-label {
  100% {
    --webkit-transform: translateY(
      calc(-1 * var(--percentage-font-size) * var(--percentage))
    );
    transform: translateY(
      calc(-1 * var(--percentage-font-size) * var(--percentage))
    );
  }
}
@keyframes chart-label {
  100% {
    --webkit-transform: translateY(
      calc(-1 * var(--percentage-font-size) * var(--percentage))
    );
    transform: translateY(
      calc(-1 * var(--percentage-font-size) * var(--percentage))
    );
  }
}
@--webkit-keyframes offset {
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes offset {
  100% {
    stroke-dashoffset: 0;
  }
}
figure {
  margin: 1rem !important;
}
figcaption {
  font-family: 'Abel', sans-serif;
}
</style>
