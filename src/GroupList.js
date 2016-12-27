/**
 * Created by keen on 2016. 12. 24..
 */
import React, {Component} from 'react'
import './GroupList.css'
import Slider from 'react-slick'
import 'slick-carousel'
import GroupCard from './GroupCard'
import {Link} from 'react-router'

class GroupList extends Component{
  constructor(props){
    super(props);
    this.settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
  }
  render(){
    return(
      <div className="group_chooser">
        <Slider {...this.settings}>
          <div>
            <GroupCard
            imageUrl="https://code.vmware.com/wp-content/uploads/sites/13/2016/08/hackathon-graphic.png"
            title="devpools"/>
          </div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
          <div><h3>5</h3></div>
          <div><h3>6</h3></div>
        </Slider>
        <Link to="/group/add">
          <button className="groupAddBtn"><i className="fa fa-plus-circle"> 새 그룹</i></button>
        </Link>
        {this.props.children}
      </div>
    )
  }
}

export default GroupList;