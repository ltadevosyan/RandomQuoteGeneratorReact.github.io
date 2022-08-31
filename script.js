class App extends React.Component {
    constructor(){
      super();
      this.state = ({
        color: "purple"
      });
      
      this.handleColorChange = this.handleColorChange.bind(this);
    }
    
    handleColorChange(color){
      this.setState({
        color: color
      });
    }
    
    render() {
      return (
        <div id="app" className={this.state.color}>
            <QuoteBox onChangeAppColor={this.handleColorChange} color={this.state.color} />
        </div>
      );
    }
  }
  
class QuoteBox extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        quoteText: "",
        quoteAuthor: "",
        curColor: this.props.color,
        tweetUrl: "https://twitter.com/intent/tweet/?text="
      }
      
      this.getNewQuote();
      this.getNewQuote = this.getNewQuote.bind(this);
      this.handleNewQuote = this.handleNewQuote.bind(this);
    }
    
    getNewQuote(){
      const app = this;
      fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        app.setState({
          quoteText: data.content,
          quoteAuthor: data.author,
          tweetUrl: "https://twitter.com/intent/tweet/?text=" + data.content.replace(/ /g, "+")
        });
      });
    }
    
    handleNewQuote(){
      const colors = ["gray", "blue", "purple", "red", "orange", "green"];
      let color = colors[Math.floor(Math.random() * colors.length)];
      while(color == this.state.curColor){
        color = colors[Math.floor(Math.random() * colors.length)];
      }
      this.setState({
        curColor: color
      });
      this.props.onChangeAppColor(color);
      this.getNewQuote();
    }
    
    render() {
      return (
        <main id="quote-box">
          <div id="quote-content">
            <div id="text">{ this.state.quoteText }</div>
            <div id="author">{ this.state.quoteAuthor }</div>
          </div>
          <button onClick={this.handleNewQuote} id="new-quote">Get New Quote</button>
          <a href={ this.state.tweetUrl } target="_blank" id="tweet-quote"><i class="fab fa-twitter"></i> Tweet Quote</a>
        </main>
      );
    }
}
  
ReactDOM.render(<App />, document.getElementById('root'));