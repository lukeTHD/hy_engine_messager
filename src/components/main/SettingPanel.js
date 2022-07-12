import React, {Component} from 'react';
import {View, Dimensions, StyleSheet, Alert} from 'react-native';
import { Button, Container, Content, Icon, Left, Body, Right, List, ListItem, Thumbnail, Separator,Text } from 'native-base'
import {connect} from 'react-redux';
import {cleanLogin} from '../../actions/LoginAction'

const {height,width} = Dimensions.get('window');

class SettingPanel extends Component {
    constructor(props) {
        super(props);
        this.state={
            confirmModalVisible:false
        }


    }

    componentDidMount() {

    }
    exitApp=()=> {
        this.setState({ confirmModalVisible: true })
    }

    onPressOk=()=> {
        this.setState({ confirmModalVisible: false })
        this.props.cleanLogin()
    }

    onPressCancel=()=> {
        this.setState({ confirmModalVisible: false })
    }

    render() {
        const {navigation} = this.props;

        return (
            <Container>
                <Content style={styles.container}>
                    <Button full style={styles.button} onPress={this.exitApp}>
                        <Text style={ styles.buttonTitle}>Logout</Text>
                    </Button>
                </Content>

                {this.state.confirmModalVisible&& Alert.alert(
                '',
                'Are you sure？',
                [
                {text: 'Yes', onPress:this.onPressOk},
                    {text: 'No',onPress:this.onPressCancel},
                ],
                )
                }
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff"
    },
    list: {
        backgroundColor: '#fff',
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userContainer: {
        marginLeft: 10
    },
    button: {
        margin: 15,
        marginTop: 40,
        backgroundColor: '#1a50bd'
    },
    buttonTitle: {
        color: '#fff',
        fontSize: 14,
    },
    separator:{
        height:20
    }
})
const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchProps = (dispatch, props) => ({
    cleanLogin: () => {
        dispatch(cleanLogin(props))
    }
})
export default connect(mapStateToProps, mapDispatchProps)(SettingPanel)
