import { useState } from 'react';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme } from 'victory';


const UserLogins = [
  [
    { x: 0, y: 0 },
    { x: 1, y: 20 },
    { x: 2, y: 30 },
    { x: 3, y: 20 },
    { x: 4, y: 40 },
    { x: 5, y: 10 }
  ],
  [
    { x: 0, y: 0 },
    { x: 1, y: 30 },
    { x: 2, y: 30 },
    { x: 3, y: 40 },
    { x: 4, y: 40 },
    { x: 5, y: 20 }
  ]
]
const lineChartData: Object[] = [];
UserLogins.forEach(item => {
  lineChartData.push(item)
});



const barColors = ['#999', '#ccc'];
function getCode({data}: any) {
console.log('getCode', data);
  return (<VictoryChart
  theme={VictoryTheme.material}
>
  <VictoryAxis tickValues={[1, 2, 3, 4]} tickFormat={['Mon 5/2', 'Tue 5/3', 'Wed 5/4', 'Thu 5/5']} />
  <VictoryAxis dependentAxis={true} tickFormat={(x) => (`${x}`)} />

{ data.map((item: any, ndx: number) => {
  return <VictoryLine key={ndx}
  style={{
    data: { stroke: barColors[ndx] },
    parent: { border: "1px solid #ccc"}
  }}
  data={item}
/>
})}
</VictoryChart>);

}

function Line(props: any) {
  const [ data, setData ] = useState(UserLogins);
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

  return (
    <div style={{height: '100vh', width: '100vw' }}>
      <div style={{height: '80%', width: '50%', float: 'left'}}>
      {html}
      </div>
      <div style={{display: "none", marginTop: "50px", height: '80%', width: '40%', float: 'left'}}>
      <textarea id="data" onChange={handleDataChange} style={{height: '100%', width: '100%'}} defaultValue={JSON.stringify(data, null, 2)}></textarea>
      </div>
    </div>
  )
}

export default Line;