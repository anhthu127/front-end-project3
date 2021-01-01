import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import ApexCharts from "react-apexcharts";
import makeRequest from '../../libs/request';
import { Card } from "react-bootstrap";
import Loading from '../loading';
import { Link } from 'react-router-dom';

const Dashboard = (props) => {
  const [listData, setListData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    getInfoDashboard();
  }, []);

  const getInfoDashboard = () => {
    setLoading(true);
    makeRequest('get', `report/getReportDashboard`).then(({ data }) => {
      if (data.signal) {
        let objectData = [];
        for (let i = 0; i < data.data.listUserAnswers.length; i++) {
          if (data.data.listUserAnswers[i].listUserAnswer.length < 6) {
            let lenListForm = data.data.listUserAnswers[i].listUserAnswer.length;
            for (let j = 0; j < 6 - lenListForm; j++) {
              data.data.listUserAnswers[i].listUserAnswer.push('');
            }
          }
        }

        for (let i = 0; i < data.data.listUserAnswers.length; i++) {
          let objData = {
            totalForm: data.data.totalForms[i],
            totalUser: data.data.totalUsers[i],
            title: data.data.listTitle[i],
            dataLabel: {
              chart: {
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'smooth'
              },
              grid: {
                row: {
                  colors: ['#f3f3f3', 'transparent'],
                  opacity: 0.5
                },
              },
              xaxis: {
                axisTicks: {
                  show: false
                },
                axisBorder: {
                  show: false
                },
                labels: {
                  show: false
                },
                categories: data.data.listForms[i].listForm,
              },
              yaxis: {
                height: 200,
                tickPlacement: 'between',
                allowDecimals: false,
                tickAmount: ((Math.max(...data.data.listUserAnswers[i].listUserAnswer) === 1 || Math.max(...data.data.listUserAnswers[i].listUserAnswer) === 0) ? (1) :
                  ((Math.max(...data.data.listUserAnswers[i].listUserAnswer) === 2 || Math.max(...data.data.listUserAnswers[i].listUserAnswer) == 4) ?
                    (2) : (Math.max(...data.data.listUserAnswers[i].listUserAnswer) === 3) ? (3) : (undefined))),
                labels: {
                  formatter: function (value) {
                    return `${value.toFixed(0)} người `;
                  },
                  background: {
                    enabled: true,
                    foreColor: '#fff',
                    padding: 4,
                    borderRadius: 2,
                    borderWidth: 1,
                    borderColor: '#fff',
                    opacity: 0.9,
                    dropShadow: {
                      enabled: false,
                      top: 1,
                      left: 1,
                      blur: 1,
                      color: '#000',
                      opacity: 0.45
                    }
                  },
                },
              }
            },
            data: [
              {
                name: 'Số người tham gia',
                data: data.data.listUserAnswers[i].listUserAnswer
              }
            ]
          }
          objectData.push(objData);
        }
        setListData([...objectData]);
      }
      setLoading(false);
    })
  }

  return <div className="row">

    <div className="col-md-12">

      <div className="kt-section">
        <Card>
          <Card.Body>
            {isLoading ? <Loading /> : <>
              {
                listData && listData.length && listData.map((item, idx) => {
                  return <>
                    <div className="row" style={{ marginTop: '20px', marginBottom: '20px' }}>
                      <div className="col-lg-12">
                        <div style={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          textAlign: 'center', fontSize: '21px',
                          position: "relative",
                          font: 'bold', marginBottom: '10px', color: '#122352'
                        }}>Biểu đồ đợt khảo sát:   {item.title}
                        </div>
                        <div className="row">
                          <div className="col-lg-3">
                            <div className="card card-custom bg-success gutter-b" style={{ height: '150px' }}>
                              <div className="card-body">
                                <i className="flaticon2-analytics-2 text-white icon-2x"> </i>
                                <div className="text-inverse-success font-weight-bolder font-size-h2 mt-3">{item.totalForm || 0}</div>
                                <Link href="#" className="text-inverse-success font-weight-bold font-size-lg mt-1">Tổng số form trong đợt</Link>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="card card-custom bg-primary gutter-b" style={{ height: '150px' }}>
                              <div className="card-body">
                                <i className="flaticon2-shopping-cart-1 text-white icon-2x"> </i>
                                <div className="text-inverse-success font-weight-bolder font-size-h2 mt-3"> {item.totalUser || 0} </div>
                                <Link href="#" className="text-inverse-success font-weight-bold font-size-lg mt-1">Tổng số người tham gia</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="chart" style={{
                      borderBottom: 'solid', borderWidth: 'thin',
                      width: "100%",
                      height: "100%",
                      marginBottom: '50px', borderColor: '#B9F8FB'
                    }}>
                      <ApexCharts options={item.dataLabel} series={item.data} type="bar" height={400} />
                    </div>
                  </>
                })}
            </>}
          </Card.Body>
        </Card>
      </div>
    </div>
  </div >
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user
});

export default connect(mapStateToProps, null)(Dashboard);
