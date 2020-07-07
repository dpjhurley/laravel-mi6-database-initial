import React from 'react';
import PeopleList from './PeopleList.jsx';
import LoginForm from './LoginForm.jsx';
 
export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            logged_in: null,
            token: window.localStorage.getItem('_token')
        }
    }

    componentDidMount() {
        this.setState({
            logged_in: !this.state.token !== null
        })

    }

    onLoginSuccess = (token) => {
 
        window.localStorage.setItem('_token', token)
     
        this.setState({
            logged_in: true,
            token: token
        })
    }

    onFailedAuthentication = () => {

        window.localStorage.removeItem('_token');

        this.setState({
            logged_in: false,
            token: null
        })
    }

    render() {
        return (
            <>
                <h1>MI6 component</h1>

                {
                    this.state.logged_in === null ? (
                        <div>Aquiring login in, Loading ....</div>
                    ) :  (
                        this.state.logged_in ? (
                            <PeopleList
                                token={this.state.token}
                                onFailedAuthentication={this.onFailedAuthentication} 
                            />
                        ) : (
                            <LoginForm 
                                onLoginSuccess={this.onLoginSuccess}
                            />
                        )
                    )
                }
                    
            </>

 
        )
    }
}