import React, { useState, useEffect } from 'react';
import SortableItem from './SortableItem'

export default class SortableList extends React.Component {

  state = {
    items: this.props.items,
  };

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     items: this.props.items,
  //   }
  // }

  componentWillMount = () => {
    this.setState({
      items: this.props.items
    });
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.items !== prevProps.items) {
      this.setState({
        items: this.props.items
      });
    }
  }

  onSortItems = (items) => {
    this.props.handleChange(items);
    this.setState({
      items: items
    });
    // console.log(items);
  }

  handleDelete = (index) => {
    const filteredItems = this.state.items.filter((e,i) => i != index);
    this.props.handleChange(filteredItems);
    this.setState({
      items: filteredItems
    })
  }

  render() {
    const { items } = this.state;
    console.log(this.props);
    var listItems = items.map((item, i) => {
      return (
        <SortableItem
          key={i}
          onSortItems={this.onSortItems}
          items={items}
          sortId={i}
          handleDelete={this.handleDelete}>
          {item}
        </SortableItem>
      )
    })

    return (
      <ul className='sortable-list mt-2'>
        {listItems}
      </ul>
    )
  }
}

// const SortableList = ({ items, onChange, handleDelete }) => {
//   const [dataItems, setDataItems] = useState(items)

//   const onSortItems = (items) => {
//     setDataItems(items)
//     // onChange(items);
//   }

//   const handleDelete = (index) => {
//     handleDelete(items.filter((e,i) => i != index));
//   }

//   useEffect(() => {
//     setDataItems(items);
//   }, [items])

//   const listItems = dataItems.map((item, i) => {
//     return (
//       <SortableItem
//         key={i}
//         onSortItems={onSortItems}
//         items={dataItems}
//         sortId={i}
//         handleDelete={handleDelete}>
//         {item}
//       </SortableItem>
//     )
//   })

//   return (
//     <ul className='sortable-list mt-2'>
//       {listItems}
//     </ul>
//   )
// }

// export default SortableList;