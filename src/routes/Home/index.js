import  { Component } from "react";
import Banner from "../../components/Home/Banner";
import Process from "../../components/Home/Process";
import Study from "../../components/Home/Study";
import Advantage from "../../components/Home/Advantage";
import Team from "../../components/Home/Team";
import { connect } from 'dva'
@connect(({ global, loading }) => (
  {
    user: global.user,
    loading: loading.effects['global/login']
  }
))
class Home extends Component {
  star = [];
  render() {
    const { loading, user } = this.props;
    return (
      <div>
        <Banner loading={loading} user={user} />
        <Process />
        <Study />
        <Advantage />

      </div>
    );
  }
}
// <Team />

export default Home;
