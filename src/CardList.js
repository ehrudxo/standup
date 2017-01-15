import React, { Component } from 'react';
import Card from './Card'
import './CardList.css'
import {connect} from 'react-redux'
import 'react-router-redux'
import {groupSelect} from './actions/Group'

class CardList extends Component {
  componentWillMount(){
    const {dispatch,groupName} = this.props;
    dispatch(groupSelect(groupName));
  }
  createCard(item,index){
    return(<li className="list_row" key={item.key}>
              <pre className="common_margin grey_text">{item.content}</pre>
              {
                (item.cardInfo)?<Card cardInfo={item.cardInfo}/>:""
              }
            </li>);
  }
  render() {
    const {articles} = this.props;
    return(
      <div>
        {articles && articles.length > 0 &&
          <ul>{ articles.map(this.createCard) }</ul>
        }
      </div>
    );
  }
}
let mapStateToProps = (state, ownProps ) => {
  return {...state.default,...ownProps}
}
export default connect(mapStateToProps)(CardList);