(function () {

    const React = require('react');
    const ReactDOM = require('react-dom');
    const Route = require('react-router').Route;
    const injectTapEventPlugin = require('react-tap-event-plugin');
    const App = require('./components/main.jsx');
    const Login = require('./components/login.jsx');
    const Main = require('./components/container.jsx');
    const auth = require('./components/auth.js');
    const IndexRoute = require('react-router').IndexRoute;
    const ReduxRouter = require('react-router').Router;
    const Histroy = require('history');
    const store = require('./store/store')();
    const Logout = require('./components/logout.jsx');
    const Provider = require('react-redux').Provider;
    const history = Histroy.useBasename(Histroy.createHistory)({
        basename: '/'
    });

    window.React = React;
    //触摸插件
    injectTapEventPlugin();


    function authCheck(nextState, replaceState) {
        if (!auth.isLogin()) {
            replaceState({nextPathname: nextState.location.pathname}, '/#/login');
        }
    }

    //router
    let routes = (
        <Route path="/" component={App}>
            <Route path="main" component={Main} onEnter={authCheck}/>
            <Route path="login" component={Login}/>
            <Route path="logout" component={Logout}/>
        </Route>
    );


    const Root = React.createClass({
        render(){
            return (
                <Provider store={store}>
                    <ReduxRouter>{routes}</ReduxRouter>
                </Provider>
            )
        }
    });

    ReactDOM.render(<Root />, document.getElementById("app"));

})();
