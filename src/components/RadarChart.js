import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { Radar } from 'react-chartjs-2'
import _ from 'lodash';

const RadarChartNew = ({ chartData, chartTitle }) => {
    
    // Set default parameters
    const arrLabels_predefined = ['genetic_association', 'somatic_mutation',
        'known_drug', 'affected_pathway', 'literature', 'rna_expression', 'animal_model'];

    const arrLabels_available = [];

    // Check for available labels from the api data
    chartData.forEach(data => {
        arrLabels_available.push(data.id);
    })

    const arrLabels = [];
    const arrData = [];

    const title = "Data Type Scores: " + chartTitle + " and lung carcinoma";

    arrLabels_predefined.forEach(el => {

        chartData.forEach(element => {
            if (element.id == el) {
                arrLabels.push(_.startCase(element.id.replace('_', ' ')));
                arrData.push(element.score);
            }
            else {
                if (!arrLabels.includes(_.startCase(el.replace('_', ' ')))
                    && !arrLabels_available.includes(el)
                ) {
                    arrLabels.push(_.startCase(el.replace('_', ' ')));
                    arrData.push('0.00');
                }
            }
        })

    });

    return (
        <div style={{width: 873,height: 386, margin: '0 auto'}}>
            <Radar data={{
                labels: arrLabels,
                datasets: [{
                    label: title,
                    data: arrData,
                    fill: true,
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(52,137,202,255)',
                    pointBackgroundColor: 'rgba(52,137,202,255)',
                    pointBorderColor: 'rgba(52,137,202,255)',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)',
                }]
                
            }}
                height={200}
                width={300}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            max: 1,
                            min: 0,
                            ticks: {
                                // Return exact decimal value as specified in stepSize without rounding the value
                                callback: function (value, index, ticks) {
                                    return value.toPrecision(3);
                                },
                                stepSize: 0.250,
                            }
                            , suggestedMin: 0,
                            suggestedMax: 1,
                            grid: {
                                circular: true
                             }
                        },
                    },
                    layout: {
                        padding: 10
                    },
                    elements: {
                        line: {
                          borderWidth: 1
                        }
                      }
                }}
            />
        </div>
    );
}

export default RadarChartNew;