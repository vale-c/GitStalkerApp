import React from 'react';
import '../App.css';

const UserForm = (props) => {
    return (
        <form className="searchContainer" onSubmit={props.getUser}>
            <p className="lead slide-in-elliptic-top-fwd">Enter a username to get all the info!</p>
            <input type="text" className="form-control" name="username" placeholder="Search for a Github User..."/>
            <button>Submit</button>
        </form>
    );
}

export default UserForm;
