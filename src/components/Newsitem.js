import React, { Component } from 'react'
import {Link} from "react-router-dom"
export class Newsitem extends Component {

  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props
    return (
      <div>
        <div className="card my-3 mx-3" >
            <img src={imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
            <span class="position-absolute top-0 translate-middle badge rounded-pill bg-dark" style = {{left:"90%", zIndex
            :1}}>{source}</span>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-danger">By {author} on {new Date(date).toGMTString()}</small></p>
    
                <Link  to={newsUrl} target ="_blank" className="btn btn-sm btn-dark">Read More</Link>
            </div>
            </div>
      </div>
    )
  }
}

export default Newsitem
