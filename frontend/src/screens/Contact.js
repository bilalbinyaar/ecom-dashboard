import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';

const Contact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch(
          'http://localhost:5000/api/contact/get-contacts'
        );
        if (response.ok) {
          const data = await response.json();
          setContacts(data);
        } else {
          console.error('Failed to fetch contacts');
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    }

    fetchContacts();
  }, []);

  return (
    <div className="main-content">
      <SideBar />

      <div className="content-wrapper">
        <div className="section-title">
          <h2>Contacts</h2>
        </div>
        <div className="content-inner">
          <div className="upper-content">
            <h4>These are the all listed contacts</h4>
            <button hidden>Add New</button>
          </div>
        </div>
        <div className="listed-components">
          {contacts.map((contact) => (
            <div key={contact._id} className="contact-item">
              <h3>{contact.name}</h3>
              <p>Email: {contact.email}</p>
              <p>Message: {contact.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
