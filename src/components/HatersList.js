import React from 'react';
import PropTypes from 'prop-types';

class HatersList extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    // key is used to uniquely identify and render a list item
    render() {
        if (!this.props.hatersList)
            return <p>No haters at the moment</p>
        
        let hatersListElements = this.props.hatersList.map((name, index) => {
          return <li key={index}>{name}</li>
        });
        return <ul> { hatersListElements } </ul>
    }
}

HatersList.defaultProps = {
    hatersList: ["Andrew"]
};

HatersList.propTypes = {
    hatersList: PropTypes.arrayOf(PropTypes.string)
}

export default HatersList;