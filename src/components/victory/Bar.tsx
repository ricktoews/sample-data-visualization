import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryContainer, VictoryStack, VictoryLabel } from 'victory';

const AssignmentScores = [
  { 
    "assignment": "Assignment 1",
    "scores": [
      { "id": 1, "score": 64 },
      { "id": 2, "score": 60 },
      { "id": 4, "score": 83 },
      { "id": 6, "score": 67 },
      { "id": 78, "score": 56 },
      { "id": 3, "score": 87 },
      { "id": 15, "score": 90 },
      { "id": 31, "score": 65 },
      { "id": 188, "score": 70 },
      { "id": 14, "score": 86 },
      { "id": 12, "score": 99 },
      { "id": 431, "score": 80 }
    ]
  },
  {
    "assignment": "Assignment 2",
    "scores": [
      { "id": 1, "score": 64 },
      { "id": 2, "score": 60 },
      { "id": 4, "score": 83 },
      { "id": 6, "score": 67 },
      { "id": 78, "score": 56 },
      { "id": 3, "score": 87 },
      { "id": 15, "score": 90 },
      { "id": 31, "score": 65 },
      { "id": 188, "score": 70 },
      { "id": 14, "score": 86 },
      { "id": 12, "score": 99 },
      { "id": 431, "score": 80 }
    ]
  },
  {
    "assignment": "Assignment 3",
    "scores": [
      { "id": 1, "score": 64 },
      { "id": 2, "score": 60 },
      { "id": 4, "score": 83 },
      { "id": 6, "score": 67 },
      { "id": 78, "score": 56 },
      { "id": 3, "score": 87 },
      { "id": 15, "score": 90 },
      { "id": 31, "score": 65 },
      { "id": 188, "score": 70 },
      { "id": 14, "score": 86 },
      { "id": 12, "score": 99 },
      { "id": 431, "score": 80 }
    ]
  },
  {
    "assignment": "Assignment 4",
    "scores": [
      { "id": 1, "score": 64 },
      { "id": 2, "score": 60 },
      { "id": 4, "score": 83 },
      { "id": 6, "score": 67 },
      { "id": 78, "score": 56 },
      { "id": 3, "score": 87 },
      { "id": 15, "score": 90 },
      { "id": 31, "score": 65 },
      { "id": 188, "score": 70 },
      { "id": 14, "score": 86 },
      { "id": 12, "score": 99 },
      { "id": 431, "score": 80 }
    ]
  }
]

const Thresholds = [
  { "id": "", "min": 0, "max": 64, "label": "<65", "color": "hsl(174, 70%, 50%)", "value": 0 },
  { "id": "", "min": 65, "max": 79, "label": "65-79", "color": "hsl(339, 70%, 50%)", "value": 0 },
  { "id": "", "min": 80, "max": 89, "label": "80-89", "color": "hsl(60, 70%, 50%)", "value": 0 },
  { "id": "", "min": 90, "max": 100, "label": "90+", "color": "hsl(291, 70%, 50%)", "value": 0 },
]

/*
const assignmentSampleData: Array<any> = [];
const Label: string[] = [];
AssignmentScores.forEach((assignmentData: any, asgNdx: number) => {
  Label.push(assignmentData.assignment);
  let studentScores = assignmentData.scores;
  studentScores.forEach((studentItem: any) => {
    Thresholds.forEach((thresholdItem, ndx) => {
      if (studentItem.score >= thresholdItem.min && studentItem.score <= thresholdItem.max) {
        thresholdItem.value++;
        if (!assignmentSampleData[asgNdx]) {
          assignmentSampleData[asgNdx][ndx] = [];
          for (let i = 0; i < 4; i++) {

          }
        }
        assignmentSampleData[asgNdx][ndx].assignment = asgNdx;
        assignmentSampleData[asgNdx][ndx].scores = thresholdItem.value;
      }
    });
  });
});
console.log('assignmentSampleData', assignmentSampleData);

const barChartData: Object[] = [];
Thresholds.forEach(item => {
  barChartData.push(item)
});
*/
const sampleData = [
  [
    {assignment: 1, scores: 5},
    {assignment: 2, scores: 6},
    {assignment: 3, scores: 4},
    {assignment: 4, scores: 6}
  ],
  [
    {assignment: 1, scores: 13},
    {assignment: 2, scores: 17},
    {assignment: 3, scores: 15},
    {assignment: 4, scores: 12}
  ],
  [
    {assignment: 1, scores: 15},
    {assignment: 2, scores: 13},
    {assignment: 3, scores: 19},
    {assignment: 4, scores: 13}
  ],
  [
    {assignment: 1, scores: 6},
    {assignment: 2, scores: 8},
    {assignment: 3, scores: 7},
    {assignment: 4, scores: 9}
  ]
]

const barWidth=1200;

function getCode(barChartData: any) {
  console.log('bar chart data', barChartData.data);
  return (
    <VictoryChart domainPadding={20}>
      <VictoryAxis tickValues={[1, 2, 3, 4]} tickFormat={['Assign 1', 'Assign 2', 'Assign 3', 'Assign 4']} />
      <VictoryAxis dependentAxis={true} tickFormat={(x) => (`${x}`)} />
      <VictoryStack>
        { sampleData.map((item: any, ndx: number) => {
          return <VictoryBar key={ndx}
                    barWidth={({ index }) => 40 }
                    style={{ labels: { fill: "white" } }} 
                    labels={({ datum }) => datum.scores} 
                    width={barWidth} 
                    data={item} 
                    x="assignment" 
                    y="scores" 
                    labelComponent={<VictoryLabel dy={20} />} />
        }
        )}
      </VictoryStack>
    </VictoryChart>
  )
}

function VictoryBarSample(props: any) {
  const html = getCode({ data: sampleData });
  return (
    <div style={{height: '100vh', width: '100vw' }} className="denom-experiment">
      <div style={{height: '50%', width: '50%', }}>
      {html}
      </div>
    </div>
  )
}

export default VictoryBarSample;