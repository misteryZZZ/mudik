import React from 'react'
import { sortable } from 'react-sortable'

// class Item extends React.Component {
//   render() {
//     return (
//       <li {...this.props}>
//         {this.props.children}
//       </li>
//     )
//   }
// }

// export default sortable(Item)
class Item extends React.Component {
  render() {
    return (
      <li {...this.props}
      className="flex items-center justify-between border rounded py-1 px-2 mb-2">
        {this.props.children}
        <div className="flex items-center">
          <button type="button" className="mr-2" onClick={() => this.props.handleDelete(this.props['data-id'])}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </div>
      </li>
    )
  }
}
 
 
export default sortable(Item);