import React from 'react';
import { Link } from "react-router-dom";
export default class QuestionDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { question: {} };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    fetch(`/api/v1/questions/${id}`)
      .then(response => response.json())
      .then(question => {
          this.setState({ question })
      })
      .catch(err => {
          this.setState({ questions: 'API Failed' })
      })
  };

  render() {
    const { question } = this.state;
    return (
      <div>
        <div>
          <label> Question </label>
          <p> {question.name} </p>
        </div>

        <div>
          <label> Role </label>
          <p> {question.role_name} </p>
        </div>

        <div>
          <label>Mapping</label>
          <p> {question.mapping_name} </p>
        </div>
        <div>
          <Link to={`/`} className="btn btn-default">
            Back
          </Link>
        </div>
      </div>
    );
  }
}