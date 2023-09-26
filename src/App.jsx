import {useState} from "react";
import "./App.css";
import contactsJSON from "./contacts.json";

function App() {
  const [contacts, setContacts] = useState(contactsJSON.slice(0,5));

  const handleAddContact = () => {
    if (contactsJSON.length === contacts.length) {return; 
    }
    const random = Math.floor(Math.random() * contactsJSON.length);
    const randomContact = contactsJSON[random];
    if (contacts.includes(randomContact)) {
      handleAddContact(); 
    } else {
      setContacts([randomContact, ...contacts]);
    }
  }

  const handleSortPopularity = () => {
    const copyContacts = [...contacts];
    copyContacts.sort( (contact1, contact2) => contact1.popularity > contact2.popularity ? 1 : -1)
    setContacts(copyContacts);
  }

  const handleSortName = () => {
      const copyContacts = [...contacts];
      copyContacts.sort( (contact1, contact2) => contact1.name > contact2.name ? 1 : -1)
      setContacts(copyContacts);
    }

  const handleDeleteContact = (id) => {
    const copyContacts = [...contacts];
    copyContacts.splice(id,1);
    setContacts(copyContacts);
  }

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={() => handleAddContact()}>Add Random Contact</button>
      <button onClick={() => handleSortName()}>Sort by name</button>
      <button onClick={() => handleSortPopularity()}>Sort by popularity</button>
      <table>
        <thead>
          <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((oneContact) => {
            return (
              <tr key={oneContact.id}>
                <td>
                  <img
                src={oneContact.pictureUrl}
                style={{height:'200px'}}
                  />
                </td>
                <td>{oneContact.name}</td>
                <td>{oneContact.popularity.toFixed(2)}</td>
                <td>{oneContact.wonOscar &&  '🏆'}</td>
                <td>{oneContact.wonEmmy &&  '🏆'}</td>
                <td><button onClick={() => handleDeleteContact()}>Delete</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>


  );
}

export default App;
