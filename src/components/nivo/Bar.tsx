import { useEffect, useState } from 'react';
// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar'
import { generateGradeData, GradeData, Thresholds } from '../generate-data/grade-data';

function generateData() {
  const StudentScores: Array<GradeData> = generateGradeData();

  const barChartData: Object[] = [];
  StudentScores.forEach((item: any) => {
    let gradeLevel = item.grade;
    let score = item.score;
    let thresholdItem: any = Thresholds.find((thresholdItem: any) => score >= thresholdItem.min && score <= thresholdItem.max);
    if (thresholdItem) {
      let threshold = thresholdItem.label;
      let barChartItem: any = barChartData.find((dataItem: any) => dataItem.grade === gradeLevel);
      if (!barChartItem) {
        barChartItem = { grade: gradeLevel };
        Thresholds.forEach((t: any) => {
          barChartItem[t.label] = 0
        });
        barChartData.push(barChartItem);
      } else {
        barChartItem[threshold]++;
      }
    }
  });
  
  barChartData.sort((a: any, b: any) => a.grade - b.grade);
  barChartData.forEach((item: any) => {
    item.grade = 'Grade ' + item.grade;
  });

  return barChartData;
}

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MyResponsiveBar = ({ data /* see data tab */ }: any) => {
  const keys = Thresholds.map((item: any) => item.label);
  return (<ResponsiveBar
        data={data}
        keys={keys}
        indexBy="grade"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            { id: 'dots', type: 'patternDots', background: 'inherit', color: '#38bcb2', size: 4, padding: 1, stagger: true },
            { id: 'lines', type: 'patternLines', background: 'inherit', color: '#eed312', rotation: -45, lineWidth: 6, spacing: 10 }
        ]}
        fill={[
            { match: { id: 'fries' }, id: 'dots' },
            { match: { id: 'sandwich' }, id: 'lines' }
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendPosition: 'middle', legendOffset: 32 }}
        axisLeft={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: 'Number of Students', legendPosition: 'middle', legendOffset: -40 }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [ [ 'darker', 1.6 ] ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 10,
                translateY: 50,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [ { on: 'hover', style: { itemOpacity: 1 } } ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
    />
)
}

function NivoBar(props: any) {
  const [ html, setHtml ] = useState(MyResponsiveBar({ data: generateData() }));

  useEffect(() => {
    
  }, [])

  function shuffle() {
    setHtml(MyResponsiveBar({ data: generateData() }));
  }


//  const html = MyResponsiveBar({ data: barChartData });
  return (
    <div style={{height: '100vh', width: '100vw' }}>
      <button onClick={shuffle}>Shuffle Data</button>
      <div style={{height: '50%', width: '50%', }}>
      {html}
      </div>
    </div>
  )
}

export default NivoBar;