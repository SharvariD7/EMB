import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2'
import _ from 'lodash';

const BarChart = ({ chartData, chartTitle }) => {

    const arrLabels_predefined = ['genetic_association', 'somatic_mutation',
        'known_drug', 'affected_pathway', 'literature', 'rna_expression', 'animal_model'];

    const arrLabels_available = [];
    chartData.forEach(data => {
        arrLabels_available.push(data.id);
    })

    const arrLabels = []; const arrData = [];

    const title = "Data Type Scores: " + chartTitle + " and lung carcinoma";

    arrLabels_predefined.forEach(el => {

        chartData.forEach(element => {
            if (element.id == el) {
                arrLabels.push(_.startCase(element.id.replace('_', ' ')));
                arrData.push(element.score);
            }
            else {
                const lbl = _.startCase(el.replace('_', ' '));

                if (!arrLabels.includes(lbl)
                    && !arrLabels_available.includes(el)
                ) {
                    arrLabels.push(lbl);
                    arrData.push('0.00');
                }
            }
        })

    });
    return (
        <div style={{width: 873,height: 386, margin: '0 auto'}}>
            <Bar
                data={{
                    labels: arrLabels,
                    datasets: [{
                        label: title,
                        data: arrData,
                        backgroundColor: [
                            'rgba(52,137,202,255)',
                        ],
                        borderColor: [
                            'rgba(184,220,244,255)'//#b8dcf4
                        ],
                        hoverBackgroundColor: 'rgba(52,137,202,255)',
                        borderWidth: 1,
                        barPercentage: 0.45,
                        minBarLength: 2,
                    }]
                }}
                

                options={{
                    animation: false,
                    showLine: false,
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {

                        y: {
                            max: 1,
                            min: 0,
                            ticks: {
                                // Return exact decimal value as specified in stepSize without rounding the value
                                callback: function (value, index, ticks) {
                                    return value.toPrecision(3);
                                },
                                stepSize: 0.250
                            }
                            , suggestedMin: 0,
                            suggestedMax: 1,
                            stacked: false,
                            display: true,
                            text: 'Association Score',
                            precision: 3,
                            title: {
                                color: 'black',
                                display: true,
                                text: 'Association Score'
                            }, gridLines: {
                                display: false,
                            },
                        },
                        x: {
                            title: {
                                color: 'black',
                                display: true,
                                text: 'Data Type'
                            },
                        }
                    },
                    font: {
                        size: 5
                    },
                }}
            />
        </div>
    );
}

export default BarChart;
