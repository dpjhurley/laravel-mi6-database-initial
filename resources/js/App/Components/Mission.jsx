import React from 'react';

class Mission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
        }
    }


    render() { 
        return ( 
            <li>
                <strong>{this.props.name}</strong>, {this.props.year}
                <button type="submit" onClick={this.props.handleRemoveBtnPress} value={this.props.id}>Remove</button>
            </li>
        );
    }
}
 
export default Mission;