// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line'

const logins = (max: number) => {
  let result = max - Math.floor(Math.random() * 30);
  return result;
}

function generateData() {
  let randomData = { data: 
    [
      {
        "id": "2022",
        "color": "purple",
        "data": [
          {
            "x": "Jan",
            "y": logins(100)
          },
          {
            "x": "Feb",
            "y": logins(100)
          },
          {
            "x": "Mar",
            "y": logins(100)
          },
          {
            "x": "Apr",
            "y": logins(100)
          },
          {
            "x": "May",
            "y": logins(100)
          },
          {
            "x": "Jun",
            "y": logins(100)
          },
        ]
      },
      {
        "id": "2021",
        "color": "orange",
        "data": [
          {
            "x": "Jan",
            "y": logins(100)
          },
          {
            "x": "Feb",
            "y": logins(100)
          },
          {
            "x": "Mar",
            "y": logins(100)
          },
          {
            "x": "Apr",
            "y": logins(100)
          },
          {
            "x": "May",
            "y": logins(100)
          },
          {
            "x": "Jun",
            "y": logins(100)
          },
        ]
      }
    ]
  }
  return randomData;
}



// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = ({ data /* see data tab */ }: any) => {

  return (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Logins',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
  );
}

function NivoLine(props: any) {
  const [ html, setHtml ] = useState(MyResponsiveLine(generateData()));

  useEffect(() => {
    
  }, [])

  function shuffle() {
    setHtml(MyResponsiveLine(generateData()));
  }

  return (
    <div style={{height: '100vh', width: '100vw' }}>
      <div style={{height: '70%', width: '50%', }}>
      <button onClick={shuffle}>Shuffle Data</button>
      {html}
      </div>
    </div>
  )
}

export default NivoLine;