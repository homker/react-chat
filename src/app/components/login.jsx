const React = require('react');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
const Colors = require('material-ui/lib/styles/colors');
const Paper = require('material-ui/lib/paper');
const TextField = require('material-ui/lib/text-field');
const FlatButton = require('material-ui/lib/flat-button');
const HistoryRoute = require('react-router');
const History = require('history');
const Auth = require('./auth');

const Login = React.createClass({

    mixin:[HistoryRoute],

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getInitialState () {
        return {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
        };
    },

    getChildContext() {
        return {
            muiTheme: this.state.muiTheme
        };
    },

    componentWillMount() {
        let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
            accent1Color: Colors.deepOrange500
        });

        this.setState({muiTheme: newMuiTheme});
    },

    render() {

        return (
            <Paper zDepth={2} className="login-box">
                <TextField ref="userName" errorText={this.state.errorMsg} hintText="用户名"/><br/>
                <TextField ref="passWord" errorText={this.state.errorMsg} hintText="密码"/><br/>
                <FlatButton onTouchTap={this._handleTouchTap}>登入</FlatButton>
            </Paper>
        );

    },

    _handleTouchTap() {

        let self = this;
        let userName = this.refs.userName.getValue();
        let passWord = this.refs.passWord.getValue();
        Auth.login(userName,passWord,function(authed){
            if(!authed){
                return self.setState({
                    err:true,
                    errorMsg:'用户密码错误'
                })
            }else{
                const {location} = self.props;
                if(location.state&&location.state.nextPathname){
                    self.props.history.replaceState(null,location.state.nextPathname)
                }else{
                    self.props.history.replaceState(null,'/');
                }
            }
        })
    },

});

module.exports = Login;
