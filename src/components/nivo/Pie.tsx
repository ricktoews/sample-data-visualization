/* eslint-disable */
// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePie } from '@nivo/pie'
import { useEffect, useState } from 'react';
import { generateGradeData, GradeData, Thresholds } from '../generate-data/grade-data';

function generateData() {
  const StudentScores: Array<GradeData> = generateGradeData();

  Thresholds.forEach(item => {
    item.value = 0;
  })
  StudentScores.forEach(item => {
    Thresholds.forEach(thresholdItem => {
      if (item.score >= thresholdItem.min && item.score <= thresholdItem.max) {
        thresholdItem.value++;
      }
    });
  });
  
  const pieChartData: Object[] = [];
  Thresholds.forEach(item => {
    item.id = item.label;
    pieChartData.push(item)
  });
  return pieChartData;  
}


const CenteredMetric = ({ dataWithArc, centerX, centerY }: any) => {
  let total = 0
  dataWithArc.forEach((datum: any) => {
    total += datum.value
  })

  return <text
    x={centerX}
    y={centerY}
    textAnchor="middle"
    dominantBaseline="central"
    style={{
      fontSize: '20px',
      fontWeight: 600,
    }}
  >{total} Students</text>;
}

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsivePie = ({ data /* see data tab */ }: any) => (
    <ResponsivePie
        data={data}
        margin={{ top: 80, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
        defs={[
            { id: 'dots', type: 'patternDots', background: 'inherit', color: 'rgba(255, 255, 255, 0.3)', size: 4, padding: 1, stagger: true },
            { id: 'lines', type: 'patternLines', background: 'inherit', color: 'rgba(255, 255, 255, 0.3)', rotation: -45, lineWidth: 6, spacing: 10 }
        ]}
        fill={[
            { match: { id: '<65' }, id: 'dots' },
            { match: { id: '90+' }, id: 'dots' },
            { match: { id: '65-79' }, id: 'lines' },
            { match: { id: '80-89' }, id: 'lines' },
        ]}
        layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 38,
                symbolShape: 'circle',
                effects: [ { on: 'hover', style: { itemTextColor: '#000' } } ]
            }
        ]}
    />
)

function NivoPie(props: any) {
  const [ html, setHtml ] = useState(MyResponsivePie({ data: generateData() }));

  function shuffle() {
    let shuffled = generateData();
    setHtml(MyResponsivePie({ data: shuffled }));
  }

//  const html = MyResponsivePie({ data: pieChartData });
  return (
    <div style={{height: '100vh', width: '100vw' }}>
      <button onClick={shuffle}>Shuffle Data</button>
      <div style={{height: '70%', width: '50%', }}>
      {html}
      </div>
    </div>
  )
}

export default NivoPie;