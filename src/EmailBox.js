import React, { useState, useEffect } from 'react';
const getValue = () => {
  let list = localStorage.getItem('divyansh');
  if(list !== null){
    return JSON.parse(list);
  }
  else{
    return [] ;
  }
}
const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [to, setTo] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');;
  const [submittedData, setSubmittedData] = useState(getValue());
  const [editIndex, setEditIndex] = useState(null);
  
 
  useEffect(()=> {
    localStorage.setItem('divyansh', JSON.stringify(submittedData));
  },[submittedData])
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(email===""|| to==="" || cc === "" || bcc===""|| subject===""||body===""){alert("enter value")}
    else{const newData ={ email, to, cc,bcc,subject,body};

    if (editIndex !== null) {
      
      const updatedData = [...submittedData];
      updatedData[editIndex] = newData;
      setSubmittedData(updatedData);
      setEditIndex(null); 
    } else {
      
      setSubmittedData([...submittedData, newData]);
    }
setEmail('');
setTo('');
setCc('');
setBcc('');
setSubject('');
setBody('');}
   };
   const handleEdit = (index) => {
   
    const selectedData = submittedData[index];
    setEmail(selectedData.email);
    setTo(selectedData.to);
    setCc(selectedData.cc);
    setBcc(selectedData.bcc);
    setSubject(selectedData.subject);
    setBody(selectedData.body);

   
    setEditIndex(index);
  };
   const handleDelete = (index) => {
   
    const updatedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedData);
  };

return (
      <div className="email-form-container">
<form onSubmit={handleSubmit} className="email-form">
        <label>  Email:
          <input type="text" value={email}   onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label> To:
          <input type="text" value={to}  onChange={(e) => setTo(e.target.value)} />
        </label>
        <br />
        <label>  From: <input type="text" value={bcc} onChange={(e) => setBcc(e.target.value)} /> </label>
        <br />
        <label> Cc: <input type="text" value={cc} onChange={(e) => setCc(e.target.value)} /> </label>
        <br />
        <label> Subject:<input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} /> </label>
        <br />
        <label>  Body: <input type="text" value={body} onChange={(e) => setBody(e.target.value)} /> </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      
        <div className="submitted-data">
         
          {submittedData.map((data, index) => (
            <div key={index} className="email-entry">
              <p>Email: {data.email}</p>
              <p>To: {data.to}</p>
              <p>From: {data.from}</p>
              <p>CC: {data.cc}</p>
              <p>Subject: {data.subject}</p>
              <p>Body: {data.body}</p>
              <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
              <hr />
            </div>
          ))}
        </div>
      
    </div>
  ); 
};

export default EmailForm; 


 