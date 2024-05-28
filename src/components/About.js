import { Component } from 'react';
import User from './User';
import UserClass from './UserClass';

class About extends Component {
  constructor(props) {
    super(props);
    // console.log('Parent constructor');
  }
  componentDidMount() {
    // console.log('Parent Component Did Mount');
  }

  render() {
    // console.log('Parent Render');
    return (
      <div>
        <h1>About Class Component</h1>
        <h2>This is React Web Series</h2>
        <UserClass name={'hello'} />
        {/* <UserClass name={'Elon Baba'} /> */}
        {/* <UserClass name={'Pichai'} /> */}
      </div>
    );
  }
}

// const About = () => {
//   return (
//     <div>
//       <h1>About</h1>
//       <h2>This is React Web Series</h2>
//       <UserClass name={'abdullah'} />
//     </div>
//   );
// };

export default About;
