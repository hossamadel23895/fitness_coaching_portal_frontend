import React, { useState, useEffect } from "react";

import loading from "../../static/img/loading.gif";
import { useAlert } from "react-alert";

function ClientAppointments({ client, updateMainComponent }) {
  const alert = useAlert();

  const cancelAppointment = (book_id) => (e) => {
    e.preventDefault();

    fetch(`http://127.0.0.1:8001/api/cancelAppointment/${book_id}`, {
      method: "GET",
      credentials: "include",
    })
      .then(() => {
        alert.success("Appointment was cancelled successfully");
        setTimeout(() => {
          window.location.href = "http://localhost:3006/my-appointments";
        }, 1000);
      })
      .catch((error) => {
        console.log("error", error);
        alert.error("fail to Cancel Appointment");
      });
  };
  return (
    <React.Fragment>
      <section className="section custom-tabs" style={{ height: "528px" }}>
        <div className="container">
          <table className="table table-test">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Coach</th>
                <th scope="col">day</th>
                <th scope="col">Time</th>
                <th scope="col">Status</th>
                <th scope="col"> Cancel </th>
              </tr>
            </thead>
            <tbody>
              {/*
              Don't render until client books are fetched,
              And after fetch do the second check of having an appointments or not
              */}
              {client.books ? (
                client.books.length ? (
                  client.books.map((item, index) => {
                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{item.coach.name_en}</td>
                        <td>{item.day}</td>
                        <td>{item.time}</td>
                        <td>
                          {item.confirm ? (
                            <span className="badge badge-success">
                              Confirmed
                            </span>
                          ) : (
                            <span className="badge badge-warning">Pending</span>
                          )}
                        </td>
                        <td>
                          {!item.confirm ? (
                            <i
                              className="fa fa-trash text-danger delete-appointment"
                              style={{ fontSize: "22px" }}
                              onClick={cancelAppointment(item.id)}
                            ></i>
                          ) : (
                            "Can't be cancelled"
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="bg-transparent">
                      <div
                        className="d-flex justify-content-center align-items-center w-100"
                        style={{
                          fontSize: "30px",
                          fontWeight: "bold",
                          minHeight: "250px",
                        }}
                      >
                        <span className="alert alert-danger">
                          You don't have any appointments yet
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              ) : (
                ""
              )}
            </tbody>
          </table>
        </div>
      </section>
    </React.Fragment>
  );
}

export default ClientAppointments;
