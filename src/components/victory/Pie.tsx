import { useState } from 'react';
import { VictoryPie, VictoryLabel, VictoryTheme } from 'victory';

const StudentScores = [
    { "id": 1, "score": 64 },
    { "id": 2, "score": 80 },
    { "id": 4, "score": 83 },
    { "id": 6, "score": 67 },
    { "id": 78, "score": 65 },
    { "id": 3, "score": 77 },
    { "id": 15, "score": 90 },
    { "id": 31, "score": 65 },
    { "id": 188, "score": 70 },
    { "id": 14, "score": 86 },
    { "id": 12, "score": 99 },
    { "id": 431, "score": 80 },
  ]
  
  const Thresholds = [
    { "id": "", "min": 0, "max": 64, "label": "<65", "color": "hsl(174, 70%, 50%)", "value": 0 },
    { "id": "", "min": 65, "max": 79, "label": "65-79", "color": "hsl(339, 70%, 50%)", "value": 0 },
    { "id": "", "min": 80, "max": 89, "label": "80-89", "color": "hsl(60, 70%, 50%)", "value": 0 },
    { "id": "", "min": 90, "max": 100, "label": "90+", "color": "hsl(291, 70%, 50%)", "value": 0 },
  ]
  
  StudentScores.forEach(item => {
    Thresholds.forEach(thresholdItem => {
      if (item.score >= thresholdItem.min && item.score <= thresholdItem.max) {
        thresholdItem.value++;
      }
    });
  });
  
  const pieChartData: Object[] = [];
  Thresholds.forEach((item: any, ndx: number) => {
    item.id = item.label;
    item.x = ndx + 1;
    item.y = item.value;
    pieChartData.push(item)
  });
  
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
        fontSize: '32px',
        fontWeight: 600,
      }}
    >{total} Students</text>;
  }
  
function getCode({ data }: any) {
    console.log('getCode', data);
  return (
    <svg viewBox="0 0 400 400" >
    <VictoryPie
      standalone={false}
      width={400} height={400}
      innerRadius={70} labelRadius={100}
      style={{ labels: { fontSize: 20, fill: "white"}}}
      data={data}
      animate={{
        duration: 2000
      }}
      colorScale={["#ddd", "#999", "#ccc", "#666", "#888" ]}
    />
    <circle cx="200" cy="200" r="65" fill="none" stroke="black" strokeWidth={3}/>
  <circle cx="200" cy="200" r="155" fill="none" stroke="black" strokeWidth={3}/>
  <VictoryLabel
    textAnchor="middle" verticalAnchor="middle"
    x={200} y={200}
    style={{fontSize: 20}}
    text="12 Students"
  />
    </svg>
  )
}
  
function VictoryPieSample(props: any) {
  const [ data, setData ] = useState(pieChartData);
  const [ html, setHtml ] = useState(getCode({ data }));

  const handleDataChange = (e: any) => {
    const el = e.target;
    try {
      const lineData = JSON.parse(el.value);
      setData(lineData);
      setHtml(getCode({ data: lineData }));
          console.log('data change', lineData);
    } catch (e) {
      console.log('invalid json');
    }
  }

//  const html = getCode({ data: pieChartData });
  return (
    <div style={{height: '100vh', width: '100vw' }}>
      <div style={{height: '80%', width: '50%', float: 'left'}}>
      {html}
      </div>
      <div style={{display: 'none', marginTop: "50px", height: '80%', width: '40%', float: 'left'}}>
        <textarea id="data" onChange={handleDataChange} style={{height: '100%', width: '100%'}} defaultValue={JSON.stringify(pieChartData, null, 2)}></textarea>
      </div>

    </div>
  )
}

export default VictoryPieSample;