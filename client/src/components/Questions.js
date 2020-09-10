import React from 'react';
import 'bootstrap';
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
export default class Questions extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      questions: [], 
      pageCount: 1,
      offset: 0,
      data: [],
      perPage: 5,
      currentPage: 0,
      page: 0
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    this.fetchQuestionsList();
  }
  fetchQuestionsList = () => {
    console.log(this.state.currentPage);
    fetch('/api/v1/questions?page='+this.state.currentPage)
    .then(response => response.json())
    .then(res => {
        const data = res.questions;

        console.log(data);
        console.log(data.slice(this.state.offset, this.state.offset + this.state.perPage));

        this.setState({ questions: res.questions,
                        pageCount: res.question_count
        })
    })
    .catch(err => {
        this.setState({ questions: 'API Failed' })
    })
  };

  handleDelete = (id) => {
    fetch(`/api/v1/questions/${id}`, { method: 'delete' })
    .then((response) => {
        alert('Question deleted successfully')
        this.fetchQuestionsList();
      });
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.fetchQuestionsList()
    });
  };


  render() {
    const { questions } = this.state;
    return (
      <div className='button__container'>
        <div className = "row">
          <div className = "col-md-9">
            <h3>Questions</h3>
          </div>
          <div className = "col-md-3">
            <Link to="/questions/new">
              <button type="button" className='btn btn-primary button'>
                Add Question
              </button>
            </Link>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Question</th>
              <th>Role</th>
              <th>Mapping</th>
              <th>Show</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody id="table-data">
          {
            questions.map((question, key) => {
              return (
                <tr key={question.id}>
                  <td>
                    <Link to={`/questions/${question.id}`}>
                      {question.name}
                    </Link>
                  </td>
                  <td>{question.role_name}</td>
                  <td>{question.mapping_name}</td>
                  <td>
                    <Link to={`/questions/${question.id}`} className="btn btn-info">
                      Show
                    </Link>
                  </td>
                  <td>
                    <Link to={`/questions/${question.id}/edit`} className="btn btn-success">
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => this.handleDelete(question.id) }>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
        <div align='center'>
        <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>

        </div>
      </div>
    );
  }
}