/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ChartView from 'react-native-highcharts';

type Props = {};

export default class Graph extends Component<Props> {
  
  render() {
      var Highcharts='Highcharts'
      var conf={
              chart: {
                  type: 'spline',
                  animation: Highcharts.svg, // don't animate in old IE
                  marginRight: 10,
                  events: {
                      load: function () {
  
                          // set up the updating of the chart each second
                          var series = this.series[0];
                          setInterval(function () {
                              var x = (new Date()).getTime(), // current time
                                  y = Math.random();
                              series.addPoint([x, y], true, true);
                          }, 1000);
                      }
                  }
              },
              title: {
                  text: 'Humidity'
              },
              yAxis: {
                title: {
                    text: 'Humidity in %'
                    }
                },
                xAxis: {
                    title: {
                    text: 'Time in hours'
                }
            },
            plotOptions: {
                series: {
                label: {
                    connectorAllowed: false
                },
                    pointStart: 1
                }
            },

              tooltip: {
                  formatter: function () {
                      return '<b>' + this.series.name + '</b><br/>' +
                          Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                          Highcharts.numberFormat(this.y, 2);
                  }
              },
              legend: {
                  enabled: false
              },
              exporting: {
                  enabled: true,
                  filename: 'export-file'
              },
              series: [{
                    name: 'Maximum',
                    data: [65, 40, 20, 5, 5, 42, 60, 33, 66, 10]
                },
                {
                    name: 'Average',
                    data: [50, 30, 20, 13, 18, 15, 3, 8, 10, 30]
                },
                {
                    name: 'Minimum',
                    data: [50, 40, 10, 0, 0, 19, 7, 2, 8, 50, 23]
                },
                {
                    name: 'Day Maximum',
                    data: [78, 78, 78, 78, 78, 78, 78, 78, 78, 78]
                },
                {
                    name: 'Day Average',
                    data: [37, 37, 37, 37, 37, 37, 37, 37, 37, 37]
                },
                {
                    name: 'Day Minimum',
                    data: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
                }]
          };
  
      const options = {
          global: {
              useUTC: false
          },
          lang: {
              decimalPoint: ',',
              thousandsSep: '.'
          }
      };
  
      return (
        <ChartView style={{height:300}} config={conf} options={options}></ChartView>
      );
  }
}

const styles = StyleSheet.create({
  loremStyle:{
    padding: 10
  }
})
