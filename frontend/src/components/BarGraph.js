import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class ChartsPage extends React.Component {
    state = {
        dataBar: {
          labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          datasets: [
            {
              label: "Mood level",
              data: [1, 2, 3, 4, 5, 5],
              backgroundColor: [
                "rgba(74, 250, 10, 0.4)",
                "rgba(74, 250, 10, 0.4)",
                "rgba(74, 250, 10, 0.4)",
                "rgba(74, 250, 10, 0.4)",
                "rgba(74, 250, 10, 0.4)",
                "rgba(74, 250, 10, 0.4)",
                "rgba(74, 250, 10, 0.4)"
              ],
              borderWidth: 1.7,
              borderColor: [
                "rgba(74, 250, 10, 1)",
                "rgba(74, 250, 10, 1)",
                "rgba(74, 250, 10, 1)",
                "rgba(74, 250, 10, 1)",
                "rgba(74, 250, 10, 1)",
                "rgba(74, 250, 10, 1)",
                "rgba(74, 250, 10, 1)"
              ]
            },
            {
              label: "Irritability level",
              data: [5, 4, 3, 2, 1, 1],
              backgroundColor: [
                "rgba(250, 26, 10, 0.4)",
                "rgba(250, 26, 10, 0.4)",
                "rgba(250, 26, 10, 0.4)",
                "rgba(250, 26, 10, 0.4)",
                "rgba(250, 26, 10, 0.4)",
                "rgba(250, 26, 10, 0.4)",
                "rgba(250, 26, 10, 0.4)"
              ],
              borderWidth: 1.7,
              borderColor: [
                "rgba(250, 26, 10, 1)",
                "rgba(250, 26, 10, 1)",
                "rgba(250, 26, 10, 1)",
                "rgba(250, 26, 10, 1)",
                "rgba(250, 26, 10, 1)",
                "rgba(250, 26, 10, 1)",
                "rgba(250, 26, 10, 1)"
              ]
            },
            {
              label: "Anxiety level",
              data: [2, 2, 2, 2, 2, 3],
              backgroundColor: [
                "rgba(10, 130, 250, 0.4)",
                "rgba(10, 130, 250, 0.4)",
                "rgba(10, 130, 250, 0.4)",
                "rgba(10, 130, 250, 0.4)",
                "rgba(10, 130, 250, 0.4)",
                "rgba(10, 130, 250, 0.4)",
                "rgba(10, 130, 250, 0.4)"
              ],
              borderWidth: 1.7,
              borderColor: [
                "rgba(10, 130, 250, 1)",
                "rgba(10, 130, 250, 1)",
                "rgba(10, 130, 250, 1)",
                "rgba(10, 130, 250, 1)",
                "rgba(10, 130, 250, 1)",
                "rgba(10, 130, 250, 1)",
                "rgba(10, 130, 250, 1)"
              ]
            },
            {
              label: "Suicidal Inclinations",
              data: [1, 4, 2, 5, 3, 1],
              backgroundColor: [
                "rgba(250, 178, 10, 0.4)",
                "rgba(250, 178, 10, 0.4)",
                "rgba(250, 178, 10, 0.4)",
                "rgba(250, 178, 10, 0.4)",
                "rgba(250, 178, 10, 0.4)",
                "rgba(250, 178, 10, 0.4)",
                "rgba(250, 178, 10, 0.4)"
              ],
              borderWidth: 1.7,
              borderColor: [
                "rgba(250, 178, 10, 1)",
                "rgba(250, 178, 10, 1)",
                "rgba(250, 178, 10, 1)",
                "rgba(250, 178, 10, 1)",
                "rgba(250, 178, 10, 1)",
                "rgba(250, 178, 10, 1)",
                "rgba(250, 178, 10, 1)"
              ]
            }
          ]
        },
        barChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                barPercentage: .2,
                gridLines: {
                  display: true,
                  color: "rgba(0, 0, 0, 0.1)"
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  color: "rgba(0, 0, 0, 0.1)"
                },
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      }


  render() {
    return (
      <MDBContainer>
        <h3 className="mt-5">Bar chart</h3>
        <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
      </MDBContainer>
    );
  }
}

export default BarGraph;
