import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import UserForm from "./components/UserForm";
import {PanelGroup, Panel} from 'react-bootstrap';

class App extends Component {
  state = {
    repos: null,
    starred: [],
    starred_url: [],
    location: null,
    blog: null,
    company: null,
    gists: null,
    followers_count: null,
    following_count: null,
    activeKey: '1',
  };

  handleSelect = this.handleSelect.bind(this);

  handleSelect(activeKey) {
    this.setState({ activeKey });
  }

  getUser = e => {
    e.preventDefault();
    const user = e.target.elements.username.value;
    if (user) {
      axios
        .get(`https://api.github.com/users/${user}`)
        .then(res => {
          console.log(res);

          const repos = res.data.public_repos;
          const gists = res.data.public_gists;
          const location = res.data.location;
          const blog = res.data.blog;
          const company = res.data.company;
          const followers_count = res.data.followers;
          const following_count = res.data.following;

          this.setState({
            repos: repos,
            gists: gists,
            location: location,
            blog: blog,
            company: company,
            followers_count: followers_count,
            following_count: following_count
          });

          //Printing in the JS console the results from the axios API call
          console.log("Repos:", this.state.repos);
          console.log("Gists: ", this.state.public_gists);
          console.log("Location: ", this.state.location);
          console.log("Website: ", this.state.blog);
          console.log("Company/Organization:", this.state.company);
          console.log("Followers count is: ", this.state.followers_count);
          console.log("Following count is: ", this.state.following_count);
        })

      axios
        .get(`https://api.github.com/users/${user}/starred?per_page=100`)
        .then(res => {
          const starred = res.data;
          const starred_url = res.data.owner;


          this.setState({
            starred: starred,
            starred_url: starred_url,
          });

          console.log("Starred Repos: ", this.state.starred);
          console.log("Starred Repos Urls: ", this.state.starred_url);
        });

    } else return; //user is not defined
  };

  render() {
    return <div className="App">
        <header className="App-header bounce-in-top">
        <h1 className="App-title tracking-in-expand">GitHub Finder</h1>
          <img src="/img/femalecodertocat.png" alt="git-icon" style={{width:"300px" }}/>
        </header>
        <UserForm getUser={this.getUser} />
        <br />

        <PanelGroup accordion id="accordion" activeKey={this.activeKey} onSelect={this.handleSelect}>
          <Panel eventKey="1">
            <Panel.Heading>
              <Panel.Title toggle>Repos #: </Panel.Title>
            </Panel.Heading>
          <Panel.Body collapsible> {this.state.repos ? <p className="accordionPar">{this.state.repos}</p> : <p className="accordionPar">No data yet!</p>}</Panel.Body>
          </Panel>
          <Panel eventKey="2">
            <Panel.Heading>
              <Panel.Title toggle>Following: </Panel.Title>
            </Panel.Heading>
          <Panel.Body collapsible> {this.state.following_count ? <p className="accordionPar">{this.state.following_count}</p> : <p className="accordionPar">No data yet!</p>}</Panel.Body>
          </Panel>
          <Panel eventKey="3">
            <Panel.Heading>
              <Panel.Title toggle>Followers: </Panel.Title>
            </Panel.Heading>
          <Panel.Body collapsible> {this.state.followers_count ? <p className="accordionPar">{this.state.followers_count}</p> : <p className="accordionPar">No data yet!</p>} </Panel.Body>
          </Panel>
          <Panel eventKey="4">
            <Panel.Heading>
              <Panel.Title toggle>Company: </Panel.Title>
            </Panel.Heading>
          <Panel.Body collapsible>{this.state.company ? <p className="accordionPar">{this.state.company}</p> : <p className="accordionPar">No data yet!</p>}</Panel.Body>
          </Panel>
          <Panel eventKey="5">
            <Panel.Heading>
              <Panel.Title toggle>Personal Website: </Panel.Title>
            </Panel.Heading>
          <Panel.Body collapsible>{this.state.blog ? <p className="accordionPar">{this.state.blog}</p> : <p className="accordionPar">No data yet!</p>}</Panel.Body>
          </Panel>
          <Panel eventKey="6">
            <Panel.Heading>
              <Panel.Title toggle>Location: </Panel.Title>
            </Panel.Heading>
          <Panel.Body collapsible>{this.state.location ? <p className="accordionPar">{this.state.location}</p> : <p className="accordionPar">No data yet!</p>}</Panel.Body>
          </Panel>
          <Panel eventKey="7">
            <Panel.Heading>
              <Panel.Title toggle>Gists: </Panel.Title>
            </Panel.Heading>
          <Panel.Body collapsible>{this.state.gists ? <p className="accordionPar">{this.state.gists}</p> : <p className="accordionPar">No data yet!</p>}</Panel.Body>
          </Panel>
        <Panel eventKey="8">
          <Panel.Heading>
            <Panel.Title toggle>Starred Repos: </Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>{this.state.starred.map(starred => { return <p className="starredAccordionPar" key={`repo-${starred.id}`}><li>{starred.name}</li></p>})}</Panel.Body>
        </Panel>
      </PanelGroup>
    </div>;
  }
}

export default App;
