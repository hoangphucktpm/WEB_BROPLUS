import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../AdminLayout';
import './style.scss';

const ManageTrips = () => {
  const [trips, setTrips] = useState([]);
  const [editingTrip, setEditingTrip] = useState(null);
  const [tripData, setTripData] = useState({
    from: '',
    to: '',
    formTime: '',
    toTime: '',
    duration: '',
    price: '',
    seats: '',
    busType: '',
  });

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('/trip');
        setTrips(response.data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData({ ...tripData, [name]: value });
  };

  // Hàm định dạng ngày tháng cho input kiểu datetime-local
  const formatDateTimeForInput = (dateTime) => {
    const date = new Date(dateTime);
    return date.toISOString().slice(0, 16); // Lấy định dạng YYYY-MM-DDTHH:MM
  };

  const handleEditClick = (trip) => {
    setEditingTrip(trip._id);
    setTripData({
      ...trip,
      formTime: formatDateTimeForInput(trip.formTime),
      toTime: formatDateTimeForInput(trip.toTime),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/trip/${editingTrip}`, tripData);
      setEditingTrip(null);
      const response = await axios.get('/trip');
      setTrips(response.data);
    } catch (error) {
      console.error('Error updating trip:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/trip/${id}`);
      const response = await axios.get('/trip');
      setTrips(response.data);
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="all-trips-container">
        <h2>Danh Sách Chuyến Đi</h2>
        {trips.map((trip) => (
          <div key={trip._id} className="trip-item">
            {editingTrip === trip._id ? (
              <form className="edit-trip-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="from">Từ:</label>
                  <input type="text" id="from" name="from" value={tripData.from} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="to">Đến:</label>
                  <input type="text" id="to" name="to" value={tripData.to} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="formTime">Thời gian khởi hành:</label>
                  <input type="datetime-local" id="formTime" name="formTime" value={tripData.formTime} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="toTime">Thời gian đến:</label>
                  <input type="datetime-local" id="toTime" name="toTime" value={tripData.toTime} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="duration">Thời gian:</label>
                  <input type="text" id="duration" name="duration" value={tripData.duration} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Giá:</label>
                  <input type="number" id="price" name="price" value={tripData.price} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="seats">Số ghế:</label>
                  <input type="number" id="seats" name="seats" value={tripData.seats} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="busType">Loại xe:</label>
                  <input type="text" id="busType" name="busType" value={tripData.busType} onChange={handleChange} required />
                </div>

                <button type="submit" className="submit-button">Lưu Chỉnh Sửa</button>
              </form>
            ) : (
              <div className="trip-details">
                <p>Từ: {trip.from}</p>
                <p>Đến: {trip.to}</p>
                <p>Thời gian khởi hành: {new Date(trip.formTime).toLocaleString('vi-VN')}</p>
                <p>Thời gian đến: {new Date(trip.toTime).toLocaleString('vi-VN')}</p>
                <p>Thời gian đi: {trip.duration}</p>
                <p>Giá: {trip.price} VND</p>
                <p>Số ghế: {trip.seats}</p>
                <p>Loại xe: {trip.busType}</p>

                <button onClick={() => handleEditClick(trip)} className="edit-button">Chỉnh Sửa</button>
                <button onClick={() => handleDelete(trip._id)} className="delete-button">Xoá</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default ManageTrips;
