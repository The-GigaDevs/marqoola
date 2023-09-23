// ==============================|| DASHBOARD - BAJAJ AREA CHART ||============================== //

const chartData = {
    type: 'area',
    height: 95,
    options: {
        chart: {
            id: 'support-chart',
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 1
        },
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: () => 'Ticket '
                }
            },
            marker: {
                show: false
            }
        }
    },
    series: [
        {
            data: [257000, 277550, 299132, 320701, 342283, 302650]
        }
    ]
};

export default chartData;
