import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };
  constructor() {
    super();
    //console.log("this is constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    //run after render()
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2e7355c7e69740968915da5782caeb04&pagesize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    console.log(data);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  handleNextClick = async () => {
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${this.props.category}&apiKey=2e7355c7e69740968915da5782caeb04&page= ${
        this.state.page + 1
      }&pagesize=${this.props.pageSize}`;
      this.setState({
        loading: true,
      });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
        loading: false,
      });
    }
  };
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=2e7355c7e69740968915da5782caeb04&page= ${
      this.state.page - 1
    }&pagesize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    console.log(data);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false,
    });
    console.log("prev");
  };
  render() {
    return (
      <div className="container my-3">
        <h1 className="heading text-center"style={{margin:'35px 0px'}}>NewsMonkey-Top headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              //console.log(element);
              return (
                <div key={element.url} className="col-md-4">
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageurl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://st1.bgr.in/wp-content/uploads/2022/06/Samsung-Xbox.jpg"
                    }
                    newsurl={element.url}
                  />
                </div>
              );
            })}
          <div className="container mu-3 d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-primary"
              onClick={this.handlePrevClick}
            >
              &larr;Previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              className="btn btn-primary"
              onClick={this.handleNextClick}
            >
              Next&rarr;{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default News;
