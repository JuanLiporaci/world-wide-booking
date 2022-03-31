import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from 'react';
import moment from 'moment';
import DatePicker from "react-datepicker";
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom'
import Spinner from '../../Components/Spinner';
import "react-datepicker/dist/react-datepicker.css";
import "./Reservation.css"

const Reservation = () => {

    const { slugName } = useParams();

    const [accommodation, setAccommodations] = useState(null);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [adults, setAdults] = useState('');
    const [kids, setKids] = useState('');
    const [plan, setPlan] = useState('');

    const navigate = useNavigate();

    const [error, setError] = useState({
        generic: ''
    });
    const calculateDaysLeft = (startDate, endDate) => {
        if (!moment.isMoment(startDate)) startDate = moment(startDate);
        if (!moment.isMoment(endDate)) endDate = moment(endDate);
        return endDate.diff(startDate, "days");
    };
    useEffect(() => {
        setLoading(true);
        fetch('http://142.93.61.14:9000/accommodations/' + slugName + '/', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
        }).then(data => {
            if (!data.ok) {
                throw data
            }
            return data.json()
        })
            .then(
                data => {
                    setAccommodations(data)
                    setLoading(false);
                }
            ).catch(error => {
                error.json().then((body) => {
                    let generic = ''
                    if (body.non_field_errors) {
                        generic = body.non_field_errors[0]
                    }
                    if (body.detail == "Authentication credentials were not provided.") {
                        localStorage.removeItem('token')
                        localStorage.removeItem('user')
                        navigate('/login')
                    }
                    setError({ generic: generic })
                })
            })
    }, []);

    const reserve = event => {
        event.preventDefault()
        setError('')
        const jsonBody = JSON.stringify({
          "plan": plan,
          "entrance_date": startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate()
          ,
          "departure_date": endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate()
        })
        fetch('http://127.0.0.1:8000/accommodations/' + slugName + '/reserve/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
          body: jsonBody
        }).then(data => {
          if (!data.ok) {
            throw data
          }
          return data.json()
        })
          .then(
            data => {
              navigate('/reserve/success')
            }
          ).catch(error => {
            error.json().then((body) => {
              let plan = ''
              let generic = ''
              let endDate = ''
              let startDate
              if (body.departure_date) {
                endDate = body.departure_date[0]
              }
              if (body.entrance_date) {
                startDate = body.entrance_date[0]
              }
              if (body.plan) {
                plan = body.plan[0]
              }
              if (body.non_field_errors) {
                generic = body.non_field_errors[0]
              }
              setError({ plan: plan, endDate: endDate, startDate: startDate, generic: generic })
              navigate('/payment/success')
            })
          })
      }

    if (loading) {
        return (
            <Spinner />
        )
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4">
                    <div>
                        <h1 className="display-4 BlackText">Reservation</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-12 my-auto">
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Accommodation name</th>
                                        <td>{accommodation.name}</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-md-6 col-12">
                            <div className="form-group">
                                <label htmlFor="Fromdate" className="font-weight-bolder mr-3">From Date </label>
                                <DatePicker selected={startDate} name='startDate' onChange={(date) => setStartDate(date)} className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="form-group">
                                <label htmlFor="Todate" className="font-weight-bolder mr-3">To Date </label>
                                <DatePicker selected={endDate} name='endDate' onChange={(date) => setEndDate(date)} className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-md-12 col-12">
                            <div className="form-group">
                                <label htmlFor="payment" className="font-weight-bolder">Plan</label>
                                <select className="form-control" nChange={(plan) => setPlan(plan)}>
                                    {accommodation.plans.map((plan) =>
                                        <option value={plan.id}>{plan.name}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="Fromdate" className="font-weight-bolder mr-3">Adults</label>
                                    <input type='number' name='adults' onChange={(kids) => setKids(kids)} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="Fromdate" className="font-weight-bolder mr-3">Kids</label>
                                    <input type='number' name='kids' onChange={(adults) => setAdults(adults)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-12 my-auto">
                            <div className="col-md-12 col-12 float-right">
                                <button className="btn btn-reservation" data-toggle="modal" data-target="#thanks" onClick={reserve}>Confirm Booking</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )


}

export default Reservation