import { useEffect } from 'react';
import styles from './react-lib-one.module.scss';
import * as d3 from 'd3';

/* eslint-disable-next-line */
export interface ReactLibOneProps {}

export function D3Component(props: ReactLibOneProps) {
  const data = [12, 5, 6, 6, 9, 10];
  const w = 700;
  const h = 400;
  // prevent rendering loop, but still draws twice 🤷‍♂️
  useEffect(() => {
    const svg = d3
      .select('figure#chart')
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .style('margin-left', 100);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 70)
      .attr('y', (d, i) => h - 10 * d)
      .attr('width', 65)
      .attr('height', (d, i) => d * 10)
      .attr('fill', 'green');

    svg
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text((d) => d)
      .attr('x', (d, i) => i * 70)
      .attr('y', (d, i) => h - 10 * d - 3);
  }, []);
  return <figure id="chart"></figure>;
}

export default D3Component;
