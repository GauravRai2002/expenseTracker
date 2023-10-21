import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function LineChart({balanceHistory,remarks}) {
    console.log(balanceHistory)
    console.log(remarks)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Remaining balance per transaction',
            },
        },
    };
    const labels = [...remarks]
    const data = {
        labels,
        datasets: [
          {
            label: 'Balance',
            data: [...balanceHistory],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      };
    return (
        <div className='w-5/6 mx-auto my-6'>
            <Line className='' options={options} data={data} />
        </div>
    )
}

export default LineChart