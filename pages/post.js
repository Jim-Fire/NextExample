import Layout from "../components/Layout.js";
import fetch from "isomorphic-unfetch";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        counter: 0,
        intervalId: -1
    };
  }

  componentDidMount(){
    const id = setInterval(()=>{
        this.setState((state, props) => {
            return {counter: state.counter + 1};
        });
    },1000);
    this.setState({
        intervalId: id
    });
  }
  componentWillUnmount(){
    clearInterval(this.state.intervalId);
  }

  static async getInitialProps(context) {
    const { id } = context.query;
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const show = await res.json();

    console.log(`Fetched show: ${show.name}`);

    return { show };
  }

  render() {
    const { show } = this.props;
    return (
      <Layout>
        <b>Counter: {this.state.counter}</b>
        <h1>{show.name}</h1>
        <p>{show.summary.replace(/<[/]?p>/g, "")}</p>
        <img src={show.image.medium} />
      </Layout>
    );
  }
}

export default Post;
