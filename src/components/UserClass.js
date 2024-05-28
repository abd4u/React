import React from 'react';

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: 'Dummy',
        location: 'Default',
      },
    };
    console.log('Child constructor');
  }

  async componentDidMount() {
    console.log('Child component Did mount called');

    const data = await fetch('https://api.github.com/users/abd4u');
    const json = await data.json();

    this.setState({
      userInfo: json,
    });
  }
  componentDidUpdate() {
    console.log('Component update called');
  }

  componentWillUnmount() {
    console.log('component will unmount');
  }

  render() {
    console.log('Child Render called');
    // const { name, location } = this.state.userInfo;
    return (
      <div className='user-card'>
        <img src={this.state.userInfo.avatar_url} alt='' />
        <h2>Name: {this.state.userInfo.name}</h2>
        <h3>Location: {this.state.userInfo.location}</h3>
        <h4>Contact: @abd4u</h4>
      </div>
    );
  }
}

export default UserClass;
