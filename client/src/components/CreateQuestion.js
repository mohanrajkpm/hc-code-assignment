import React from 'react';
import { Link } from "react-router-dom";

export default class CreateQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      role_id: '',
      mapping_id: '',
      roles: [],
      mappings: []
    }
    this.handleMappingChange = this.handleMappingChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);

  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleMappingChange(event) {
    this.setState({mapping_id: event.target.value});
  }

  handleRoleChange(event) {
    this.setState({role_id: event.target.value});
  }

  componentDidMount() {
    this.loadRoleList();
    this.loadMappingList();
  }

  loadRoleList = () => {
    fetch('/api/v1/questions/fetch_roles')
    .then(response => response.json())
    .then(data => {
        this.setState({ roles: data })
    })
    .catch(err => {
        this.setState({ roles: 'API Failed' })
    })
  };

  loadMappingList = () => {
    fetch('/api/v1/questions/fetch_mappings')
    .then(response => response.json())
    .then(data => {
        this.setState({ mappings: data })
    })
    .catch(err => {
        this.setState({ mappings: 'API Failed' })
    })
  };

  createQuestionRequest = (event) => {
    console.log('this.state', this.state);
    fetch('/api/v1/questions', {
      method: 'post',
      body: JSON.stringify(this.state),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      alert('Question created successfully');
      window.location.href = '/';
    });
  }

  render() {
    const {name, role_id, mapping_id} = this.state;
    return (
      <div>
        <h3>New Question</h3>
        <form>

          <div>
            <label>Question: </label>
            <input
              type='text'
              name='name'
              value={name}
              onChange={this.handleInputChange}
              />
          </div>

          <div className='row'>
            <div className='col-sm-4'>
              <div className= 'form-group'>
                <label htmlFor="questions_role_id">Role</label>
                  <select className="form-control" id="questions[role_id]" name="question[role_id]" value={role_id} onChange={this.handleRoleChange}>
                    {this.state.roles.map((role) => <option key={role.role_id} value={role.role_id}>{role.role_name}</option>)}
                  </select>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-sm-4'>
              <div className= 'form-group'>
                <label htmlFor="questions_mapping_id">Mapping</label>
                  <select className="form-control" id="questions[mapping_id]" name="question[mapping_id]" value={mapping_id} onChange={this.handleMappingChange}>
                    {this.state.mappings.map((mapping) => <option key={mapping.mapping_id} value={mapping.mapping_id}>{mapping.mapping_name}</option>)}
                  </select>
              </div>
            </div>
          </div>


          <div className='row'>
            <div className='col-sm-4'>
              <button className="btn btn-primary" onClick={this.createQuestionRequest}>Create Question</button>
              <Link to={`/`} className="btn btn-default">
                Back
              </Link>
            </div>
          </div>

        </form>
      </div>
    );
  }
}