import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    mobileNumber: '',
    amount: ''
  });
  const numberFields = ["age", "mobileNumber", "amount"]
  const handleChange = (e) => {
    let value = e.target.value
    if (numberFields.includes(e.target.name)) {
      value = Number(value)

    }
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const isComplete = Object.values(formData).every((val) => {
    console.log(typeof val)
    return false
  });

  return (
    <div className="App">
      <h1>QR Code Generator</h1>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      /><br /><br />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
      /><br /><br />

      <input
        type="tel"
        name="mobileNumber"
        placeholder="Mobile Number"
        value={formData.mobileNumber}
        onChange={handleChange}
      /><br /><br />

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
      /><br /><br />

      {isComplete && (
        <div style={{ marginTop: '30px' }}>
          <QRCodeSVG
            value={JSON.stringify(formData)}
            size={256}
          />
          <p style={{ marginTop: '10px', fontSize: '14px' }}>
            QR data: <code>{JSON.stringify(formData)}</code>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
