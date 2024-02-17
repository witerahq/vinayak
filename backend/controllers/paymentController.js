const Payment = require('../models/Payment');

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { doctorId, amount, mode, transactionID } = req.body;

    const payment = new Payment({
      patientId:req.user._id,
      doctorId,
      amount,
      mode,
      transactionID,
    });

    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating payment' });
  }
};

// Get all payments based on doctorId and populate patient information
exports.getPaymentsByDoctorId = async (req, res) => {
  const { _id:doctorId } = req.user;

  try {
    const payments = await Payment.find({ doctorId }).populate('patientId');

    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching payments' });
  }
};
