const Trip = require("../models/Trip");


// Hàm tạo số ghế
function generateSeats(seatsCount, prefix) {
  const seats = [];
  for (let i = 1; i <= seatsCount; i++) {
    const seatId = `${prefix}${i.toString().padStart(2, "0")}`;
    seats.push({ id: seatId, status: "available" });
  }
  return seats;
}

const tripController = {
  //GET ALL TRIPS
  getAllTrips: async (req, res) => {
    try {
      const trips = await Trip.find();
      res.status(200).json(trips);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // GET TRIP BY CUSTOM ID (id field)
  getTripById: async (req, res) => {
    try {
      const trip = await Trip.findOne({ id: req.params.id }); 
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }
      res.status(200).json(trip);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // CREATE TRIP
  createTrip: async (req, res) => {
    try {
      const {
        id,
        from,
        to,
        formTime,
        toTime,
        duration,
        price,
        busType,
      } = req.body;
  
      if (!id || !from || !to || !formTime || !toTime || !duration || !price || !busType) {
        return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin chuyến đi." });
      }
  
      const numberOfSeats = {
        tangDuoi: 17, 
        tangTren: 17, 
      };
  
      const seats = {
        tangDuoi: generateSeats(numberOfSeats.tangDuoi, "A"), 
        tangTren: generateSeats(numberOfSeats.tangTren, "B"), 
      };
  
      const newTrip = new Trip({
        id,
        from,
        to,
        formTime,
        toTime,
        duration,
        price,
        seats,
        busType,
      });
  
      const trip = await newTrip.save();
  
      return res.status(201).json(trip);
    } catch (err) {
      return res.status(500).json({ message: `Lỗi khi tạo chuyến đi: ${err.message}` });
    }
  },
  

  // UPDATE TRIP
  updateTrip: async (req, res) => {
    try {
      const {
        id,
        from,
        to,
        formTime,
        toTime,
        duration,
        price,
        seats,
        busType,
      } = req.body;

      if (
        !id ||
        !from ||
        !to ||
        !formTime ||
        !toTime ||
        !duration ||
        !price ||
        !seats ||
        !busType
      ) {
        return res
          .status(400)
          .json({ message: "Vui lòng cung cấp đầy đủ thông tin chuyến đi." });
      }

      const trip = await Trip.findById(req.params.id);

      if (!trip) {
        return res.status(404).json({ message: "Không tìm thấy chuyến đi." });
      }

      trip.id = id;
      trip.from = from;
      trip.to = to;
      trip.formTime = formTime;
      trip.toTime = toTime;
      trip.duration = duration;
      trip.price = price;
      trip.seats = seats;
      trip.busType = busType;

      const updatedTrip = await trip.save();

      return res.status(200).json(updatedTrip);
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Lỗi khi cập nhật chuyến đi: ${err.message}` });
    }
  },

  //DELETE TRIP
  deleteTrip: async (req, res) => {
    try {
      await Trip.findByIdAndDelete(req.params.id);
      res.status(200).json("Trip deleted");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = tripController;
