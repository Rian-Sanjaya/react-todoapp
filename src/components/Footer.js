import React from 'react'
import { Link } from 'react-router-dom'

// export default (props) => (
//   <div>
//     <Link to='/'>All</Link>
//     <Link to='/active'>Active</Link>
//     <Link to='/completed'>Completed</Link>
//   </div>
// )

class Footer extends React.Component {
  state = { selected: 'All' }

  handleClick(e) {
    const name = e.target.name

    this.setState({
      selected: name
    })
  }

  render() {
    const { selected } = this.state
    return (
      <div>
        <Link to='/' className={selected === 'All' ? 'selected' : ''} name='All' onClick={e => this.handleClick(e)}>All</Link>
        <Link to='/active' className={selected === 'Active' ? 'selected' : ''} name='Active' onClick={e => this.handleClick(e)}>Active</Link>
        <Link to='/completed' className={selected === 'Completed' ? 'selected' : ''} name='Completed' onClick={e => this.handleClick(e)}>Completed</Link>
      </div>
    )
  }
}

export default Footer