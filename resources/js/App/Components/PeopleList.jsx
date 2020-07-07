import React from 'react';
import MissionPerson from './MissionPerson.jsx';

export default class PeopleList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null,
            missions: null
        }
    }

    componentDidMount = () => {
        fetch('api/person',{
            headers: {
                "Accept" :      'application/json',
                "Content-Type": 'application/json',
                'Authorization': 'Bearer ' + this.props.token
            }
        })
        .then((resp) => {
            if(resp.status === 200) {
                resp.json()
                .then((data) => {
                    this.setState({
                        data: data
                    })
                })
            } else {
                if (resp.status == 401) {
                    this.props.onFailedAuthentication()
                }
            }
        })   
        fetch('api/missions',{
            headers: {
                "Accept" :      'application/json',
                "Content-Type": 'application/json',
                'Authorization': 'Bearer ' + this.props.token
            }
        })
        .then((resp) => {
            if(resp.status === 200) {
                resp.json()
                .then((data) => {
                    this.setState({
                        missions: data
                    })
                })
            } else {
                if (resp.status == 401) {
                    this.props.onFailedAuthentication()
                }
            }
        }) 
    }

    render() {
        let content = (
            <div className="loading">Loading Data....</div>
        )
//  
        if (this.state.data !== null && this.state.missions !== null) {

            content = (
                <ul>
                    {this.state.data.map((person) => (
                        <li className="person" key={person.id}>
                            <div className="person__name">{person.name}</div>
                            <div className="person__nationality">{person.nationality}</div>
                            <div className="person__image">
                                <img src={person.image_url} alt={person.name} />
                            </div>
                            <MissionPerson 
                                token={this.props.token}
                                person={person}
                                missions={this.state.missions}
                            />
                        </li>
                    ))
                    }
                </ul>
            )
        }
        return (
            <div className="people-list">
                {content}
            </div>   
        )
    }
}

// const PeopleList = () => {
//     const [ loaded, setLoaded ] = useState(false);
//     const [ results, setResults ] = useState([]);

//     useEffect(() => {
//         getData();
//     }, [])

//     const getData = async () => {
//         const resp = await fetch('api/person');
//         const data = await resp.json()
//         setLoaded(true)
//         console.log(data)
//     }
    
//     return ( 
//         <>
//             {loaded ? (
//                 <div>Data arrived</div>
//             ) : (
//                 <div className="loading">Loading Data....</div>
//             )}
            
//         </>
//      );
// }
 
// export default PeopleList;