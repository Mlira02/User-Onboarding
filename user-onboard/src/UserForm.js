import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import "./UserForm.css";

const UserForm = ({ errors, touched, values, handleSubmit, status }) => {
    const [user, setUser] = useState([])
    console.log(user);

    useEffect(() => {
        if (status) {
            setUser([...user, status])
        }
    }, [status])

    return ( 
        <div className="main-container">
            <h2>User Form</h2>
            <Form>
                <Field 
                type="text" 
                name="name" 
                placeholder="Enter Name"
                />
                {touched.name && errors.name && (<p>{errors.name}</p>)}
                <Field 
                    type="email"
                    name="email"
                    placeholder="Enter email"
                />
                {touched.email && errors.email && (<p>{errors.email}</p>)}
                <Field 
                    type="password"
                    name="password"
                    placeholder="Enter password"
                />
                {touched.password && errors.password && (<p>{errors.password}</p>)}
                <label>
                    Check box for User Agreement 
                <Field 
                    type="checkbox"
                    name="agreement"
                    checked={values.agreement}
                    />
                {touched.agreement && errors.agreement && (<p>{errors.agreement}</p>)}
                    <span className="checkmark" />
                    </label>
                <button type="submit">Submit Form</button>
            </Form>

            <div className="members">
                <h2>Users that have signed up!!</h2>
                {user.map(guy => (
                    <div>
                        <h3>Name: {guy.name}</h3>
                        <h3>Email: {guy.email}</h3>
                        <h3>Password: PROTECTED!!!</h3>
                    </div>
                ))}
            </div>

        </div>
     );
}

const NewUserForm = withFormik({
    mapPropsToValues({ name, email, password, agreement }) {
        return {
            name: name || '', 
            email: email || '',
            password: password || '',
            agreement: agreement || false,
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('A password is required'),
        agreement: Yup.boolean().required('Terms of service check is required')
    }),

    handleSubmit(values, { setStatus }) {
        axios.post('https://reqres.in/api/users', values)
        .then(res => {
            console.log(res.data)
            setStatus(res.data);
        })
        .catch(err => {
            console.log('sorry there was an error', err.response)
        });
    }
})(UserForm);
 
export default NewUserForm;