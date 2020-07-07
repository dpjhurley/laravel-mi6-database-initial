import React from 'react';
import Mission from './Mission.jsx';

class MissionPerson extends React.Component {
    constructor(props) {
        super(props);

        this.state = {  
            missions: props.person.missions,
            newMission: null
        }
    }

    handleNewMissionSelect = (event) => {
        this.setState({
            newMission : event.target.value
        })
    }

    handleNewMissionSubmit = (event) => {
        event.preventDefault();
        console.log('attach new mission', this.state.newMission)

        fetch('/api/missions/attach', {
            method: 'POST',
            body: JSON.stringify({
                person_id: this.props.person.id,
                mission_id: this.state.newMission
            }),
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.token,
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        })
        .then(response => response.json())
        .then(data => {
            this.setState({missions: data})
        })
    }

    handleRemoveBtnPress = (event) => {
        event.preventDefault();
        console.log(`the mission i would like to get rid of is ${event.target.value}`)

        fetch('/api/missions/detach', {
            method: 'POST',
            body: JSON.stringify({
                person_id: this.props.person.id,
                mission_id: event.target.value
            }),
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.token,
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        })
        .then(response => response.json())
        .then(data => {
            this.setState({missions: data})
        })
    }

    render() { 
        return ( 
            <>
                <ul> 
                    {this.state.missions.map((mission) => (
                        <Mission 
                            key={mission.id}
                            id={mission.id}
                            name={mission.name} 
                            year={mission.year}
                            handleRemoveBtnPress={this.handleRemoveBtnPress}
                        /> 
                    ))}
                </ul>
                
                <form onSubmit={this.handleNewMissionSubmit}>
                    <select 
                        value={this.props.newMission} 
                        onChange={this.handleNewMissionSelect}
                    >
                        {this.props.missions.map((mission) => (
                            <option key={mission.id} value={mission.id}>{mission.name}</option>
                        ))}
                    </select>
                    <input type="submit" value="Add"/>
                </form>
            </>
         );
    }
}
 
export default MissionPerson;