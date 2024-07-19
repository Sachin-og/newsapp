import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "science",
    pageSize: 8,
  };

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalize(this.props.category)} - NewsMonkey`;
  }
  async updateNews() {
    this.props.setProgress(10);
    let url = `https://myserver-etbg.onrender.com/news?country=${this.props.country}&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true });
    this.props.setProgress(30);
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.props.setProgress(80);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  
  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    let url = `https://myserver-etbg.onrender.com/news?country=${this.props.country}&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };
  

  async componentDidMount() {
    this.updateNews();
  }
 

  render() {
    return (
      <>
        <h1 className="text-center my-5">
          NewsMonkey - Top {this.capitalize(this.props.category)} Headlines
        </h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length <= this.state.totalResults}
          loader={<Spinner/>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
         
          <div className="row">
            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title ? element.title : " "}
                    description={
                      element.description ? element.description : " "
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://media.wired.com/photos/6647d6aeaef4cb09881cd0a2/191:100/w_1280,c_limit/US-Official-Warns-a-Cell-Network-Flaw-Is-Being-Exploited-for-Spying-Security-GettyImages-1425154697.jpg"
                    }
                    newsUrl={element.url}
                    author={element.author ? element.author : "anonymous"}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
            })}
            
          </div>
        </InfiniteScroll>
        </>
    );
  }
}

export default News;
