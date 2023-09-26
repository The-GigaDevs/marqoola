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
            data: [185506,
                401942,
                376214,
                239198,
                275183,
                225241,
                222199,
                331555,
                183517,
                ]
        }
    ]
};

export default chartData;
