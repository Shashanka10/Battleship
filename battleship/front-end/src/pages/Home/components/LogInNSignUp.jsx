import React, { useEffect, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import "../../../assets/css/log.sass"

import * as io from "../../../io-client-handler"

export default function LogInNSignUp()
{
    const [showLogIn, setShowLogIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    const handleShowLogIn = () => setShowLogIn(true);

    const handleCloseLogIn = () => setShowLogIn(false);

    const handleShowSignUp = () => setShowSignUp(true);

    const handleCloseSignUp = () => setShowSignUp(false);

    return (
        <>
            <Button className='logg' size='lg' bsPrefix='Home' onClick={ handleShowLogIn }>Log In</Button>
            <Button className='logg1' size='lg' bsPrefix='Home' onClick={ handleShowSignUp }>Sign Up</Button>
            <LogIn 
            show={ showLogIn }
            onHide={ handleCloseLogIn }
            />
            <SignUp
            show={ showSignUp }
            onHide={ handleCloseSignUp }
            />
        </>
    )
}



/**
 * @param {property} props 
 * @returns Log In modal
 */
function LogIn(props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [tag, setTag] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleToggleShowPassword = () => setShowPassword(!showPassword);

    /* handles event on "button clicked" */
    const handleLogInClicked = () => {
        /* emit a request to server to log in with given credentials */
        io.socket.emit("request-login", username, tag, password, (isSuccessful) => {
            /* if login is not successful, alert the user */
            if(!isSuccessful){
                alert("UserID or password is incorrect.");
            }
        })
    }

    return(
        <Modal
        show={ props.show }
        onHide={ props.onHide }
        size="md"
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Log In</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Label>UserID</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control
                    placeholder="Username"
                    value={username}
                    onChange={ (e) => { setUsername(e.target.value) } }
                    maxlength={ 14 }
                    />
                    <InputGroup.Text>#</InputGroup.Text>
                    <Form.Control
                    placeholder="Tag"
                    value={tag}
                    onChange={ (e) => { setTag(e.target.value) } }
                    maxlength={ 4 }
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <Form.Control
                    placeholder="Password"
                    type={ (showPassword)? "text" : "password"}
                    value={password}
                    onChange={ (e) => { setPassword(e.target.value) } }
                    maxlenght={ 20 }
                    />
                </InputGroup>
                
                <Form.Check
                type="switch"
                label="Show password"
                onChange={ handleToggleShowPassword }
                />
            </Modal.Body>

            <Modal.Footer>
                <ButtonLogIn
                onClick={ handleLogInClicked }
                password={ password }
                username={ username }
                tag={ tag }
                />
            </Modal.Footer>
        </Modal>

    )
}



/**
 * 
 * @param {property} props 
 * @returns Log In button
 */
function ButtonLogIn(props){
    const [isDisabled, setDisabled ] = useState(false);         //state of "Log In" button

    /* enables and disables "Log In" button */
    useEffect(() => {
        /* if username and password section is not empty and hash section is full, enable the button, else disable */
        if(props.password.length === 0 || props.username.length === 0 || props.hash.length !== 4){
            setDisabled(true);
        }else{
            setDisabled(false);
        }
    }, [props.password, props.username, props.hash])

    return(
        <Button
        onClick={ props.onClick }
        disabled={ isDisabled }
        >Log In</Button>
    )
}



function SignUp(props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [tag, setTag] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [hideWarning, setHideWarning] = useState(false);

    const handleToggleShowPassword = () => setShowPassword(!showPassword);

    const handleSignUpClicked = () => {

    }

    useEffect(() => {
        if(password !== confirmPassword){
            setHideWarning(false);
        }else{
            setHideWarning(true);
        }
    }, [password, confirmPassword])

    return(
        <Modal
        show={ props.show }
        onHide={ props.onHide }
        size="md"
        centered>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Form.Label>UserID</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control
                    placeholder="Username"
                    value={username}
                    onChange={ (e) => { setUsername(e.target.value) } }
                    maxlength={ 14 }
                    />
                    <InputGroup.Text>#</InputGroup.Text>
                    <Form.Control
                    placeholder="Tag"
                    value={tag}
                    onChange={ (e) => { setTag(e.target.value) } }
                    maxlength={ 4 }
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <Form.Control
                    placeholder="Password"
                    type={ (showPassword)? "text" : "password"}
                    value={password}
                    onChange={ (e) => { setPassword(e.target.value) } }
                    maxlenght={ 20 }
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <Form.Control
                    placeholder="Confirm password"
                    type={ (showPassword)? "text" : "password"}
                    value={confirmPassword}
                    onChange={ (e) => { setConfirmPassword(e.target.value) } }
                    maxlenght={ 20 }
                    />
                </InputGroup>

                <Form.Label visuallyHidden={ hideWarning }>Passwords don't match</Form.Label>

                <Form.Check
                type="switch"
                label="Show password"
                onChange={ handleToggleShowPassword }
                />
            </Modal.Body>

            <Modal.Footer>
                <ButtonSignUp
                onClick={ handleSignUpClicked }
                password={ password }
                username={ username }
                confirmPassword={ confirmPassword }
                tag={ tag }
                />
            </Modal.Footer>
        </Modal>
    )
}



function ButtonSignUp(props){
    const [isDisabled, setDisabled ] = useState(false);         //state of "Log In" button

    /* enables and disables "Log In" button */
    useEffect(() => {
        /* if username and password section is not empty and hash section is full, enable the button, else disable */
        if(props.password.length === 0 || props.confirmPassword.length === 0 || props.username.length === 0 || props.hash.length !== 4 || props.password !== props.confirmPassword){
            setDisabled(true);
        }else{
            setDisabled(false);
        }
    }, [props.password, props.username, props.hash, props.confirmPassword])

    return(
        <Button
        onClick={ props.onClick }
        disabled={ isDisabled }
        >Log In</Button>
    )
}
