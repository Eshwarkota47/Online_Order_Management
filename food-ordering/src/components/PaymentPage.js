import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaymentPage.css';

const PaymentPage = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(''); // State for selected payment method
  const [upiApp, setUpiApp] = useState(''); // State for selected UPI app
  const [upiId, setUpiId] = useState(''); // State for UPI ID input
  const [tokenNumber, setTokenNumber] = useState(''); // State for token number
  const [paymentSuccess, setPaymentSuccess] = useState(false); // State for payment success

  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem('order')) || [];
    const total = savedOrder.reduce((sum, item) => sum + parseFloat(item.price.replace('₹', '')) * item.quantity, 0);
    setTotalAmount(total.toFixed(2));
  }, []);

  const generateTokenNumber = () => {
    const token = 'ORD' + Math.floor(100000 + Math.random() * 900000);
    return token;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = generateTokenNumber();
    try {
      // Simulate payment processing
      await axios.post('http://localhost:5000/payment', { token, totalAmount, paymentMethod, upiApp, upiId });
      setTokenNumber(token);
      setPaymentSuccess(true);
      alert(`Payment successful! Your order is accepted. Your token number is: ${token}`);
    } catch (error) {
      console.error("There was an error processing the payment!", error);
    }
  };

  return (
    <div className="payment-container">
      <h1>Payment Page</h1>
      <p>Total Amount: ₹{totalAmount}</p>
      <div className="payment-options">
        <label>
          <input
            type="radio"
            value="debitCard"
            checked={paymentMethod === 'debitCard'}
            onChange={() => setPaymentMethod('debitCard')}
          />
          Debit Card
        </label>
        <label>
          <input
            type="radio"
            value="upi"
            checked={paymentMethod === 'upi'}
            onChange={() => setPaymentMethod('upi')}
          />
          UPI
        </label>
      </div>

      {paymentMethod === 'debitCard' && !paymentSuccess && (
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label htmlFor="cardholderName">Cardholder's Name</label>
            <input type="text" id="cardholderName" name="cardholderName" required />
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input type="text" id="cardNumber" name="cardNumber" required />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiration Date</label>
            <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" required />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input type="text" id="cvv" name="cvv" required />
          </div>
          <button type="submit" className="payment-button">Pay Now</button>
        </form>
      )}

      {paymentMethod === 'upi' && !paymentSuccess && (
        <div className="upi-options">
          <label>
            <input
              type="radio"
              value="phonePe"
              checked={upiApp === 'phonePe'}
              onChange={() => setUpiApp('phonePe')}
            />
            PhonePe
          </label>
          <label>
            <input
              type="radio"
              value="googlePay"
              checked={upiApp === 'googlePay'}
              onChange={() => setUpiApp('googlePay')}
            />
            Google Pay
          </label>
          <label>
            <input
              type="radio"
              value="paytm"
              checked={upiApp === 'paytm'}
              onChange={() => setUpiApp('paytm')}
            />
            Paytm
          </label>

          {upiApp && (
            <form onSubmit={handleSubmit} className="payment-form">
              <div className="form-group">
                <label htmlFor="upiId">Enter your UPI ID</label>
                <input
                  type="text"
                  id="upiId"
                  name="upiId"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="payment-button">Pay Now</button>
            </form>
          )}
        </div>
      )}

      {paymentSuccess && (
        <div className="confirmation-message">
          <h2>Payment Successful!</h2>
          <p>Your order is accepted. Your token number is: <strong>{tokenNumber}</strong></p>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
